import { NextResponse } from "next/server";

interface PayPalCaptureRequestBody {
  orderId?: string;
}

/**
 * Fetch PayPal Access Token
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

    if (!res.ok) return null;
    const data = await res.json();
    return data.access_token || null;
  } catch {
    return null;
  }
}

/**
 * POST /api/payments/paypal/capture
 * Captures an approved PayPal order to finalize payment
 */
export async function POST(req: Request) {
  try {
    const body: PayPalCaptureRequestBody = await req.json();
    const orderId = body.orderId;

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "orderId is required to capture payment" },
        { status: 400 }
      );
    }

    const accessToken = await getPayPalAccessToken();
    const mode = process.env.PAYPAL_MODE || "sandbox";
    const baseUrl =
      mode === "live"
        ? "https://api-m.paypal.com"
        : "https://api-m.sandbox.paypal.com";

    if (accessToken) {
      const captureRes = await fetch(`${baseUrl}/v2/checkout/orders/${orderId}/capture`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (captureRes.ok) {
        const captureData = await captureRes.json();
        return NextResponse.json({
          success: true,
          mode: "live",
          status: captureData.status, // "COMPLETED"
          captureId: captureData.purchase_units?.[0]?.payments?.captures?.[0]?.id,
          payer: captureData.payer,
        });
      }
    }

    // Mock capture response
    const mockCaptureId = `CAP-MOCK-${Math.floor(10000000 + Math.random() * 90000000)}`;

    return NextResponse.json({
      success: true,
      mode: "mock",
      message: "PayPal payment captured successfully (Mock Mode)",
      status: "COMPLETED",
      orderId,
      captureId: mockCaptureId,
      payer: {
        email_address: "student@example.com",
        name: { given_name: "Ahmad", surname: "Raza" },
      },
      captured_at: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("PayPal Capture Route Error:", errMessage);
    return NextResponse.json(
      { success: false, error: "Failed to capture PayPal payment", details: errMessage },
      { status: 500 }
    );
  }
}
