import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { calculateLevel } from "@/lib/xp-utils";
import CreateGroupButton from "./_components/CreateGroupButton";
import GroupList from "./_components/GroupList";

const GroupsPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const user = await clerkClient.users.getUser(userId);
  const xp = (user.publicMetadata.xp as number) || 0;
  const level = calculateLevel(xp);

  const [groups, courses, categories] = await Promise.all([
    db.studyGroup.findMany({
      include: {
        course: true,
        category: true,
        members: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    db.course.findMany({
      where: { isPublished: true },
      select: { id: true, title: true },
    }),
    db.category.findMany({
      select: { id: true, name: true },
    }),
  ]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Study Groups</h1>
          <p className="text-muted-foreground">
            Join or create study groups to learn together
          </p>
        </div>
        <CreateGroupButton
          userLevel={level}
          courses={courses}
          categories={categories}
        />
      </div>
      <GroupList items={groups} userLevel={level} userId={userId} />
    </div>
  );
};

export default GroupsPage;
