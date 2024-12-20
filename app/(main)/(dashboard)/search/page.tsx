import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import Categories from "./_components/Categories";
import SearchInput from "@/components/SearchInput";
import CoursesList from "@/components/Course/CoursesList";
import Banner from "./_components/Banner";

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
    userId,
    ...searchParams,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4 w-screen md:w-full">
        <Categories items={categories} />
      </div>
      <Banner />
      <div className="w-full h-full mx-auto container">
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default Searchpage;
