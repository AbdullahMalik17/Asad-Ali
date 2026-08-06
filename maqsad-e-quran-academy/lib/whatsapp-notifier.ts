/**
 * WhatsApp Automated Messaging Trigger Helper
 * Integrated with Meta Graph API for WhatsApp Cloud API & fallback mock mode.
 */

export interface WhatsAppTrialNotificationParams {
  toPhone: string;
  studentName: string;
  parentName?: string;
  course: string;
  scheduledTime?: string;
  timeZone?: string;
  zoomMeetingUrl?: string;
}

export interface WhatsAppAdmissionNotificationParams {
  toPhone: string;
  studentName: string;
  parentName?: string;
  course: string;
  packageName?: string;
  startDate?: string;
  teacherName?: string;
  portalUrl?: string;
}

export interface WhatsAppPaymentLinkParams {
  toPhone: string;
  studentName: string;
  packageName: string;
  amount: number;
  currency: string;
  paymentUrl: string;
  dueDate?: string;
}

export interface WhatsAppNotificationResponse {
  success: boolean;
  messageId?: string;
  to: string;
  mode: "meta_api" | "mock";
  error?: string;
  details?: Record<string, unknown>;
}

/**
 * Clean & normalize phone number into standard international format without '+' or spaces.
 * E.g., "+92 300 1234567" -> "923001234567"
 * E.g., "03001234567" (PK local) -> "923001234567"
 * E.g., "+1 (555) 019-2834" -> "15550192834"
 */
export function normalizePhoneNumber(rawPhone: string): string {
  let cleaned = rawPhone.replace(/\D/g, ""); // Keep only digits

  // Convert Pakistan local number starting with 03xx to 923xx
  if (cleaned.length === 11 && cleaned.startsWith("03")) {
    cleaned = "92" + cleaned.slice(1);
  }

  // Convert UK local number starting with 07xx to 447xx
  if (cleaned.length === 11 && cleaned.startsWith("07")) {
    cleaned = "44" + cleaned.slice(1);
  }

  return cleaned;
}

/**
 * Dispatch raw text message via Meta Graph API or Mock mode
 */
export async function sendWhatsAppTextMessage(
  toPhone: string,
  messageText: string
): Promise<WhatsAppNotificationResponse> {
  const formattedPhone = normalizePhoneNumber(toPhone);

  if (!formattedPhone || formattedPhone.length < 8) {
    return {
      success: false,
      to: toPhone,
      mode: "mock",
      error: "Invalid phone number provided.",
    };
  }

  const whatsappToken = process.env.WHATSAPP_API_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  // Live Meta WhatsApp Cloud API Dispatch
  if (
    whatsappToken &&
    phoneNumberId &&
    !whatsappToken.startsWith("your-whatsapp")
  ) {
    try {
      const response = await fetch(
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
            to: formattedPhone,
            type: "text",
            text: {
              preview_url: true,
              body: messageText,
            },
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const msgId = data.messages?.[0]?.id || `wa_meta_${Date.now()}`;
        return {
          success: true,
          mode: "meta_api",
          messageId: msgId,
          to: formattedPhone,
          details: data,
        };
      }

      console.warn("Meta WhatsApp API Error:", data);
      return {
        success: false,
        mode: "meta_api",
        to: formattedPhone,
        error: data.error?.message || "Failed to dispatch WhatsApp message via Meta API",
        details: data,
      };
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown dispatch error";
      console.error("WhatsApp Dispatch Network Exception:", errorMessage);
      return {
        success: false,
        mode: "meta_api",
        to: formattedPhone,
        error: errorMessage,
      };
    }
  }

  // Fallback Mock Mode for local development
  const mockMsgId = `wa_mock_${Math.random().toString(36).substring(2, 12)}`;
  console.log(
    `[MOCK WHATSAPP NOTIFIER] To: +${formattedPhone} | ID: ${mockMsgId}\nMessage Content:\n${messageText}\n---`
  );

  return {
    success: true,
    mode: "mock",
    messageId: mockMsgId,
    to: formattedPhone,
    details: {
      note: "WhatsApp notification logged in mock mode. Set WHATSAPP_API_TOKEN & WHATSAPP_PHONE_NUMBER_ID to enable live dispatches.",
    },
  };
}

/**
 * Trigger Automated Trial Confirmation WhatsApp Message
 */
