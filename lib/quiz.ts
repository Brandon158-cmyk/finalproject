export type QuizDifficulty = "beginner" | "intermediate" | "advanced";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface QuizSession {
  id: string;
  userId: string;
  categoryId: string;
  difficulty: QuizDifficulty;
  score: number;
  totalQuestions: number;
  completedAt?: Date;
}
