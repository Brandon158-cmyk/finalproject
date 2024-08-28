import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Image from "next/image";
import { db } from "@/lib/db";
import LeaderboardTable from "../_components/LeaderboardTable";
import { IoMdTrophy } from "react-icons/io";
import { BookOpen } from "lucide-react";

async function Rankings() {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const currentUser = await clerkClient.users.getUser(userId);
  const currentUserName = `${currentUser.firstName} ${currentUser.lastName}`;
  const currentUserAvatar = currentUser.imageUrl;

  // Get all users
  const allUsers = await clerkClient.users.getUserList({ limit: 100 });

  // Sort users by XP
  const sortedUsers = allUsers.sort(
    (a, b) =>
      ((b.publicMetadata.xp as number) || 0) -
      ((a.publicMetadata.xp as number) || 0)
  );

  const leaderboardEntries = await Promise.all(
    sortedUsers.map(async (user, index) => {
      const enrolledCourses = await db.purchase.count({
        where: { userId: user.id },
      });

      const completedCourses = await db.userProgress.count({
        where: {
          userId: user.id,
          isCompleted: true,
        },
      });

      return {
        position: index + 1,
        username: `${user.firstName} ${user.lastName}`,
        avatar: user.imageUrl,
        enrolledCourses,
        completedCourses,
        points: (user.publicMetadata.xp as number) || 0,
      };
    })
  );

  const currentUserPosition =
    leaderboardEntries.findIndex(
      (entry) => entry.username === currentUserName
    ) + 1;

  const currentUserXP = (currentUser.publicMetadata.xp as number) || 0;
  const currentUserEnrolledCourses = await db.purchase.count({
    where: { userId },
  });

  return (
    <div className='mx-6 my-4 flex flex-col gap-4'>
      <div>
        <h2 className='text-2xl font-bold'>Leaderboard</h2>
      </div>
      <div className='flex justify-start items-center gap-4'>
        <div className='flex justify-start bg-sky-700 rounded-[0.5rem] px-4 py-2'>
          <div className='flex items-center space-x-4'>
            <Image
              src={currentUserAvatar}
              alt={currentUserName}
              width={20}
              height={20}
              className='rounded-full ring-2 ring-white'
            />
            <span className='text-sm text-white'>{currentUserName}</span>
            <span className='font-bold text-white'>{currentUserPosition}</span>
          </div>
        </div>
        <div className='border border-gray-300 flex justify-start bg-pink-100 rounded-[0.5rem] px-4 py-2'>
          <div className='flex items-center space-x-4'>
            <span className='flex items-center gap-2'>
              <IoMdTrophy className='w-4 h-4 text-yellow-600' />
              <span>
                <span className='font-bold'>{currentUserXP}</span>{" "}
                <span className='text-sm'>Points</span>
              </span>
            </span>
            <span>|</span>
            <span className='flex items-center gap-2'>
              <BookOpen className='w-4 h-4 text-green-600' />
              <div>
                <span className='font-bold'>
                  {" "}
                  {currentUserEnrolledCourses}{" "}
                </span>
                <span className='text-sm'>Enrolled Courses</span>
              </div>
            </span>
          </div>
        </div>
      </div>

      <LeaderboardTable entries={leaderboardEntries} />
    </div>
  );
}

export default Rankings;
