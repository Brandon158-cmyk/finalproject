import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      },
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    if (course.price !== 0) {
      return new NextResponse("Course is not free", { status: 400 });
    }

    const purchase = await db.purchase.create({
      data: {
        courseId: params.courseId,
        userId: userId,
      },
    });

    return NextResponse.json(purchase);
  } catch (error) {
    console.log("[COURSE_ID_ENROLL]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

