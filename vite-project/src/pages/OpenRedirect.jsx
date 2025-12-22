import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function OpenRedirect() {
  const location = useLocation();

  useEffect(() => {
    // Build app deep link from current URL
    const appLink = `recallking://${location.pathname}${location.search}`;

    // Try to open the app
    window.location.href = appLink;
  }, [location]);

  return (
    <div style={{ textAlign: "center", paddingTop: "40px" }}>
      <h2>Opening Recall King…</h2>

      <p>If the app does not open automatically, tap below:</p>

      <a
        href={`recallking://${location.pathname}${location.search}`}
        style={{
          display: "inline-block",
          padding: "12px 18px",
          backgroundColor: "#0F8A5F",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "6px",
          fontWeight: "bold",
        }}
      >
        Open in Recall King App
      </a>
    </div>
  );
}
