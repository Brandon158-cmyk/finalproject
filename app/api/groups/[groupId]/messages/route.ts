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

    const { content } = await req.json();

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

    const message = await db.groupMessage.create({
      data: {
        content,
        userId,
        groupId: params.groupId,
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.log("[GROUP_MESSAGES_POST]", error);
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

    const messages = await db.groupMessage.findMany({
      where: {
        groupId: params.groupId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.log("[GROUP_MESSAGES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
