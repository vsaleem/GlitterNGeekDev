# Stripe Checkout + Bluevine payout setup

This project uses Stripe-hosted Checkout for customer payments and Bluevine
Business Checking as the intended payout destination. Secrets belong in Stripe
and Vercel—not in Git, source files, screenshots, Slack, or Obsidian.

## Architecture

1. A customer selects the Small Business AI Toolkit on `glitterngeek.dev`.
2. `POST /api/checkout` creates a Stripe Checkout Session from the approved
   Stripe Price ID.
3. Stripe displays eligible payment methods and processes the payment.
4. Stripe redirects the customer to `/products/success`.
5. Stripe sends signed events to `/api/stripe/webhook`.
6. V1 uses a manual fulfillment queue until a durable delivery provider is
   selected and implemented.
7. Stripe pays the net proceeds into GNG's Bluevine Business Checking account.

## 1. Connect Stripe and Bluevine securely

Use either the Bluevine **Sales > Payment processing > Get Started** flow or an
existing GNG-owned Stripe account. During Stripe onboarding:

1. Use GNG's legal business information and authorized representative.
2. Select **Bluevine Bank** or enter the GNG Bluevine routing and account
   numbers as Stripe's payout bank.
3. Keep automatic payouts enabled unless GNG intentionally chooses a different
   schedule.
4. Confirm the public business name and statement descriptor customers will
   recognize.
5. Complete all Stripe verification requirements.

Only Vic should enter or approve bank-account and beneficial-owner information.

## 2. Create the approved product and price

In Stripe **Product catalog**:

1. Create `Small Business AI Toolkit` as a one-time digital product.
2. Enter the separately approved price and USD currency.
3. Copy the resulting `price_...` ID.
4. Do not put a dollar amount in website source code. The product page retrieves
   the amount from Stripe so the displayed and charged prices stay aligned.

## 3. Configure payment methods

In Stripe **Settings > Payment methods**:

1. Keep cards and eligible wallets enabled.
2. Enable Cash App Pay if Stripe marks the connected GNG account eligible.
3. Confirm Apple Pay appears in a real-device test. Hosted Checkout chooses
   eligible wallets based on device, browser, location, currency, and account.
4. Do not advertise Venmo; this integration does not support it.
5. Leave ACH disabled for instant digital delivery until delayed payment and
   failure handling are implemented deliberately.

## 4. Create the webhook

In Stripe **Developers > Webhooks**, add:

`https://www.glitterngeek.dev/api/stripe/webhook`

Subscribe to:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`

Copy the endpoint's `whsec_...` signing secret into Vercel. Test-mode and
live-mode webhook secrets are different.

## 5. Configure Vercel environments

Add these server-side variables separately for Preview and Production:

```text
GNG_CHECKOUT_ENABLED=false
GNG_SITE_URL=https://www.glitterngeek.dev
GNG_FULFILLMENT_MODE=manual
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_SMALL_BUSINESS_AI_TOOLKIT=price_...
STRIPE_AUTOMATIC_TAX=false
```

Use Stripe test-mode values in Preview. Never use a `NEXT_PUBLIC_` prefix for a
secret. Redeploy after changing environment variables.

## 6. Manual V1 fulfillment

Before checkout is enabled, document an owner and response-time target for:

1. Monitoring successful Checkout payments in Stripe.
2. Verifying that payment status is paid—not merely initiated.
3. Sending the approved Toolkit file/link to the checkout email address.
4. Recording that the order was fulfilled exactly once.
5. Handling refunds, failed payments, disputes, and customer support.

Stripe remains the transaction record. Application logs intentionally exclude
customer email addresses and payment details.

## 7. Activation gate

Keep `GNG_CHECKOUT_ENABLED=false` until all items pass:

- Vic approved the exact V1 contents, file format, public copy, and price.
- The final downloadable artifact is stored in an approved delivery location.
- Refund, privacy, terms, support, and digital-delivery language are published.
- Stripe identity and business verification are complete.
- Bluevine is verified as the Stripe payout destination.
- The statement descriptor is recognizable.
- Apple Pay and Cash App Pay eligibility are tested on real supported devices.
- The webhook passes a signed test event.
- A complete Stripe test-mode purchase, confirmation, and fulfillment rehearsal
  succeeds without duplicate delivery.
- Tax settings have been reviewed with an appropriate professional.

After the gate passes, change only `GNG_CHECKOUT_ENABLED` to `true` and redeploy.

## Operational notes

- A first Stripe payout can take longer than later payouts; do not promise that
  Friday sales will settle into Bluevine on Friday.
- Bluevine and Stripe process payments but are not the merchant of record for
  GNG's tax, refund, and digital-product obligations.
- Automatic fulfillment should replace manual fulfillment after GNG chooses a
  durable file-delivery/email system and adds idempotent order storage.

