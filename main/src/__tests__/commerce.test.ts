import { createHmac } from "node:crypto";
import {
  SMALL_BUSINESS_AI_TOOLKIT_SLUG,
  getProduct,
} from "@/commerce/products";
import {
  getCheckoutReadiness,
  verifyAndParseStripeEvent,
} from "@/commerce/stripe";

describe("GNG commerce", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("only returns a known product", () => {
    expect(getProduct(SMALL_BUSINESS_AI_TOOLKIT_SLUG)?.name).toBe(
      "Small Business AI Toolkit",
    );
    expect(getProduct("not-a-product")).toBeUndefined();
  });

  it("keeps checkout disabled until every activation control is configured", () => {
    process.env.GNG_CHECKOUT_ENABLED = "true";
    process.env.GNG_LEARNING_APP_ENABLED = "true";
    process.env.GNG_SITE_URL = "https://glitterngeek.dev";
    process.env.STRIPE_SECRET_KEY = "sk_test_example";
    process.env.STRIPE_PRICE_SMALL_BUSINESS_AI_TOOLKIT = "price_example";
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_example";
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_example";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service_role_example";
    delete process.env.GNG_FULFILLMENT_MODE;

    expect(getCheckoutReadiness()).toEqual({
      enabled: false,
      missing: ["GNG_FULFILLMENT_MODE=entitlements"],
    });

    process.env.GNG_FULFILLMENT_MODE = "entitlements";
    expect(getCheckoutReadiness()).toEqual({ enabled: true, missing: [] });
  });

  it("accepts a current Stripe signature and rejects a tampered payload", () => {
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test_secret";
    const timestamp = Math.floor(Date.now() / 1000);
    const payload = JSON.stringify({
      id: "evt_test",
      type: "checkout.session.completed",
      data: { object: { id: "cs_test_example" } },
    });
    const signature = createHmac(
      "sha256",
      process.env.STRIPE_WEBHOOK_SECRET,
    )
      .update(`${timestamp}.${payload}`)
      .digest("hex");
    const header = `t=${timestamp},v1=${signature}`;

    expect(verifyAndParseStripeEvent(payload, header).id).toBe("evt_test");
    expect(() => verifyAndParseStripeEvent(`${payload}x`, header)).toThrow(
      "Invalid Stripe webhook signature.",
    );
  });
});
