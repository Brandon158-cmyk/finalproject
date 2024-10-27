import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { QuizQuestion } from "@/lib/quiz";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { category, difficulty } = await req.json();

    const prompt = `Generate 5 multiple choice questions about ${category} at ${difficulty} level. 
    Return ONLY a JSON array of objects with no additional text or formatting. Each object should have exactly these fields:
    - question (string)
    - options (array of 4 strings)
    - correctAnswer (string, must be one of the options)
    - explanation (string)
    
    Example format:
    [
      {
        "question": "What is X?",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": "A",
        "explanation": "Because..."
      }
    ]`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up the response to ensure valid JSON
    const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim();

    try {
      const questions = JSON.parse(cleanedText) as QuizQuestion[];

      // Validate the structure of each question
      const validQuestions = questions.every(
        (q) =>
          q.question &&
          Array.isArray(q.options) &&
          q.options.length === 4 &&
          q.correctAnswer &&
          q.explanation &&
          q.options.includes(q.correctAnswer)
      );

      if (!validQuestions) {
        throw new Error("Invalid question format");
      }

      return NextResponse.json(questions);
    } catch (parseError) {
      console.error("[QUIZ_PARSE_ERROR]", parseError);
      return new NextResponse("Invalid question format received from AI", {
        status: 500,
      });
    }
  } catch (error) {
    console.error("[QUIZ_GENERATION_ERROR]", error);
    return new NextResponse("Failed to generate quiz questions", {
      status: 500,
    });
  }
}
