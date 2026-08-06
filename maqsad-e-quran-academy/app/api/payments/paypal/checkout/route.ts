import { NextResponse } from "next/server";

interface PayPalCheckoutRequestBody {
  planId?: string;
  planName?: string;
  amount?: number;
  currency?: string;
  studentEmail?: string;
  description?: string;
}

/**
 * Fetch PayPal Access Token from PayPal REST API
 */
async function getPayPalAccessToken(): Promise<string | null> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const mode = process.env.PAYPAL_MODE || "sandbox";

  if (!clientId || !clientSecret) {
    return null;
  }

  const baseUrl =
    mode === "live"
      ? "https://api-m.paypal.com"
      : "https://api-m.sandbox.paypal.com";

  try {
    const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const res = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!res.ok) {
      console.warn("PayPal OAuth Token request failed");
      return null;
    }

    const data = await res.json();
    return data.access_token || null;
  } catch (err) {
    console.error("PayPal Access Token Error:", err);
    return null;
  }
}

/**
 * POST /api/payments/paypal/checkout
 * Creates a PayPal Order for Quran Academy tuition fees
 */
export async function POST(req: Request) {
  try {
    const body: PayPalCheckoutRequestBody = await req.json();

    const planName = body.planName || "Quran Tajweed Monthly Fee";
    const amount = body.amount || 50;
    const currency = (body.currency || "USD").toUpperCase();
    const description = body.description || "Maqsad-e-Quran Academy Tuition Fee";

    const accessToken = await getPayPalAccessToken();
    const mode = process.env.PAYPAL_MODE || "sandbox";
    const baseUrl =
      mode === "live"
        ? "https://api-m.paypal.com"
        : "https://api-m.sandbox.paypal.com";

    // Live API integration if PayPal credentials exist
    if (accessToken) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

      const paypalRes = await fetch(`${baseUrl}/v2/checkout/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              description,
              amount: {
                currency_code: currency,
                value: amount.toFixed(2),
              },
            },
          ],
          application_context: {
            brand_name: "Maqsad-e-Quran Academy",
            landing_page: "NO_PREFERENCE",
            user_action: "PAY_NOW",
            return_url: `${appUrl}/payment/paypal/success`,
            cancel_url: `${appUrl}/payment/paypal/cancel`,
          },
        }),
      });

      if (paypalRes.ok) {
        const orderData = await paypalRes.json();
        const approveLink = orderData.links?.find(
          (link: { rel: string; href: string }) => link.rel === "approve"
        )?.href;

        return NextResponse.json({
          success: true,
          mode: "live",
          orderId: orderData.id,
          status: orderData.status,
          approvalUrl: approveLink,
          amount,
          currency,
        });
      }
    }

    // Mock Mode Response
    const mockOrderId = `PAYPAL-ORD-MOCK-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const mockApprovalUrl = `https://www.sandbox.paypal.com/checkoutnow?token=${mockOrderId}`;

    return NextResponse.json(
      {
        success: true,
        mode: "mock",
        message: "PayPal Order created (Mock Mode)",
        orderId: mockOrderId,
        status: "CREATED",
        approvalUrl: mockApprovalUrl,
        orderDetails: {
          orderId: mockOrderId,
          planId: body.planId || "plan_tajweed_50",
          planName,
          amount,
          currency,
          studentEmail: body.studentEmail || "student@example.com",
          description,
          intent: "CAPTURE",
          created_at: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("PayPal Checkout Route Error:", errMessage);
    return NextResponse.json(
      { success: false, error: "Failed to create PayPal order", details: errMessage },
      { status: 500 }
    );
  }
}

/**
 * GET /api/payments/paypal/checkout?orderId=...
 * Fetch status of PayPal Order
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json(
      { success: false, error: "orderId query parameter is required" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    mode: "mock",
    order: {
      id: orderId,
      status: "APPROVED",
      intent: "CAPTURE",
      payer: {
        name: { given_name: "Mock", surname: "Payer" },
        email_address: "payer@example.com",
      },
      amount: { value: "50.00", currency_code: "USD" },
    },
  });
}
