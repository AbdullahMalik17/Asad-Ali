import { NextResponse } from "next/server";

interface WhatsAppIncomingMessage {
  from: string;
  id: string;
  timestamp: string;
  type: string;
  text?: {
    body: string;
  };
}

interface WhatsAppContact {
  profile?: {
    name?: string;
  };
  wa_id: string;
}

/**
 * GET /api/whatsapp/webhook
 * Meta/WhatsApp Cloud API Webhook Verification Endpoint
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || "maqsad_quran_whatsapp_verify_token";

  if (mode === "subscribe" && token === verifyToken) {
    console.log("WhatsApp Webhook verified successfully.");
    return new NextResponse(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return NextResponse.json(
    { error: "Verification failed. Invalid verify token or mode." },
    { status: 403 }
  );
}

/**
 * Intelligent Auto-Responder Logic for Maqsad-e-Quran Academy
 */
function generateAutoReply(userMessage: string, userName?: string): string {
  const text = userMessage.toLowerCase();
  const nameGreeting = userName ? ` ${userName}` : "";

  if (text.includes("trial") || text.includes("book") || text.includes("register") || text.includes("join") || text.includes("demo")) {
    return (
      `Assalamu Alaikum${nameGreeting}! 🌟 Welcome to Maqsad-e-Quran Academy.\n\n` +
      `You can book a FREE 3-Day Trial Class with no commitment!\n` +
      `👉 Fill form: ${process.env.NEXT_PUBLIC_APP_URL || "https://maqsadquran.com"}\n` +
      `Or reply with your preferred day & time zone to schedule right away!`
    );
  }

  if (text.includes("fee") || text.includes("price") || text.includes("cost") || text.includes("package") || text.includes("rate")) {
    return (
      `Assalamu Alaikum${nameGreeting}! 📖 Our Quran Class Fee Plans:\n\n` +
      `1️⃣ 2 Days/Week: $35/month (8 lessons)\n` +
      `2️⃣ 3 Days/Week: $50/month (12 lessons)\n` +
      `3️⃣ 5 Days/Week: $70/month (20 lessons)\n\n` +
      `Includes 1-on-1 private live classes, Tajweed evaluation, and flexible scheduling.`
    );
  }

  if (text.includes("timing") || text.includes("schedule") || text.includes("time") || text.includes("zone")) {
    return (
      `Assalamu Alaikum${nameGreeting}! ⏰ We offer 24/7 flexible class slots.\n` +
      `We cater to students in USA, UK, Canada, Australia, UAE, Europe, and Asia.\n` +
      `Tell us your Country / Timezone to pick your preferred slot!`
    );
  }

  if (text.includes("female") || text.includes("sister") || text.includes("teacher") || text.includes("ustadha")) {
    return (
      `Assalamu Alaikum${nameGreeting}! 🌸 Yes, we have certified female Ustadhas for sisters and kids, ` +
      `as well as qualified Hafiz & Qari teachers for brothers.\n` +
      `Would you prefer a male or female teacher?`
    );
  }

  // Default menu reply
  return (
    `Assalamu Alaikum${nameGreeting}! Welcome to Maqsad-e-Quran Academy 🌙\n\n` +
    `How can we assist you today?\n` +
    `1. Type *Trial* to book a Free 3-Day Trial\n` +
    `2. Type *Fee* for monthly fee details\n` +
    `3. Type *Courses* for course catalog\n` +
    `4. Type *Timings* for flexible class schedules`
  );
}

/**
 * POST /api/whatsapp/webhook
 * Receives incoming WhatsApp messages from Meta Graph API
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Check if this is a WhatsApp status update or message event
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    if (!value || !value.messages || value.messages.length === 0) {
      // Return 200 to acknowledge webhook events like read receipts or delivery statuses
      return NextResponse.json({ status: "acknowledged", note: "No action required for status event" });
    }

    const message: WhatsAppIncomingMessage = value.messages[0];
    const contact: WhatsAppContact | undefined = value.contacts?.[0];

    const fromNumber = message.from; // Sender's phone number
    const userText = message.text?.body || "";
    const userName = contact?.profile?.name || "";

    const autoReplyText = generateAutoReply(userText, userName);

    const whatsappToken = process.env.WHATSAPP_API_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

    let dispatchStatus = "mocked";

    // Live Meta Graph API dispatch if credentials configured
    if (whatsappToken && phoneNumberId) {
      try {
        const metaRes = await fetch(
          `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${whatsappToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messaging_product: "whatsapp",
              recipient_type: "individual",
              to: fromNumber,
              type: "text",
              text: { preview_url: true, body: autoReplyText },
            }),
          }
        );

        if (metaRes.ok) {
          dispatchStatus = "sent_via_meta_api";
        } else {
          const errData = await metaRes.text();
          console.warn("Meta WhatsApp Dispatch failed:", errData);
          dispatchStatus = "failed_meta_api";
        }
      } catch (dispatchErr) {
        console.error("WhatsApp Dispatch Error:", dispatchErr);
        dispatchStatus = "error_dispatching";
      }
    }

    return NextResponse.json({
      success: true,
      processed: {
        messageId: message.id,
        from: fromNumber,
        receivedText: userText,
        autoReply: autoReplyText,
        dispatchStatus,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("WhatsApp Webhook POST Error:", errMessage);
    return NextResponse.json(
      { success: false, error: "Internal Server Error in WhatsApp Webhook", details: errMessage },
      { status: 500 }
    );
  }
}