export async function sendWhatsAppTrialConfirmation(
  params: WhatsAppTrialNotificationParams
): Promise<WhatsAppNotificationResponse> {
  const {
    toPhone,
    studentName,
    parentName,
    course,
    scheduledTime = "Flexible / Pending Confirmation",
    timeZone = "Local Time",
    zoomMeetingUrl,
  } = params;

  const greetingName = parentName
    ? `${parentName} & ${studentName}`
    : studentName;

  let zoomBlock = "";
  if (zoomMeetingUrl) {
    zoomBlock = `\n🎥 *Zoom Link:* ${zoomMeetingUrl}\n`;
  }

  const messageText =
    `Assalamu Alaikum *${greetingName}* 🌟\n\n` +
    `Your *Free 3-Day Trial Class* at *Maqsad-e-Quran Academy* is confirmed!\n\n` +
    `📖 *Course:* ${course}\n` +
    `👤 *Student:* ${studentName}\n` +
    `⏰ *Timing:* ${scheduledTime} (${timeZone})\n` +
    `${zoomBlock}\n` +
    `📌 *Preparation:* Please ensure Zoom is downloaded and join 2 minutes before class time.\n\n` +
    `If you need to adjust your timing, reply to this message anytime!\n` +
    `_Maqsad-e-Quran Academy Team_ 🌙`;

  return sendWhatsAppTextMessage(toPhone, messageText);
}

/**
 * Trigger Automated Admission Confirmation WhatsApp Message
 */
export async function sendWhatsAppAdmissionNotification(
  params: WhatsAppAdmissionNotificationParams
): Promise<WhatsAppNotificationResponse> {
  const {
    toPhone,
    studentName,
    parentName,
    course,
    packageName = "Standard Quran Plan",
    startDate = "Upcoming Session",
    teacherName = "Assigned Teacher",
    portalUrl = process.env.NEXT_PUBLIC_APP_URL || "https://maqsadquran.com",
  } = params;

  const greetingName = parentName
    ? `${parentName} & ${studentName}`
    : studentName;

  const messageText =
    `Assalamu Alaikum *${greetingName}* 🎉\n\n` +
    `Welcome to the *Maqsad-e-Quran Academy* family! Your admission is officially confirmed.\n\n` +
    `📖 *Enrolled Course:* ${course}\n` +
    `👤 *Student:* ${studentName}\n` +
    `📦 *Plan:* ${packageName}\n` +
    `🎓 *Teacher:* ${teacherName}\n` +
    `📅 *Start Date:* ${startDate}\n\n` +
    `🌐 *Student Portal:* ${portalUrl}/dashboard\n\n` +
    `May Allah bless your Quranic learning journey. Our academic team is here to assist you 24/7!\n` +
    `_Maqsad-e-Quran Academy_ 🌙`;

  return sendWhatsAppTextMessage(toPhone, messageText);
}

/**
 * Trigger Automated Payment Checkout / Fee Invoice Link WhatsApp Message
 */
export async function sendWhatsAppPaymentLink(
  params: WhatsAppPaymentLinkParams
): Promise<WhatsAppNotificationResponse> {
  const {
    toPhone,
    studentName,
    packageName,
    amount,
    currency,
    paymentUrl,
    dueDate = "End of Month",
  } = params;

  const messageText =
    `Assalamu Alaikum *${studentName}* 💳\n\n` +
    `Here is your tuition payment invoice for *Maqsad-e-Quran Academy*:\n\n` +
    `📦 *Package:* ${packageName}\n` +
    `💵 *Amount:* ${currency.toUpperCase()} ${amount}\n` +
    `📅 *Due Date:* ${dueDate}\n\n` +
    `👉 *Pay Securely Online:* ${paymentUrl}\n\n` +
    `We accept Stripe (Cards), PayPal, Wise, Payoneer, JazzCash, & Easypaisa.\n` +
    `Thank you for your prompt support!`;

  return sendWhatsAppTextMessage(toPhone, messageText);
}

/**
 * Trigger Automated Class Reminder WhatsApp Message
 */
export async function sendWhatsAppClassReminder(
  toPhone: string,
  studentName: string,
  course: string,
  classTime: string,
  zoomUrl?: string
): Promise<WhatsAppNotificationResponse> {
  const zoomText = zoomUrl ? `\n🎥 *Class Link:* ${zoomUrl}\n` : "";

  const messageText =
    `Assalamu Alaikum *${studentName}* ⏰\n\n` +
    `This is a quick reminder that your *${course}* class is starting in 15 minutes at *${classTime}*.\n` +
    `${zoomText}\n` +
    `Please prepare your Quran/Qaida and join on time! BarakaAllahu Feekum 🤲`;

  return sendWhatsAppTextMessage(toPhone, messageText);
}
