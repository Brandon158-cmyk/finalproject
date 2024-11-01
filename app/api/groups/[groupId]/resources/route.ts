import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title, url, type } = await req.json();

    // Verify user is a member
    const membership = await db.groupMember.findFirst({
      where: {
        userId,
        groupId: params.groupId,
      },
    });

    if (!membership) {
      return new NextResponse("Not a member", { status: 403 });
    }

    const resource = await db.groupResource.create({
      data: {
        title,
        url,
        type,
        userId,
        groupId: params.groupId,
      },
    });

    return NextResponse.json(resource);
  } catch (error) {
    console.log("[GROUP_RESOURCES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const resources = await db.groupResource.findMany({
      where: {
        groupId: params.groupId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(resources);
  } catch (error) {
    console.log("[GROUP_RESOURCES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
