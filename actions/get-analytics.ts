import { db } from "@/lib/db";
import { Course, Purchase, RevenueShare } from "@prisma/client";

export const getAnalytics = async (userId: string) => {
  try {
    const purchases = await db.purchase.findMany({
      where: {
        course: {
          userId: userId,
        },
      },
      include: {
        course: true,
      },
    });

    const revenue = await db.revenueShare.findMany({
      where: {
        instructorId: userId,
      },
    });

    const totalRevenue = revenue.reduce(
      (acc, curr) => acc + curr.instructorRevenue,
      0
    );
    const totalSales = purchases.length;
    const pendingPayouts = revenue
      .filter((rev) => rev.status === "PENDING")
      .reduce((acc, curr) => acc + curr.instructorRevenue, 0);

    const courseEarnings = revenue.reduce(
      (grouped: { [key: string]: number }, rev) => {
        if (!grouped[rev.courseId]) {
          grouped[rev.courseId] = 0;
        }
        grouped[rev.courseId] += rev.instructorRevenue;
        return grouped;
      },
      {}
    );

    return {
      data: Object.entries(courseEarnings).map(([courseId, total]) => ({
        name: courseId,
        total: total,
      })),
      totalRevenue,
      totalSales,
      pendingPayouts,
    };
  } catch (error) {
    console.log("[GET_ANALYTICS]", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
      pendingPayouts: 0,
    };
  }
};
