import { useEffect } from "react";
import { usePageContext } from "vike-react/usePageContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../src/index.css";

export default function Layout({ children }) {
  const pageContext = usePageContext();
  const { config, urlPathname } = pageContext;

  // ── Cursor effect ─────────────────────────────────────────
  useEffect(() => {
    const CURSOR = "url(/images/red-circle.svg) 10 10, auto";

    const forceRedCircle = () => {
      document.documentElement.style.setProperty("cursor", CURSOR, "important");
      document.body.style.setProperty("cursor", CURSOR, "important");
      document.querySelectorAll("*").forEach((el) => {
        el.style.setProperty("cursor", CURSOR, "important");
      });
    };

    const events = [
      "mousedown", "mouseup", "mousemove", "mouseover",
      "mouseenter", "mouseleave", "mouseout", "click",
      "dblclick", "pointerdown", "pointerup", "pointermove",
      "pointerover", "pointerenter",
    ];

    events.forEach((e) => document.addEventListener(e, forceRedCircle));
    forceRedCircle();

    return () => events.forEach((e) => document.removeEventListener(e, forceRedCircle));
  }, []);

  // ── SEO meta updater ──────────────────────────────────────
  useEffect(() => {
    const title = config?.title;
    const description = config?.metaDescription;
    const keywords = config?.keywords;

    // Title
    if (title) document.title = title;

    // Description
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement("meta");
      descTag.setAttribute("name", "description");
      document.head.appendChild(descTag);
    }
    descTag.setAttribute("content", description ?? "");

    // Keywords
    let kwTag = document.querySelector('meta[name="keywords"]');
    if (!kwTag) {
      kwTag = document.createElement("meta");
      kwTag.setAttribute("name", "keywords");
      document.head.appendChild(kwTag);
    }
    kwTag.setAttribute("content", keywords ?? "");

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute(
      "href",
      `https://vectorgraphicfrontend.vercel.app${urlPathname === "/" ? "" : urlPathname}`
    );

  }, [urlPathname]);

  return (
    <div style={{ cursor: "url(/images/red-circle.svg) 10 10, auto" }}>
      {children}
    </div>
  );
}