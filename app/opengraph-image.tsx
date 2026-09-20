import { ImageResponse } from "next/og";
import { SITE } from "@/lib/data";

export const runtime = "edge";
export const alt = "Toro — Cybersecurity Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          color: "#fafafa",
          padding: 72,
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <span style={{ fontSize: 28, letterSpacing: 8, opacity: 0.6 }}>
            {SITE.role.toUpperCase()}
          </span>
          <span style={{ fontSize: 22, letterSpacing: 6, opacity: 0.5 }}>
            {SITE.base}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 200, letterSpacing: -12, fontWeight: 500, lineHeight: 1 }}>
            TORO
          </div>
          <div style={{ fontSize: 34, color: "#a1a1aa", letterSpacing: 2 }}>
            Building secure systems &amp; meaningful digital experiences.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", borderTop: "1px solid #27272a", paddingTop: 24 }}>
          <span style={{ fontSize: 22, letterSpacing: 6, opacity: 0.6 }}>
            ECLIPSE / BLACKSITE
          </span>
          <span style={{ fontSize: 22, letterSpacing: 6, opacity: 0.5 }}>
            © 2026
          </span>
        </div>
      </div>
    ),
    size,
  );
}