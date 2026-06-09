"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const modelConfig = { generationConfig: { responseMimeType: "application/json" } };
const primaryModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash", ...modelConfig });
const fallbackModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash", ...modelConfig });

async function generateContent(prompt) {
  const is503 = (e) => e?.status === 503 || e?.message?.includes("503");
  try {
    return await primaryModel.generateContent(prompt);
  } catch (error) {
    if (!is503(error)) throw error;
  }
  return await fallbackModel.generateContent(prompt);
}

export async function getResume() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({ where: { clerkUserId: userId } });
  if (!user) throw new Error("User not found");

  return db.resume.findUnique({ where: { userId: user.id } });
}

export async function saveResume(content) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { id: true, industry: true, skills: true, experience: true },
  });
  if (!user) throw new Error("User not found");

  const prompt = `
    You are an expert ATS (Applicant Tracking System) analyst. Analyze the following resume and provide a detailed assessment.

    Resume Content:
    ${content}

    Candidate Profile:
    - Industry: ${user.industry || "Not specified"}
    - Skills: ${user.skills?.join(", ") || "Not specified"}
    - Years of Experience: ${user.experience ?? "Not specified"}

    Return ONLY a JSON object with this structure:
    {
      "score": <number 0-100>,
      "summary": "<1-2 sentence overall assessment>",
      "strengths": ["<strength1>", "<strength2>", "<strength3>"],
      "improvements": ["<specific improvement1>", "<specific improvement2>", "<specific improvement3>"],
      "keywords": ["<important keyword missing or present>"]
    }

    Scoring criteria:
    - Formatting & structure (20 pts)
    - Quantified achievements (20 pts)
    - Relevant keywords for the industry (20 pts)
    - Clarity and conciseness (20 pts)
    - Contact info and sections completeness (20 pts)
  `;

  try {
    const result = await generateContent(prompt);
    const analysis = JSON.parse(result.response.text());

    const resume = await db.resume.upsert({
      where: { userId: user.id },
      update: {
        content,
        atsScore: analysis.score,
        feedback: JSON.stringify(analysis),
      },
      create: {
        userId: user.id,
        content,
        atsScore: analysis.score,
        feedback: JSON.stringify(analysis),
      },
    });

    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.error("Error saving resume:", error);
    throw new Error("Failed to save resume");
  }
}
