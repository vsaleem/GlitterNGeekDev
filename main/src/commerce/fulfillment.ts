import "server-only";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { StripeEvent } from "./stripe";

const TOOLKIT_PRODUCT_SLUG = "small-business-ai-toolkit";

export type FulfillmentResult =
  | { status: "fulfilled" | "duplicate" | "pending" }
  | { status: "rejected"; reason: string }
  | { status: "unavailable"; reason: string };

export async function fulfillPaidToolkitOrder(
  event: StripeEvent,
): Promise<FulfillmentResult> {
  const session = event.data.object;
  if (
    session.payment_status !== "paid" &&
    session.payment_status !== "no_payment_required"
  ) {
    return { status: "pending" };
  }

  const expectedPriceId =
    process.env.STRIPE_PRICE_SMALL_BUSINESS_AI_TOOLKIT?.trim();
  const productSlug = session.metadata?.product_slug;
  const priceId = session.metadata?.price_id;
  const userId =
    session.client_reference_id ?? session.metadata?.supabase_user_id;
  const purchaserEmail = session.customer_details?.email?.trim().toLowerCase();

  if (productSlug !== TOOLKIT_PRODUCT_SLUG) {
    return { status: "rejected", reason: "Unknown product." };
  }
  if (!expectedPriceId || priceId !== expectedPriceId) {
    return { status: "rejected", reason: "Unexpected Stripe price." };
  }
  if (!userId || !purchaserEmail) {
    return { status: "rejected", reason: "Missing purchaser identity." };
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return { status: "unavailable", reason: "Entitlement store unavailable." };
  }

  const { data, error } = await supabase.rpc("fulfill_toolkit_purchase", {
    p_event_id: event.id,
    p_event_type: event.type,
    p_checkout_session_id: session.id,
    p_user_id: userId,
    p_purchaser_email: purchaserEmail,
    p_payment_intent_id:
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : null,
    p_amount_total: session.amount_total ?? null,
    p_currency: session.currency ?? null,
    p_payment_status: session.payment_status,
  });

  if (error) {
    console.error("Toolkit fulfillment failed", {
      eventId: event.id,
      checkoutSessionId: session.id,
      code: error.code,
    });
    return { status: "unavailable", reason: "Entitlement write failed." };
  }

  return { status: data === "duplicate" ? "duplicate" : "fulfilled" };
}
