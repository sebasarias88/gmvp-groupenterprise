import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.slogan}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(ellipse at 80% 0%, #3a2f12 0%, #0b0a08 60%)",
          color: "#f5efe0",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 8, color: "#d4af37" }}>GMVP GROUP ENTERPRISE</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, lineHeight: 1, fontFamily: "serif" }}>
          <span>Sueña. Crea. Avanza.</span>
          <span style={{ color: "#d4af37", fontStyle: "italic" }}>Es posible.</span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#b9b09c" }}>Fondo de inversión de capital privado · Bogotá</div>
      </div>
    ),
    size,
  );
}
