import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { buffer } from "node:stream/consumers";

export async function POST(req: any) {
  console.log(
    "Reading STRIPE_WEBHOOK_SECRET:",
    process.env.STRIPE_WEBHOOK_SECRET
  );

  const buf = await buffer(req.body);
  const signature = req.headers.get("Stripe-Signature") as string;
  const webhookSecret =
    "whsec_cbab3a862b121f65a1dab91ef16ab2746e9c00cead79a9d2b7369e31db81a02f";
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET environment variable is not set.");
    return new NextResponse(
      "Webhook Error: Webhook secret is not configured.",
      {
        status: 500,
      }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, signature, webhookSecret);
  } catch (error: any) {
    console.error(`Webhook signature verification failed.`, error);
    return new NextResponse(`Webhook Error: ${error.message}`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;

  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      console.error(
        `Missing metadata in session. userId: ${userId}, courseId: ${courseId}`
      );
      return new NextResponse(`Webhook Error: Missing metadata`, {
        status: 400,
      });
    }

    try {
      await db.purchase.create({
        data: {
          courseId: courseId,
          userId: userId,
        },
      });
    } catch (error: any) {
      console.error(`Database error: ${error.message}`);
      return new NextResponse(`Database Error: ${error.message}`, {
        status: 500,
      });
    }
  } else {
    console.warn(`Unhandled event type: ${event.type}`);
    return new NextResponse(
      `Webhook Error: Unhandled event type ${event.type}`,
      { status: 200 }
    );
  }

  return new NextResponse(null, { status: 200 });
}
