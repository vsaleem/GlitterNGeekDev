import { NextRequest, NextResponse } from "next/server";
import { verifyAndParseStripeEvent } from "@/commerce/stripe";

export const runtime = "nodejs";

const PAYMENT_EVENTS = new Set([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
]);

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const rawBody = await request.text();
  try {
    const event = verifyAndParseStripeEvent(rawBody, signature);

    if (PAYMENT_EVENTS.has(event.type)) {
      // V1 uses an explicitly approved manual fulfillment queue. Keep this log
      // free of customer data; the Stripe Dashboard remains the order record.
      console.info("Paid GNG order requires fulfillment", {
        eventId: event.id,
        checkoutSessionId: event.data.object.id,
        product: event.data.object.metadata?.product_slug ?? "unknown",
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.warn("Rejected Stripe webhook", {
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }
}

