import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { calculateLevel } from "@/lib/xp-utils";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const {
      name,
      description,
      privacy,
      courseId,
      categoryId,
      maxMembers,
      levelRequirement,
      tags,
    } = await req.json();

    const group = await db.studyGroup.create({
      data: {
        name,
        description,
        privacy,
        courseId,
        categoryId,
        creatorId: userId,
        maxMembers,
        levelRequirement,
        tags,
        members: {
          create: {
            userId,
            role: "admin",
          },
        },
      },
    });

    return NextResponse.json(group);
  } catch (error) {
    console.log("[GROUPS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");
    const categoryId = searchParams.get("categoryId");

    const groups = await db.studyGroup.findMany({
      where: {
        courseId: courseId || undefined,
        categoryId: categoryId || undefined,
      },
      include: {
        course: true,
        category: true,
        members: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(groups);
  } catch (error) {
    console.log("[GROUPS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
