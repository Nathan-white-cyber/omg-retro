import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#0E0E0E",
          color: "#CC1E1E",
          display: "flex",
          fontSize: 84,
          fontWeight: 900,
          height: "100%",
          justifyContent: "center",
          letterSpacing: -4,
          width: "100%",
        }}
      >
        OR
      </div>
    ),
    size,
  );
}
