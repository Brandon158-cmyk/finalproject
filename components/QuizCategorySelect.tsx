"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { calculateLevel } from "@/lib/xp-utils";
import { determineQuizDifficulty } from "@/lib/quiz-utils";
import { toast } from "sonner";
import { MapIcon } from "lucide-react";

interface QuizCategorySelectProps {
  userXp: number;
  categories: {
    id: string;
    name: string;
  }[];
}

const QuizCategorySelect = ({
  userXp,
  categories,
}: QuizCategorySelectProps) => {
  const router = useRouter();
  const level = calculateLevel(userXp);
  const difficulty = determineQuizDifficulty(level);

  const handleStartQuiz = (categoryId: string) => {
    router.push(`/quiz/${categoryId}?difficulty=${difficulty}`);
    toast.success(
      `Starting ${difficulty} level quiz in ${
        categories.find((c) => c.id === categoryId)?.name
      }`
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Button
          key={category.id}
          onClick={() => handleStartQuiz(category.id)}
          variant="outline"
          className="h-32 flex flex-col items-center justify-center gap-2 hover:bg-accent/50"
        >
          <MapIcon className="h-8 w-8" />
          <span className="font-semibold">{category.name}</span>
          <span className="text-xs text-muted-foreground">
            {difficulty} Level Quiz
          </span>
        </Button>
      ))}
    </div>
  );
};

export default QuizCategorySelect;
