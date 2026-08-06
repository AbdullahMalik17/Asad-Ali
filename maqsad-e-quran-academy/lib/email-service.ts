import { NextResponse } from "next/server";

export interface TrialConfirmationParams {
  studentName: string;
  parentName?: string;
  email: string;
  whatsapp?: string;
  course: string;
  scheduledTime?: string;
  timeZone?: string;
  teacherName?: string;
  zoomMeetingUrl?: string;
  language?: string;
}

export interface AdmissionConfirmationParams {
  studentName: string;
  parentName?: string;
  email: string;
  course: string;
  packageId?: string;
  packageName?: string;
  amountPaid?: number;
  currency?: string;
  scheduleDetails?: string;
  startDate?: string;
  teacherName?: string;
  portalUrl?: string;
  receiptNumber?: string;
}

export interface CustomEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface SendEmailResponse {
  success: boolean;
  messageId?: string;
  mode: "resend" | "mock";
  error?: string;
  details?: Record<string, unknown>;
}

/**
 * Core Resend Email Dispatch Helper
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: CustomEmailParams): Promise<SendEmailResponse> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.EMAIL_FROM ||
    "Maqsad-e-Quran Academy <notifications@maqsadquran.com>";

  // Live Resend API Dispatch
  if (apiKey && !apiKey.startsWith("re_123456789")) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [to],
          subject,
          html,
          text: text || html.replace(/<[^>]+>/g, " ").trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          mode: "resend",
          messageId: data.id,
          details: data,
        };
      }

      console.warn("Resend API responded with error:", data);
      return {
        success: false,
        mode: "resend",
        error: data.message || "Failed to send email via Resend API",
        details: data,
      };
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error";
      console.error("Resend API Dispatch Error:", errorMessage);
      return {
        success: false,
        mode: "resend",
        error: errorMessage,
      };
    }
  }

  // Mock Mode Fallback for local development or when API key is unconfigured
  const mockId = `msg_resend_mock_${Math.random().toString(36).substring(2, 12)}`;
  console.log(`[MOCK RESEND EMAIL] To: ${to} | Subject: "${subject}" | ID: ${mockId}`);

  return {
    success: true,
    mode: "mock",
    messageId: mockId,
    details: {
      note: "Email simulated in mock mode. Add RESEND_API_KEY to .env to enable live dispatch.",
      to,
      subject,
    },
  };
}

/**
 * Generate HTML Template for Free Trial Confirmation Email
 */
