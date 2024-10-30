import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { calculateLevel } from "@/lib/xp-utils";
import { db } from "@/lib/db";
import QuizCategorySelect from "@/components/QuizCategorySelect";

const QuizPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  // Get user's level
  const user = await clerkClient.users.getUser(userId);
  const xp = (user.publicMetadata.xp as number) || 0;
  const level = calculateLevel(xp);

  // Get categories
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Knowledge Check</h1>
        <p className="text-muted-foreground">
          Test your knowledge with quizzes tailored to your level {level}
        </p>
      </div>

      <QuizCategorySelect userXp={xp} categories={categories} />
    </div>
  );
};

export default QuizPage;
