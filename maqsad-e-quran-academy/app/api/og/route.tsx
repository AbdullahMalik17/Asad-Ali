import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title") || "Maqsad-e-Quran Academy";
    const subtitle =
      searchParams.get("subtitle") ||
      "Online 1-on-1 Quran Classes with Certified Male & Female Teachers";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "#022c22", // emerald-950
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(251, 191, 36, 0.15), transparent 40%), radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.2), transparent 50%)",
            padding: "60px 80px",
            color: "white",
            fontFamily: "sans-serif",
          }}
        >
          {/* Header Badge & Branding */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "54px",
                height: "54px",
                borderRadius: "16px",
                backgroundColor: "#fbbf24", // amber-400
                color: "#022c22",
                fontWeight: "900",
                fontSize: "26px",
              }}
            >
              🌙
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: "900",
                  color: "#fbbf24",
                  letterSpacing: "-0.5px",
                }}
              >
                Maqsad-e-Quran
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#6ee7b7",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                Online Quran Academy Worldwide
              </span>
            </div>
          </div>

          {/* Main Title & Subtitle */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "900px" }}>
            <h1
              style={{
                fontSize: "56px",
                fontWeight: "900",
                color: "#ffffff",
                lineHeight: "1.15",
                margin: 0,
                letterSpacing: "-1px",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "24px",
                color: "#d1fae5",
                fontWeight: "500",
                lineHeight: "1.4",
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Bottom Trust Highlights */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              paddingTop: "30px",
              borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          >
            <div style={{ display: "flex", gap: "24px", fontSize: "16px", fontWeight: "700", color: "#fcd34d" }}>
              <span>✓ 3-Day Free Trial</span>
              <span>•</span>
              <span>✓ Certified Male & Female Tutors</span>
              <span>•</span>
              <span>✓ Flexible 24/7 Schedule</span>
            </div>

            <div
              style={{
                backgroundColor: "#065f46",
                color: "#ffffff",
                padding: "10px 24px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "800",
              }}
            >
              maqsadquran.com
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the OG image`, {
      status: 500,
    });
  }
}
