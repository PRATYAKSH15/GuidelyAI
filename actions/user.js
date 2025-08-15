"use server"; // Marks this file for server-only execution in Next.js App Router

// Import the Prisma DB instance
import { db } from "@/lib/prisma";

// Import Clerk's server-side auth to get the logged-in user
import { auth } from "@clerk/nextjs/server";

// Import Next.js cache API to force re-fetch certain pages after updates
import { revalidatePath } from "next/cache";

// Import a helper function that generates AI-powered insights for a given industry
import { generateAIInsights } from "./dashboard";

/**
 * Updates a user's profile information and ensures industry insights exist for their chosen industry.
 * 
 * @param {Object} data - The updated user info (industry, experience, bio, skills)
 */
export async function updateUser(data) {
  // ✅ 1. Authenticate user and get their Clerk user ID
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // ✅ 2. Find the user in the database using their Clerk ID
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  try {
    // ✅ 3. Start a transaction to ensure all operations succeed together
    const result = await db.$transaction(
      async (tx) => {
        // 3.1 Check if industry insights already exist for the chosen industry
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });

        // 3.2 If not, generate AI insights and store them in the DB
        if (!industryInsight) {
          const insights = await generateAIInsights(data.industry);

          industryInsight = await db.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights, // Spread AI-generated fields into the new record
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Schedule next update in 7 days
            },
          });
        }

        // 3.3 Update the user's profile with the new info
        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        // Return both updated user and industry insight for later use
        return { updatedUser, industryInsight };
      },
      {
        timeout: 10000, // Increase transaction timeout from default 5s to 10s
      }
    );

    // ✅ 4. Revalidate homepage cache so the updated info is shown immediately
    revalidatePath("/");

    // ❌ Possible bug: `result.user` does not exist (should be `result.updatedUser`)
    return result.user;
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update profile");
  }
}

/**
 * Checks if a user has completed onboarding (i.e., set their industry).
 */
export async function getUserOnboardingStatus() {
  // ✅ 1. Authenticate the user
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // ✅ 2. Ensure the user exists in the DB
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  try {
    // ✅ 3. Check if the user has an industry set (means onboarding is complete)
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true, // Only fetch the `industry` field
      },
    });

    // ✅ 4. Return a boolean indicating onboarding status
    return {
      isOnboarded: !!user?.industry, // True if industry exists
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}
