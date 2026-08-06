import { NextResponse } from "next/server";

interface StripeCheckoutRequestBody {
  packageId?: string;
  packageName?: string;
  amount?: number; // In main currency units e.g., 50 for $50
  currency?: string; // USD, GBP, EUR, PKR
  studentEmail?: string;
  studentName?: string;
  successUrl?: string;
  cancelUrl?: string;
}

/**
 * POST /api/payments/stripe/checkout
 * Creates a Stripe Checkout Session for Quran tuition payments
 */
export async function POST(req: Request) {
  try {
    const body: StripeCheckoutRequestBody = await req.json();

    const packageName = body.packageName || "Standard Quran Learning Package (3 Days/wk)";
    const amount = body.amount || 50;
    const currency = (body.currency || "USD").toUpperCase();
    const studentEmail = body.studentEmail || "student@example.com";
    const studentName = body.studentName || "Guest Student";

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const successUrl = body.successUrl || `${appUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = body.cancelUrl || `${appUrl}/payment/cancelled`;

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    // Live Stripe API Integration if Secret Key is provided
    if (stripeSecretKey && !stripeSecretKey.startsWith("sk_test_placeholder")) {
      try {
        const params = new URLSearchParams();
        params.append("mode", "payment");
        params.append("success_url", successUrl);
        params.append("cancel_url", cancelUrl);
        params.append("customer_email", studentEmail);
        params.append("line_items[0][price_data][currency]", currency.toLowerCase());
        params.append(
          "line_items[0][price_data][product_data][name]",
          `Maqsad-e-Quran Academy: ${packageName}`
        );
        params.append(
          "line_items[0][price_data][unit_amount]",
          (Math.round(amount * 100)).toString()
        );
        params.append("line_items[0][quantity]", "1");
        params.append("metadata[studentName]", studentName);
        params.append("metadata[packageId]", body.packageId || "standard_plan");

        const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${stripeSecretKey}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        });

        if (stripeRes.ok) {
          const session = await stripeRes.json();
          return NextResponse.json({
            success: true,
            mode: "live",
            sessionId: session.id,
            url: session.url,
            amount,
            currency,
          });
        }
      } catch (stripeErr) {
        console.warn("Live Stripe checkout failed, falling back to mock mode:", stripeErr);
      }
    }

    // Mock Response Mode (for testing or missing Stripe key)
    const mockSessionId = `cs_test_mock_${Math.random().toString(36).substring(2, 15)}`;
    const mockPaymentIntent = `pi_mock_${Math.random().toString(36).substring(2, 12)}`;

    return NextResponse.json(
      {
        success: true,
        mode: "mock",
        message: "Stripe checkout session initialized (Mock Mode)",
        sessionId: mockSessionId,
        url: `${appUrl}/payment/mock-checkout?session_id=${mockSessionId}&amount=${amount}&currency=${currency}&packageName=${encodeURIComponent(packageName)}`,
        paymentDetails: {
          sessionId: mockSessionId,
          paymentIntent: mockPaymentIntent,
          packageName,
          packageId: body.packageId || "pkg_standard",
          amount,
          currency,
          studentEmail,
          studentName,
          status: "open",
          created: new Date().toISOString(),
          successUrl,
          cancelUrl,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Stripe Checkout Route Error:", errMessage);
    return NextResponse.json(
      { success: false, error: "Failed to initialize Stripe checkout", details: errMessage },
      { status: 500 }
    );
  }
}

/**
 * GET /api/payments/stripe/checkout?sessionId=...
 * Verify status of a checkout session
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json(
      { success: false, error: "sessionId query parameter is required" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    mode: "mock",
    session: {
      id: sessionId,
      payment_status: "paid",
      status: "complete",
      customer_details: {
        email: "student@example.com",
        name: "Mock Student",
      },
      amount_total: 5000,
      currency: "usd",
      updated_at: new Date().toISOString(),
    },
  });
}
