import { ImageResponse } from "next/og";

export const alt = "Fausto Saludas — Systems Engineer & DevOps Engineer";
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
          padding: "72px 80px",
          background: "#0d1224",
          backgroundImage:
            "radial-gradient(circle at 15% 0%, rgba(22,242,179,0.14), transparent 45%), linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 56px 56px, 56px 56px",
          color: "#e8ebf4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              border: "2px solid rgba(22,242,179,0.45)",
              background: "rgba(22,242,179,0.12)",
              color: "#16f2b3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            FS
          </div>
          <div style={{ fontSize: 24, color: "#a1a9c3" }}>faustosaludas.com</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: "-0.04em", color: "#ffffff" }}>
            Fausto Saludas
          </div>
          <div style={{ display: "flex", fontSize: 40, marginTop: 12, color: "#e8ebf4" }}>
            Systems Engineer
            <span style={{ color: "#16f2b3", margin: "0 18px" }}>·</span>
            DevOps Engineer
          </div>
          <div style={{ fontSize: 28, marginTop: 28, color: "#a1a9c3", maxWidth: 900 }}>
            Cloud infrastructure, automation and observability — and the software around it.
          </div>
        </div>
      </div>
    ),
    size
  );
}
