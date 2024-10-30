"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { QuizQuestion } from "@/lib/quiz";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface QuizInterfaceProps {
  categoryId: string;
  difficulty: string;
  categoryName: string;
}

const QuizInterface = ({
  categoryId,
  difficulty,
  categoryName,
}: QuizInterfaceProps) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/quiz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: categoryName,
            difficulty,
          }),
        });
        const data = await response.json();
        setQuestions(data);
        setIsLoading(false);
      } catch (error) {
        toast.error("Failed to load quiz questions");
        router.push("/quiz");
      }
    };

    fetchQuestions();
  }, [categoryName, difficulty, router]);

  const handleAnswer = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = async () => {
    if (currentQuestion === questions.length - 1) {
      try {
        // Submit quiz results
        const response = await fetch("/api/quiz/complete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            score,
            totalQuestions: questions.length,
            difficulty,
          }),
        });

        const data = await response.json();

        if (data.success) {
          toast.success(`Quiz completed! You earned ${data.xpEarned} XP!`);
          router.push(
            `/quiz/results?score=${score}&total=${questions.length}&xp=${data.xpEarned}`
          );
        } else {
          toast.error("Failed to submit quiz results");
        }
      } catch (error) {
        toast.error("Failed to submit quiz results");
      }
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setShowExplanation(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="p-6 border rounded-lg bg-card">
        <div className="mb-4 flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium">Score: {score}</span>
        </div>

        <h2 className="text-xl font-semibold mb-4">
          {questions[currentQuestion]?.question}
        </h2>

        <div className="space-y-3">
          {questions[currentQuestion]?.options.map((option) => (
            <Button
              key={option}
              onClick={() => setSelectedAnswer(option)}
              variant={selectedAnswer === option ? "default" : "outline"}
              className="w-full justify-start text-left"
              disabled={showExplanation}
            >
              {option}
            </Button>
          ))}
        </div>

        {!showExplanation ? (
          <Button
            onClick={handleAnswer}
            disabled={!selectedAnswer}
            className="w-full mt-6"
          >
            Submit Answer
          </Button>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="p-4 rounded-lg bg-muted">
              <p className="font-medium mb-2">Explanation:</p>
              <p>{questions[currentQuestion].explanation}</p>
            </div>
            <Button onClick={handleNext} className="w-full">
              {currentQuestion === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizInterface;
