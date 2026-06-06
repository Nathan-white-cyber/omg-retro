import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#0E0E0E",
          color: "#CC1E1E",
          display: "flex",
          fontSize: 20,
          fontWeight: 900,
          height: "100%",
          justifyContent: "center",
          letterSpacing: -1,
          width: "100%",
        }}
      >
        OR
      </div>
    ),
    size,
  );
}
