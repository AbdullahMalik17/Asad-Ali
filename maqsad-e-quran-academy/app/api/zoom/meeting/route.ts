import { NextResponse } from "next/server";

interface ZoomMeetingRequestBody {
  topic?: string;
  startTime?: string;
  duration?: number; // in minutes
  teacherId?: string;
  studentId?: string;
  agenda?: string;
  timezone?: string;
}

/**
 * Generate Server-to-Server Zoom Access Token when credentials are provided
 */
async function getZoomAccessToken(): Promise<string | null> {
  const accountId = process.env.ZOOM_ACCOUNT_ID;
  const clientId = process.env.ZOOM_CLIENT_ID;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET;

  if (!accountId || !clientId || !clientSecret) {
    return null; // Signals mock fallback mode
  }

  try {
    const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const response = await fetch(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${authHeader}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!response.ok) {
      console.warn("Zoom OAuth token fetch failed, switching to mock mode");
      return null;
    }

    const data = await response.json();
    return data.access_token || null;
  } catch (error) {
    console.error("Zoom Access Token Error:", error);
    return null;
  }
}

/**
 * POST /api/zoom/meeting
 * Creates or schedules a live Zoom meeting for online Quran classes
 */
export async function POST(req: Request) {
  try {
    const body: ZoomMeetingRequestBody = await req.json();

    const topic = body.topic || "1-on-1 Quran Class - Maqsad-e-Quran Academy";
    const startTime = body.startTime || new Date(Date.now() + 3600000).toISOString();
    const duration = body.duration || 30; // Default 30 mins
    const agenda = body.agenda || "Tajweed & Quran Recitation Practice";
    const timezone = body.timezone || "UTC";

    const accessToken = await getZoomAccessToken();

    // Live API integration if credentials are properly set
    if (accessToken) {
      const zoomRes = await fetch("https://api.zoom.us/v2/users/me/meetings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          type: 2, // Scheduled meeting
          start_time: startTime,
          duration,
          timezone,
          agenda,
          settings: {
            host_video: true,
            participant_video: true,
            join_before_host: false,
            mute_upon_entry: true,
            waiting_room: true,
          },
        }),
      });

      if (zoomRes.ok) {
        const meetingData = await zoomRes.json();
        return NextResponse.json({
          success: true,
          mode: "live",
          meeting: {
            id: meetingData.id,
            topic: meetingData.topic,
            join_url: meetingData.join_url,
            start_url: meetingData.start_url,
            passcode: meetingData.password,
            start_time: meetingData.start_time,
            duration: meetingData.duration,
            timezone: meetingData.timezone,
            status: "scheduled",
          },
        });
      }
    }

    // Mock response mode (for development, testing, or unconfigured Zoom env)
    const mockMeetingId = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const mockPasscode = Math.random().toString(36).substring(2, 8);

    const mockResponse = {
      success: true,
      mode: "mock",
      message: "Zoom meeting generated successfully (Mock Mode)",
      meeting: {
        id: mockMeetingId,
        topic,
        teacherId: body.teacherId || "tch_female_tajweed_01",
        studentId: body.studentId || "std_demo_101",
        agenda,
        join_url: `https://zoom.us/j/${mockMeetingId}?pwd=${mockPasscode}`,
        start_url: `https://zoom.us/s/${mockMeetingId}?pwd=${mockPasscode}&role=1`,
        passcode: mockPasscode,
        start_time: startTime,
        duration: Number(duration),
        timezone,
        status: "waiting",
        created_at: new Date().toISOString(),
      },
    };

    return NextResponse.json(mockResponse, { status: 201 });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Zoom API Handler Error:", errMessage);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate Zoom meeting link",
        details: errMessage,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/zoom/meeting?meetingId=...
 * Fetch details of a scheduled meeting
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const meetingId = searchParams.get("meetingId");

  if (!meetingId) {
    return NextResponse.json(
      {
        success: true,
        mode: "mock",
        upcomingMeetings: [
          {
            id: "9823412084",
            topic: "Noorani Qaida & Basic Tajweed - Trial Session",
            teacherName: "Ustadha Fatima",
            studentName: "Amina Khan",
            start_time: new Date(Date.now() + 1800000).toISOString(),
            duration: 30,
            join_url: "https://zoom.us/j/98823412084?pwd=mockpassquran",
            status: "ready",
          },
          {
            id: "8712390192",
            topic: "Hifz Revision - Juz 30",
            teacherName: "Qari Ahmed",
            studentName: "Bilal Hussain",
            start_time: new Date(Date.now() + 86400000).toISOString(),
            duration: 45,
            join_url: "https://zoom.us/j/8712390192?pwd=mockpasshifz",
            status: "scheduled",
          },
        ],
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      mode: "mock",
      meeting: {
        id: meetingId,
        topic: "1-on-1 Quran Class - Maqsad-e-Quran Academy",
        status: "active",
        join_url: `https://zoom.us/j/${meetingId}?pwd=mockpass123`,
        start_time: new Date().toISOString(),
        duration: 30,
      },
    },
    { status: 200 }
  );
}
