import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { calculateLevel } from "@/lib/xp-utils";
import GroupHeader from "./_components/GroupHeader";
import GroupMembers from "./_components/GroupMembers";
import GroupDiscussion from "./_components/GroupDiscussion";
import GroupResources from "./_components/GroupResources";

interface GroupPageProps {
  params: {
    groupId: string;
  };
}

const GroupPage = async ({ params }: GroupPageProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const user = await clerkClient.users.getUser(userId);
  const xp = (user.publicMetadata.xp as number) || 0;
  const level = calculateLevel(xp);

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

  const resources = await db.groupResource.findMany({
    where: {
      groupId: params.groupId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Get member details
  const memberDetails = await Promise.all(
    group.members.map(async (member) => {
      const user = await clerkClient.users.getUser(member.userId);
      return {
        ...member,
        name: `${user.firstName} ${user.lastName}`,
        avatar: user.imageUrl,
        level: calculateLevel((user.publicMetadata.xp as number) || 0),
      };
    })
  );

  const isAdmin = group.members.some(
    (member) => member.userId === userId && member.role === "admin"
  );
  const isMember = group.members.some((member) => member.userId === userId);

  return (
    <div className="container mx-auto p-6">
      <GroupHeader
        group={group}
        isAdmin={isAdmin}
        isMember={isMember}
        userLevel={level}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2 space-y-6">
          <GroupDiscussion groupId={group.id} isMember={isMember} />
        </div>
        <div className="space-y-6">
          <GroupMembers
            members={memberDetails}
            isAdmin={isAdmin}
            groupId={group.id}
          />
          <GroupResources
            groupId={group.id}
            isMember={isMember}
            isAdmin={isAdmin}
            resources={resources}
          />
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
