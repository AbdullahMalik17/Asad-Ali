import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const SYSTEM_INSTRUCTION = `You are "Noor", the AI Student Assistant for Maqsad-e-Quran Academy.
Your role is to assist students, parents, and visitors inquiring about learning Quran online.

ACADEMY DETAILS:
- Academy Name: Maqsad-e-Quran Academy
- Services: Online 1-on-1 live Quran classes for kids and adults (male & female certified teachers).
- Core Courses Offered:
  1. Noorani Qaida (Beginners / Reading Foundation)
  2. Quran Reading with Tajweed Rules
  3. Quran Memorization (Hifz) Program
  4. Quran Translation & Tafseer (Understanding)
  5. Islamic Studies, Daily Duas & Namaz (Salah) Guide
- Key Features:
  - Free 3-Day Trial Class (No credit card required).
  - Flexible timing around the world (USA, UK, Canada, Australia, UAE, Pakistan, Europe).
  - Qualified Hafiz-e-Quran and Alim/Alimah certified teachers.
  - Dedicated female teachers for sisters and female children.
  - Affordable monthly fee plans.

TONE & BEHAVIOR:
- Warm, polite, respectful, encouraging, and Islamic (start greetings with Assalamu Alaikum when appropriate).
- Concise answers (2 to 4 sentences unless detailed explanation is asked).
- Offer helpful steps to book a free trial class or ask for preferred timings.
- Answer basic Tajweed or Quran learning questions accurately.
`;

export async function POST(req: Request) {
  try {
    const { message, sessionId, studentId } = await req.json();

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message content is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    let botResponse = "";

    if (!apiKey) {
      // Intelligent fallback response when GEMINI_API_KEY is not yet configured
      botResponse =
        "Assalamu Alaikum! Welcome to Maqsad-e-Quran Academy. We offer 1-on-1 live Quran classes with qualified male and female teachers. You can book a Free 3-Day Trial class anytime by filling out our quick contact form on this page! (Note: Connect your GEMINI_API_KEY in environment variables for live AI responses).";
    } else {
      // Call Gemini API using gemini-2.5-flash
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `${SYSTEM_INSTRUCTION}\n\nUser Question: ${message}`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Gemini API Error:", errorData);
        botResponse =
          "Assalamu Alaikum! I am experiencing a temporary connection issue. Please feel free to click the WhatsApp button or fill out the Free Trial form to connect with our team directly!";
      } else {
        const data = await response.json();
        botResponse =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Assalamu Alaikum! Thank you for reaching out. How may I assist you with your Quran learning journey today?";
      }
    }

    // Log chat interaction into Supabase asynchronously
    try {
      const supabase = getSupabaseAdmin();
      await supabase.from("chat_logs").insert([
        {
          session_id: sessionId || "guest-session",
          student_id: studentId || null,
          user_message: message,
          bot_response: botResponse,
          category: "student_query",
        },
      ]);
    } catch (dbErr) {
      console.warn("Supabase chat logging skipped/deferred:", dbErr);
    }

    return NextResponse.json({
      response: botResponse,
    });
  } catch (error: unknown) {
    console.error("Chat API route error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        response:
          "Assalamu Alaikum! Something went wrong. Please click WhatsApp to talk with our team directly.",
      },
      { status: 500 }
    );
  }
}
