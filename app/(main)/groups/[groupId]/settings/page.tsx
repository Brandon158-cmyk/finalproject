import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import GroupSettingsForm from "./_components/GroupSettingsForm";

interface GroupSettingsPageProps {
  params: {
    groupId: string;
  };
}

const GroupSettingsPage = async ({ params }: GroupSettingsPageProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const group = await db.studyGroup.findUnique({
    where: {
      id: params.groupId,
    },
    include: {
      course: true,
      category: true,
      members: true,
    },
  });

  if (!group) {
    return redirect("/groups");
  }

  const isAdmin = group.members.some(
    (member) => member.userId === userId && member.role === "admin"
  );

  if (!isAdmin) {
    return redirect(`/groups/${params.groupId}`);
  }

  const [courses, categories] = await Promise.all([
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
      <h1 className="text-2xl font-bold mb-6">Group Settings</h1>
      <GroupSettingsForm
        group={group}
        courses={courses}
        categories={categories}
      />
    </div>
  );
};

export default GroupSettingsPage;
