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

    const group = await db.studyGroup.findUnique({
      where: { id: params.groupId },
      include: { members: true },
    });

    if (!group) {
      return new NextResponse("Group not found", { status: 404 });
    }

    // Check if user is already a member
    if (group.members.some((member) => member.userId === userId)) {
      return new NextResponse("Already a member", { status: 400 });
    }

    // Add user as a member
    await db.studyGroup.update({
      where: { id: params.groupId },
      data: {
        members: {
          create: {
            userId,
            role: "member",
          },
        },
      },
    });

    return new NextResponse("Joined successfully", { status: 200 });
  } catch (error) {
    console.log("[GROUP_JOIN]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
