import { getCourses } from "@/actions/get-courses";
import { auth, clerkClient } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { Suspense } from "react";

import Categories from "./_components/Categories";
import SearchInput from "@/components/SearchInput";
import { redirect } from "next/navigation";
import CoursesList from "@/components/Course/CoursesList";

export const revalidate = 0;

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const Searchpage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const courses = await getCourses({
    userId: userId,
    ...searchParams,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <Suspense fallback={<div>Loading...</div>}>
          <CoursesList items={courses} />
        </Suspense>
      </div>
    </>
  );
};

export default Searchpage;
