import { QuizDifficulty } from "./quiz";
import { calculateLevel } from "./xp-utils";

export const determineQuizDifficulty = (userLevel: number): QuizDifficulty => {
  if (userLevel <= 5) return "beginner";
  if (userLevel <= 15) return "intermediate";
  return "advanced";
};

export const getQuizReward = (
  difficulty: QuizDifficulty,
  score: number
): number => {
  const baseReward = {
    beginner: 10,
    intermediate: 20,
    advanced: 30,
  }[difficulty];

  return Math.floor(baseReward * (score / 100));
};
