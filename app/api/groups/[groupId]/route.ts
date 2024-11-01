import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();

    // Verify user is admin
    const membership = await db.groupMember.findFirst({
      where: {
        userId,
        groupId: params.groupId,
        role: "admin",
      },
    });

    if (!membership) {
      return new NextResponse("Not authorized", { status: 403 });
    }

    const group = await db.studyGroup.update({
      where: {
        id: params.groupId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(group);
  } catch (error) {
    console.log("[GROUP_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
