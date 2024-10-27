import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { category, difficulty } = await req.json();

    const prompt = `Generate 5 multiple choice questions about ${category} at ${difficulty} level. 
    Format as JSON array with structure: 
    {
      question: string,
      options: string[],
      correctAnswer: string,
      explanation: string
    }`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const questions = JSON.parse(response.text());

    return NextResponse.json(questions);
  } catch (error) {
    console.error("[QUIZ_GENERATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
