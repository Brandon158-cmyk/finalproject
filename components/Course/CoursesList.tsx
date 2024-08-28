// "use client";

import CourseCard from "@/components/Course/CourseCard";
import { Category, Course } from "@prisma/client";
import CourseCardSmall from "@/components/Course/CourseCardSmall";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
  enrollmentCount: number;
};

interface CourseListProps {
  items: CourseWithProgressWithCategory[];
}

const CoursesList = ({ items }: CourseListProps) => {
  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 bg-white rounded-[0.5rem] border border-gray-300 p-4 max-w-screen-xl mx-auto'>
        {items.map((item) => {
          return (
            // <CourseCard
            //   author={item.author}
            //   key={item.id}
            //   id={item.id}
            //   title={item.title}
            //   chaptersLength={item.chapters.length}
            //   imageUrl={item.imageUrl!}
            //   price={item.price!}
            //   progress={item.progress}
            //   category={item?.category?.name}
            //   description={item.description!}
            // />
            <CourseCardSmall
              author={item.author}
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description!}
              imageUrl={item.imageUrl!}
              price={item.price!}
              progress={item.progress}
              category={item?.category?.name}
              chaptersLength={item.chapters.length}
              enrollmentCount={item.enrollmentCount}
            />
          );
        })}
      </div>
      <div>
        {items.length === 0 && (
          <div className='container p-6 flex items-center justify-center text-muted-foreground bg-accent dark:bg-accent/50 rounded-xl h-full w-full'>
            No courses found
          </div>
        )}
      </div>
    </>
  );
};

export default CoursesList;
