import React from "react";
import VideoPlayer from "./_components/ChapterContent";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/ui/banner";
import Preview from "@/components/Preview";
import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa6";
import CourseEnrollButton from "./_components/CourseEnrollButton";
import CourseProgressButton from "./_components/CourseProgressButton";
import ChapterContent from "./_components/ChapterContent";
import { MdOutlineExpandCircleDown } from "react-icons/md";
import { BiSolidBookContent } from "react-icons/bi";

interface ChapterProps {
  params: {
    chapterId: string;
    courseId: string;
  };
}

const page = async ({ params }: ChapterProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const { chapter, course, nextChapter, userProgress, purchase } =
    await getChapter({
      userId,
      chapterId: params.chapterId,
      courseId: params.courseId,
    });
  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div className="h-full w-full md:container">
      {userProgress?.isCompleted && (
        <Banner label="You already completed this chapter" variant="success" />
      )}
      {isLocked && (
        <Banner
          label="You need to purchase this course to watch this chapter."
          variant="warning"
        />
      )}

      <div className="flex flex-col mx-auto !pb-10">
        {chapter.videoUrl && (
          <div className="pb-4 md:pb-6 w-full">
            <ChapterContent
              url={chapter.videoUrl}
              isLocked={isLocked}
              nextChapterId={nextChapter?.id}
              chapterId={params.chapterId}
              completeOnEnd={completeOnEnd}
              courseId={params.courseId}
              chapterType={chapter.videoUrl ? "video" : "text"}
              textContent={chapter.textContent || undefined}
            />
          </div>
        )}
        <div className="py-4 flex flex-col">
          <div className="flex flex-col md:flex-row items-center justify-between mb-2 px-0 md:px-4 gap-2">
            <h2 className="text-2xl font-semibold">{chapter.title}</h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Preview value={chapter.description!} />
          {!!chapter.textContent && (
            <div className="text-sm text-slate-700 mt-4">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-x-2">
                <BiSolidBookContent className="h-4 w-4" />
                Course Content
              </h3>
              <Preview value={chapter.textContent} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
