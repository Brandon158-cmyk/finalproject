import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { groupId: string; resourceId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify user is an admin
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

    await db.groupResource.delete({
      where: {
        id: params.resourceId,
      },
    });

    return new NextResponse("Resource deleted", { status: 200 });
  } catch (error) {
    console.log("[GROUP_RESOURCE_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
