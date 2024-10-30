import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { getQuizReward } from "@/lib/quiz-utils";
import { QuizDifficulty } from "@/lib/quiz";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { score, totalQuestions, difficulty } = await req.json();

    // Calculate percentage score
    const percentageScore = Math.round((score / totalQuestions) * 100);

    // Calculate XP reward
    const xpReward = getQuizReward(
      difficulty as QuizDifficulty,
      percentageScore
    );

    // Get current user XP
    const user = await clerkClient.users.getUser(userId);
    const currentXp = (user.publicMetadata.xp as number) || 0;

    // Update user's XP
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        xp: currentXp + xpReward,
      },
    });

    return NextResponse.json({
      success: true,
      xpEarned: xpReward,
      newTotalXp: currentXp + xpReward,
    });
  } catch (error) {
    console.error("[QUIZ_COMPLETE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
