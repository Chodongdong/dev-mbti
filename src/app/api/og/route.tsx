import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username") ?? "unknown";
  const typeName = searchParams.get("type") ?? "개발자";
  const emoji = searchParams.get("emoji") ?? "🧬";
  const color = searchParams.get("color") ?? "#6366f1";
  const shortDesc = searchParams.get("desc") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* 배경 그라디언트 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 60% 40%, ${color}22 0%, transparent 70%)`,
          }}
        />

        {/* 카드 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            padding: "60px 80px",
            borderRadius: "24px",
            border: `2px solid ${color}40`,
            backgroundColor: `${color}0a`,
            maxWidth: "900px",
            width: "100%",
          }}
        >
          {/* 이모지 */}
          <div style={{ fontSize: "96px", lineHeight: 1 }}>{emoji}</div>

          {/* 유형명 */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: color,
              letterSpacing: "-1px",
              lineHeight: 1.1,
            }}
          >
            {typeName}
          </div>

          {/* 설명 */}
          {shortDesc && (
            <div
              style={{
                fontSize: "26px",
                color: "#888",
                textAlign: "center",
                maxWidth: "700px",
              }}
            >
              {shortDesc}
            </div>
          )}

          {/* 유저명 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 24px",
              borderRadius: "100px",
              backgroundColor: "#ffffff10",
              border: "1px solid #ffffff20",
            }}
          >
            <span style={{ fontSize: "22px", color: "#aaa" }}>@{username}</span>
          </div>
        </div>

        {/* 브랜딩 */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "28px" }}>🧬</span>
          <span style={{ fontSize: "22px", color: "#555", fontWeight: 600 }}>
            dev-mbti
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
