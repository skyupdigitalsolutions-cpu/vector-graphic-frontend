import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../src/index.css";

export default function Layout({ children }) {
  useEffect(() => {
    const CURSOR = "url(/images/red-circle.svg) 10 10, auto";

    const forceRedCircle = () => {
      document.documentElement.style.setProperty("cursor", CURSOR, "important");
      document.body.style.setProperty("cursor", CURSOR, "important");

      // Force on every single element in DOM
      document.querySelectorAll("*").forEach((el) => {
        el.style.setProperty("cursor", CURSOR, "important");
      });
    };

    // Cover every possible mouse event
    const events = [
      "mousedown",
      "mouseup",
      "mousemove",
      "mouseover",
      "mouseenter",
      "mouseleave",
      "mouseout",
      "click",
      "dblclick",
      "pointerdown",
      "pointerup",
      "pointermove",
      "pointerover",
      "pointerenter",
    ];

    events.forEach((event) => {
      document.addEventListener(event, forceRedCircle);
    });

    // Also run immediately
    forceRedCircle();

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, forceRedCircle);
      });
    };
  }, []);

  return (
    <div style={{ cursor: "url(/images/red-circle.svg) 10 10, auto" }}>
      {children}
    </div>
  );
}
