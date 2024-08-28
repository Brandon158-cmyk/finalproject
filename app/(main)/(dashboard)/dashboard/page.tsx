import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import CoursesList from "@/components/Course/CoursesList";
import { auth, clerkClient } from "@clerk/nextjs";
import { CheckCircle, Clock, Star } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { InfoCard } from "./_components/InfoCard";
import UserCard from "./_components/UserCard";

const Dashboard = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const user = await clerkClient.users.getUser(userId);

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );
  const xp = user.publicMetadata.xp || 0;

  return (
    <div className='p-6 space-y-4 container'>
      <div className='bg-white border rounded-sm overflow-hidden'>
        <UserCard />
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 p-4'>
          <InfoCard
            icon={Clock}
            label='In Progress'
            numberOfItems={coursesInProgress.length}
            nameOfItems={"Courses"}
          />
          <InfoCard
            icon={CheckCircle}
            label='Completed'
            numberOfItems={completedCourses.length}
            nameOfItems={"Courses"}
          />
          <InfoCard
            icon={Star}
            label='Points'
            numberOfItems={xp}
            nameOfItems={"XP"}
          />
        </div>
      </div>
      <div className='bg-secondary border rounded-sm overflow-hidden p-5'>
        <CoursesList items={[...coursesInProgress, ...completedCourses]} />
      </div>
    </div>
  );
};

export default Dashboard;
