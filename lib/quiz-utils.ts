import { QuizDifficulty } from "./quiz";
import { calculateLevel } from "./xp-utils";

export const determineQuizDifficulty = (userLevel: number): QuizDifficulty => {
  if (userLevel <= 5) return "beginner";
  if (userLevel <= 15) return "intermediate";
  return "advanced";
};

export const getQuizReward = (
  difficulty: QuizDifficulty,
  correctAnswers: number
): number => {
  const baseXPPerQuestion = 5; // 5 XP per correct answer
  const difficultyMultiplier = {
    beginner: 1,
    intermediate: 1.5,
    advanced: 2,
  }[difficulty];

  return Math.floor(baseXPPerQuestion * correctAnswers * difficultyMultiplier);
};
