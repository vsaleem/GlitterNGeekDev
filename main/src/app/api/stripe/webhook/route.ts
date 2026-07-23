import { NextRequest, NextResponse } from "next/server";
import { fulfillPaidToolkitOrder } from "@/commerce/fulfillment";
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
      const result = await fulfillPaidToolkitOrder(event);
      if (result.status === "unavailable") {
        console.error("Paid GNG order could not be fulfilled", {
          eventId: event.id,
          checkoutSessionId: event.data.object.id,
          reason: result.reason,
        });
        return NextResponse.json(
          { error: "Fulfillment is temporarily unavailable." },
          { status: 503 },
        );
      }
      if (result.status === "rejected") {
        console.warn("Paid GNG order failed validation", {
          eventId: event.id,
          checkoutSessionId: event.data.object.id,
          reason: result.reason,
        });
        return NextResponse.json({ received: true, fulfilled: false });
      }
      console.info("Paid GNG order processed", {
        eventId: event.id,
        checkoutSessionId: event.data.object.id,
        fulfillment: result.status,
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
