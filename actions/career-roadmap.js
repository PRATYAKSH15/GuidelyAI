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

export async function generateRoadmap({ targetRole, currentRole }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { id: true, industry: true, skills: true, experience: true, bio: true },
  });
  if (!user) throw new Error("User not found");

  const prompt = `
    Generate a detailed career roadmap for someone transitioning from "${currentRole}" to "${targetRole}".

    Candidate Profile:
    - Industry: ${user.industry || "Not specified"}
    - Current Skills: ${user.skills?.length ? user.skills.join(", ") : "Not specified"}
    - Years of Experience: ${user.experience ?? "Not specified"}
    - Background: ${user.bio || "Not specified"}

    Return ONLY a JSON object with this exact structure:
    {
      "currentRole": "${currentRole}",
      "targetRole": "${targetRole}",
      "timeframe": "X-Y months",
      "summary": "2-sentence overview of the transition",
      "phases": [
        {
          "phase": 1,
          "title": "Phase title",
          "duration": "X months",
          "description": "What to focus on in this phase",
          "skills": ["skill1", "skill2", "skill3"],
          "actions": [
            "Specific actionable step 1",
            "Specific actionable step 2",
            "Specific actionable step 3"
          ],
          "milestones": [
            "Measurable milestone 1",
            "Measurable milestone 2"
          ]
        }
      ],
      "skillGaps": ["gap1", "gap2", "gap3"],
      "certifications": ["Certification name 1", "Certification name 2"],
      "salaryExpectation": "Expected salary range after transition"
    }

    Requirements:
    - Include 3 to 5 phases covering the full transition
    - Each phase must have 3-4 skills, 3-4 actions, and 2-3 milestones
    - Actions must be specific and immediately actionable
    - Milestones must be measurable outcomes
    - skillGaps should reflect what the candidate is missing based on their profile
  `;

  try {
    const result = await generateContent(prompt);
    const roadmap = JSON.parse(result.response.text());

    const saved = await db.careerRoadmap.create({
      data: {
        userId: user.id,
        targetRole,
        currentRole,
        content: roadmap,
      },
    });

    revalidatePath("/career-roadmap");
    return saved;
  } catch (error) {
    console.error("Error generating roadmap:", error);
    throw new Error("Failed to generate career roadmap");
  }
}

export async function getRoadmaps() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({ where: { clerkUserId: userId } });
  if (!user) throw new Error("User not found");

  return db.careerRoadmap.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteRoadmap(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({ where: { clerkUserId: userId } });
  if (!user) throw new Error("User not found");

  await db.careerRoadmap.delete({
    where: { id, userId: user.id },
  });

  revalidatePath("/career-roadmap");
}
