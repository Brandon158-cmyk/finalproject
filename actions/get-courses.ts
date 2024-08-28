import { Category, Course } from "@prisma/client";

import getProgress from "@/actions/get-progress";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
  enrollmentCount: number;
};

type GetCourse = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({ userId, title, categoryId }: GetCourse) => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: title
          ? {
              contains: title,
              mode: "insensitive",
            }
          : undefined,

        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
        _count: {
          select: {
            purchases: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          if (course.purchases.length === 0) {
            return {
              ...course,
              progress: null,
              enrollmentCount: course._count.purchases,
            };
          }

          const progressPrecentage = await getProgress(userId, course.id);

          return {
            ...course,
            progress: progressPrecentage,
            enrollmentCount: course._count.purchases,
          };
        })
      );

    return coursesWithProgress;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};
