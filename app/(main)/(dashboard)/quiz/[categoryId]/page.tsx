import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { calculateLevel } from "@/lib/xp-utils";
import { db } from "@/lib/db";
import QuizInterface from "../_components/QuizInterface";

interface QuizPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    difficulty: string;
  };
}

const QuizPage = async ({ params, searchParams }: QuizPageProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  // Get category details
  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  if (!category) {
    return redirect("/quiz");
  }

  // Get user's level
  const user = await clerkClient.users.getUser(userId);
  const xp = (user.publicMetadata.xp as number) || 0;
  const level = calculateLevel(xp);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          {category.name} Quiz - {searchParams.difficulty} Level
        </h1>
        <p className="text-muted-foreground">
          Test your knowledge in {category.name}. Complete the quiz to earn XP!
        </p>
      </div>

      <QuizInterface
        categoryId={params.categoryId}
        difficulty={searchParams.difficulty}
        categoryName={category.name}
      />
    </div>
  );
};

export default QuizPage;
