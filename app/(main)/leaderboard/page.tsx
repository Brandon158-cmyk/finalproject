import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import LeaderboardTable from "../_components/LeaderboardTable";

const LeaderboardPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const users = await clerkClient.users.getUserList({ limit: 100 });

  const sortedUsers = users.sort(
    (a, b) =>
      ((b.publicMetadata.xp as number) || 0) -
      ((a.publicMetadata.xp as number) || 0)
  );

  const leaderboardData = users.map((user, index) => ({
    rank: index + 1,
    name: `${user.firstName} ${user.lastName}`,
    xp: (user.publicMetadata.xp as number) || 0,
    image: user.imageUrl,
  }));

  const currentUser = `${users.find((u) => u.id === userId)?.firstName} ${
    users.find((u) => u.id === userId)?.lastName
  }`;

  return (
    <div className="container mx-auto p-6 md:p-12 bg-secondary/50 text-secondary-foreground min-h-[calc(100vh-80px)] md:rounded-tl-3xl">
      <h1 className="text-4xl font-bold mb-8">Leaderboard</h1>
      <div className="bg-card shadow-md rounded-lg overflow-hidden">
        <LeaderboardTable data={leaderboardData} currentUserId={currentUser} />
      </div>
    </div>
  );
};

export default LeaderboardPage;
