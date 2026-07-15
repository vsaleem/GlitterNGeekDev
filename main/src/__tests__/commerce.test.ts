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
    process.env.STRIPE_SECRET_KEY = "sk_test_example";
    process.env.STRIPE_PRICE_SMALL_BUSINESS_AI_TOOLKIT = "price_example";
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_example";
    delete process.env.GNG_FULFILLMENT_MODE;

    expect(getCheckoutReadiness()).toEqual({
      enabled: false,
      missing: ["GNG_FULFILLMENT_MODE=manual"],
    });

    process.env.GNG_FULFILLMENT_MODE = "manual";
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