function buildTrialConfirmationHtml(params: TrialConfirmationParams): string {
  const {
    studentName,
    parentName,
    course,
    scheduledTime = "To be confirmed via WhatsApp/Email",
    timeZone = "UTC/Local Time",
    teacherName = "Assigned Senior Qari/Ustadha",
    zoomMeetingUrl,
  } = params;

  const recipientGreeting = parentName
    ? `Respected ${parentName} & ${studentName}`
    : `Dear ${studentName}`;

  const joinLinkBlock = zoomMeetingUrl
    ? `
      <div style="margin: 24px 0; text-align: center;">
        <a href="${zoomMeetingUrl}" style="background-color: #059669; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; box-shadow: 0 4px 6px rgba(5, 150, 105, 0.2);">
          🎥 Join Trial Class (Zoom)
        </a>
      </div>
    `
    : `
      <div style="background-color: #fef3c7; border: 1px solid #f59e0b; padding: 14px; border-radius: 8px; color: #92400e; margin: 20px 0; font-size: 14px;">
        💡 <strong>Note:</strong> Your Zoom meeting link and teacher details will also be shared via WhatsApp shortly.
      </div>
    `;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Free Trial Confirmation - Maqsad-e-Quran Academy</title>
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; color: #1e293b;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <tr>
          <td style="background: linear-gradient(135deg, #022c22 0%, #064e3b 100%); padding: 32px 24px; text-align: center; color: #ffffff;">
            <div style="font-size: 28px; font-weight: 800; letter-spacing: 0.5px; color: #fbbf24; margin-bottom: 4px;">
              Maqsad-e-Quran Academy 🌙
            </div>
            <div style="font-size: 13px; text-transform: uppercase; tracking: 1px; color: #a7f3d0; opacity: 0.9;">
              Online Quran & Islamic Studies
            </div>
          </td>
        </tr>

        <!-- Main Body -->
        <tr>
          <td style="padding: 32px 28px;">
            <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 12px 16px; border-radius: 4px; margin-bottom: 24px; color: #065f46; font-weight: 600;">
              ✨ FREE 3-DAY TRIAL CLASS CONFIRMED!
            </div>

            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
              Assalamu Alaikum WBT <strong>${recipientGreeting}</strong>,
            </p>

            <p style="font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 24px;">
              We are delighted to confirm your registration for a <strong>Free 3-Day Trial Class</strong> at Maqsad-e-Quran Academy. Below are your trial session details:
            </p>

            <!-- Schedule Card -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 24px;">
              <tr>
                <td style="padding: 16px 20px; border-bottom: 1px solid #e2e8f0;">
                  <strong style="color: #64748b; font-size: 12px; text-transform: uppercase;">Selected Course:</strong>
                  <div style="font-size: 16px; font-weight: 700; color: #0f172a; margin-top: 2px;">${course}</div>
                </td>
              </tr>
              <tr>
                <td style="padding: 16px 20px; border-bottom: 1px solid #e2e8f0;">
                  <strong style="color: #64748b; font-size: 12px; text-transform: uppercase;">Student Name:</strong>
                  <div style="font-size: 15px; font-weight: 600; color: #1e293b; margin-top: 2px;">${studentName}</div>
                </td>
              </tr>
              <tr>
                <td style="padding: 16px 20px; border-bottom: 1px solid #e2e8f0;">
                  <strong style="color: #64748b; font-size: 12px; text-transform: uppercase;">Scheduled Time & Timezone:</strong>
                  <div style="font-size: 15px; font-weight: 600; color: #047857; margin-top: 2px;">${scheduledTime} (${timeZone})</div>
                </td>
              </tr>
              <tr>
                <td style="padding: 16px 20px;">
                  <strong style="color: #64748b; font-size: 12px; text-transform: uppercase;">Assigned Instructor:</strong>
                  <div style="font-size: 15px; font-weight: 600; color: #1e293b; margin-top: 2px;">${teacherName}</div>
                </td>
              </tr>
            </table>

            ${joinLinkBlock}

            <!-- Pre-class checklist -->
            <div style="background-color: #ffffff; border: 1px dashed #cbd5e1; border-radius: 10px; padding: 18px; margin-top: 24px;">
              <h4 style="margin: 0 0 10px 0; font-size: 14px; color: #0f172a;">📋 Student Preparation Checklist:</h4>
              <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 13px; line-height: 1.7;">
                <li>Ensure Zoom app is installed on your laptop, tablet, or phone.</li>
                <li>Join from a quiet environment with stable internet connection.</li>
                <li>Headphones or earphones are recommended for clear audio transmission.</li>
              </ul>
            </div>

            <!-- Need Help Block -->
            <p style="font-size: 14px; color: #64748b; margin-top: 28px; line-height: 1.6;">
              Need to reschedule or have questions? Contact our Support Team on WhatsApp or reply directly to this email.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color: #0f172a; padding: 24px; text-align: center; color: #94a3b8; font-size: 12px; line-height: 1.6;">
            <p style="margin: 0 0 6px 0; font-weight: 600; color: #e2e8f0;">Maqsad-e-Quran Academy</p>
            <p style="margin: 0 0 10px 0;">Worldwide Online Quran Teaching with Certified Male & Female Teachers</p>
            <p style="margin: 0; font-size: 11px; color: #64748b;">
              &copy; ${new Date().getFullYear()} Maqsad-e-Quran Academy. All Rights Reserved.
            </p>
          </td>
        </tr>

      </table>
    </body>
    </html>
  `;
}

/**
 * Generate HTML Template for Admission & Enrollment Confirmation Email
 */
function buildAdmissionConfirmationHtml(
  params: AdmissionConfirmationParams
): string {
  const {
    studentName,
    parentName,
    course,
    packageName = "Standard Monthly Quran Plan",
    amountPaid = 50,
    currency = "USD",
    scheduleDetails = "Flexible Schedule (3 Days / Week)",
    startDate = "Immediate Start",
    teacherName = "Assigned Teacher",
    portalUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://maqsadquran.com"}/dashboard`,
    receiptNumber = `REC-${Math.floor(100000 + Math.random() * 900000)}`,
  } = params;

  const recipientGreeting = parentName
    ? `Respected ${parentName} & ${studentName}`
    : `Dear ${studentName}`;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Official Admission & Payment Receipt - Maqsad-e-Quran Academy</title>
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; color: #1e293b;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <tr>
          <td style="background: linear-gradient(135deg, #022c22 0%, #064e3b 100%); padding: 32px 24px; text-align: center; color: #ffffff;">
            <div style="font-size: 28px; font-weight: 800; letter-spacing: 0.5px; color: #fbbf24; margin-bottom: 4px;">
              Maqsad-e-Quran Academy 🌙
            </div>
            <div style="font-size: 13px; text-transform: uppercase; tracking: 1px; color: #a7f3d0; opacity: 0.9;">
              Official Admission & Payment Confirmation
            </div>
          </td>
        </tr>

        <!-- Main Body -->
        <tr>
          <td style="padding: 32px 28px;">
            <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 14px 18px; border-radius: 8px; margin-bottom: 24px; text-align: center;">
              <span style="font-size: 20px;">🎉</span>
              <strong style="font-size: 16px; color: #15803d; margin-left: 8px;">Admission & Course Enrollment Confirmed!</strong>
            </div>

            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
              Assalamu Alaikum WBT <strong>${recipientGreeting}</strong>,
            </p>

            <p style="font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 24px;">
              JazakAllah Khair for enrolling with Maqsad-e-Quran Academy! We have successfully registered your admission and received your tuition fee payment.
            </p>

            <!-- Receipt & Enrollment Summary -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 24px;">
              <tr style="background-color: #f1f5f9;">
                <td colspan="2" style="padding: 12px 20px; font-size: 13px; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e2e8f0;">
                  Official Receipt Reference: <span style="color: #059669;">${receiptNumber}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 14px 20px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">Enrolled Student:</td>
                <td style="padding: 14px 20px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 700; font-size: 14px; text-align: right;">${studentName}</td>
              </tr>
              <tr>
                <td style="padding: 14px 20px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">Course Name:</td>
                <td style="padding: 14px 20px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 700; font-size: 14px; text-align: right;">${course}</td>
              </tr>
              <tr>
                <td style="padding: 14px 20px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">Tuition Plan:</td>
                <td style="padding: 14px 20px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px; text-align: right;">${packageName}</td>
              </tr>
              <tr>
                <td style="padding: 14px 20px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">Amount Paid:</td>
                <td style="padding: 14px 20px; border-bottom: 1px solid #e2e8f0; color: #047857; font-weight: 800; font-size: 16px; text-align: right;">${currency.toUpperCase()} ${amountPaid}</td>
              </tr>
              <tr>
                <td style="padding: 14px 20px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">Class Schedule:</td>
                <td style="padding: 14px 20px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px; text-align: right;">${scheduleDetails}</td>
              </tr>
              <tr>
                <td style="padding: 14px 20px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">Assigned Teacher:</td>
                <td style="padding: 14px 20px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px; text-align: right;">${teacherName}</td>
              </tr>
              <tr>
                <td style="padding: 14px 20px; color: #64748b; font-size: 14px;">Official Start Date:</td>
                <td style="padding: 14px 20px; color: #0f172a; font-weight: 600; font-size: 14px; text-align: right;">${startDate}</td>
              </tr>
            </table>

            <!-- Student Portal Call to Action -->
            <div style="text-align: center; margin: 28px 0;">
              <a href="${portalUrl}" style="background-color: #047857; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 15px; box-shadow: 0 4px 6px rgba(4, 120, 87, 0.25);">
                🎓 Access Student Dashboard
              </a>
            </div>

            <p style="font-size: 14px; color: #64748b; line-height: 1.6; margin-top: 24px;">
              Our Academic Supervisor will reach out to you on WhatsApp to finalize your recurring Zoom link and class reminders. May Allah bless your journey of Quranic learning!
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color: #0f172a; padding: 24px; text-align: center; color: #94a3b8; font-size: 12px; line-height: 1.6;">
            <p style="margin: 0 0 6px 0; font-weight: 600; color: #e2e8f0;">Maqsad-e-Quran Academy</p>
            <p style="margin: 0 0 10px 0;">Dedicated to Excellence in Quran & Tajweed Education</p>
            <p style="margin: 0; font-size: 11px; color: #64748b;">
              &copy; ${new Date().getFullYear()} Maqsad-e-Quran Academy. All Rights Reserved.
            </p>
          </td>
        </tr>

      </table>
    </body>
    </html>
  `;
}

/**
 * Dispatch Automatic Trial Confirmation Email
 */
export async function sendTrialConfirmationEmail(
  params: TrialConfirmationParams
): Promise<SendEmailResponse> {
  const html = buildTrialConfirmationHtml(params);
  const subject = `Free Trial Confirmation - Maqsad-e-Quran Academy (${params.studentName})`;

  return sendEmail({
    to: params.email,
    subject,
    html,
  });
}

/**
 * Dispatch Automatic Admission & Payment Confirmation Email
 */
export async function sendAdmissionConfirmationEmail(
  params: AdmissionConfirmationParams
): Promise<SendEmailResponse> {
  const html = buildAdmissionConfirmationHtml(params);
  const subject = `Official Admission & Tuition Receipt - ${params.studentName} (Maqsad-e-Quran Academy)`;

  return sendEmail({
    to: params.email,
    subject,
    html,
  });
}
