import { NextResponse } from "next/server";

/**
 * POST /api/payments/stripe/webhook
 * Stripe Webhook Event Listener for payment confirmation & student enrollment triggers
 */
export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("stripe-signature");

    let event: { type: string; data: { object: Record<string, unknown> } };

    if (rawBody) {
      try {
        event = JSON.parse(rawBody);
      } catch {
        return NextResponse.json({ error: "Invalid payload JSON" }, { status: 400 });
      }
    } else {
      return NextResponse.json({ error: "Empty request body" }, { status: 400 });
    }

    const eventType = event.type || "checkout.session.completed";
    const sessionData = event.data?.object || {};

    console.log(`[Stripe Webhook] Received event: ${eventType}`, signature ? "Signed" : "Unsigned");

    switch (eventType) {
      case "checkout.session.completed": {
        const customerEmail = sessionData.customer_email || sessionData.customer_details;
        const amountTotal = sessionData.amount_total;
        console.log(`Payment confirmed for ${JSON.stringify(customerEmail)}. Amount: ${amountTotal}`);
        break;
      }
      case "payment_intent.succeeded": {
        console.log("PaymentIntent succeeded:", sessionData.id);
        break;
      }
      default:
        console.log(`Unhandled Stripe event type: ${eventType}`);
    }

    return NextResponse.json({
      received: true,
      event: eventType,
      processedAt: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Stripe Webhook Error:", errMessage);
    return NextResponse.json(
      { error: "Webhook handler failed", details: errMessage },
      { status: 500 }
    );
  }
}
