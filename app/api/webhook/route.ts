import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const PLATFORM_PERCENTAGE = 0.8; // Instructor gets 80% of the sale
const PLATFORM_FEE = 0.2; // Platform keeps 20%

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret!);
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;

  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      return new NextResponse("Webhook Error: Missing metadata", {
        status: 400,
      });
    }

    try {
      // Create the purchase record
      await db.purchase.create({
        data: {
          courseId: courseId,
          userId: userId,
        },
      });

      // Get the course details to calculate revenue share
      const course = await db.course.findUnique({
        where: { id: courseId },
      });

      if (course && course.price) {
        const amount = course.price;
        const instructorRevenue = amount * PLATFORM_PERCENTAGE;
        const platformFee = amount * PLATFORM_FEE;

        // Record the revenue share
        await db.revenueShare.create({
          data: {
            courseId: courseId,
            instructorId: course.userId,
            purchaseAmount: amount,
            instructorRevenue: instructorRevenue,
            platformFee: platformFee,
            status: "COMPLETED",
          },
        });
      }
    } catch (error: any) {
      return new NextResponse(`Database Error: ${error.message}`, {
        status: 500,
      });
    }
  }

  return new NextResponse(null, { status: 200 });
}
