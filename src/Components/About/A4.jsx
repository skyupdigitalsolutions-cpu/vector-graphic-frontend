import React, { useState, useRef, useEffect } from "react";

const DURATION = "0.5s";
const EASING   = "cubic-bezier(0.37, 0, 0.63, 1)";
const TRANSITION = `clip-path ${DURATION} ${EASING}, border-radius ${DURATION} ${EASING}`;

/*
  We use polygon() with percentage values — these ARE valid for clip-path on HTML elements.
  To fake rounded corners on the polygon, we use a CSS filter trick:
  wrap each animated element in a parent with filter: blur + contrast (the "gooey" technique
  makes edges smooth). But that tints colors. Instead, we use a simpler approach:

  We animate border-radius ALONGSIDE clip-path:
  - At rest: border-radius is asymmetric to match the pinched shape feel
  - On hover: border-radius becomes uniform 24px rounded rect
  - clip-path goes from pinched polygon → full rectangle
  The border-radius shows through because clip-path clips AFTER border-radius is applied.
*/

/* PANEL (orange image) clip-path values */
const PANEL_REST   = "polygon(0% 0%, 91% 12%, 93% 13%, 95% 15%, 96% 17%, 96% 83%, 95% 85%, 93% 87%, 91% 88%, 0% 100%)";
const PANEL_HOVER  = "polygon(0% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 0% 100%)";

/* OVERLAY (white card) clip-path values */
const OVERLAY_REST  = "polygon(0% 12%, 4% 15%, 6% 17%, 8% 17%, 100% 0%, 100% 100%, 8% 83%, 6% 84%, 4% 86%, 0% 88%)";
const OVERLAY_HOVER = "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%)";

export default function ImpactSection() {
  const [isHovered, setIsHovered] = useState(false);
  const overlayRef  = useRef(null);
  const panelRef    = useRef(null);
  const initialized = useRef(false);

  /* Mount: set initial state instantly (no transition) */
  useEffect(() => {
    const overlay = overlayRef.current;
    const panel   = panelRef.current;
    if (!overlay || !panel) return;

    overlay.style.transition = "none";
    panel.style.transition   = "none";
    overlay.style.clipPath   = OVERLAY_REST;
    panel.style.clipPath     = PANEL_REST;
    panel.style.borderRadius = "36px 0px 0px 36px";

    /* tick so the browser paints the initial state before we enable transitions */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.style.transition = TRANSITION;
        panel.style.transition   = TRANSITION;
        initialized.current = true;
      });
    });
  }, []);

  /* Hover: animate to hovered / rest state */
useEffect(() => {
    if (!initialized.current) return;
    const overlay = overlayRef.current;
    const panel   = panelRef.current;
    if (!overlay || !panel) return;

    overlay.style.transition = TRANSITION;  /* ← ADD */
    panel.style.transition   = TRANSITION;  /* ← ADD */

    if (isHovered) {
      overlay.style.clipPath   = OVERLAY_HOVER;
      panel.style.clipPath     = PANEL_HOVER;
      panel.style.borderRadius = "36px";
    } else {
      overlay.style.clipPath   = OVERLAY_REST;
      panel.style.clipPath     = PANEL_REST;
      panel.style.borderRadius = "36px 0px 0px 36px";
    }
  }, [isHovered]);
  const textContent = (
    <>
      <h2
        className="text-white leading-tight text-[20px] md:text-[40px] lg:text-[38px]"
        style={{ fontFamily: "ultra" }}
      >
        We Create Impactful Design Solutions
      </h2>
      <p
        className="text-gray-300 text-[14px] md:text-[18px] lg:text-[15px] leading-relaxed"
        style={{ fontFamily: "poppins" }}
      >
        We provide creative, technology-driven design and branding services that
        help businesses stand out and grow. From concept to delivery, our team
        builds results-focused solutions tailored to your goals and market
        needs.
      </p>
      <a
        href="/contactus"
        className="w-fit px-6 py-3 rounded-lg text-white text-[18px] font-semibold hover:opacity-90 active:scale-95 transition-all"
        style={{
          backgroundColor: "#C0160F",
          fontFamily: "poppins",
          textDecoration: "none",
        }}
      >
        Contact Us
      </a>
    </>
  );

  return (
    <section
      className="w-full flex items-center justify-center py-16 px-6 md:px-10 lg:px-20"
      style={{ backgroundColor: "#12151C", minHeight: "520px" }}
    >
      {/* ── MOBILE + MEDIUM — untouched ── */}
      <div className="flex lg:hidden flex-col w-full max-w-md md:max-w-xl mx-auto">
          <div
    className="relative z-10"
    style={{
      width: "95%",
      aspectRatio: "1 / 0.85",
      flexShrink: 0,
      position: "relative",
    }}
  >
    {/* SVG clip definition */}
    <svg width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <clipPath id="mobileClip" clipPathUnits="objectBoundingBox">
  <path d="M0,0.14 Q0,0 0.18,0.04 L0.82,0.10 Q1,0.1 1,0.23 L1,0.76 Q1,0.90 0.82,0.90 L0.18,0.98 Q0,1 0,0.88 Z" />
</clipPath>
      </defs>
    </svg>

    {/* orange bg */}
    <div style={{
      position: "absolute",
      inset: 0,
      background: "linear-gradient(-180deg, #F97316 0%, #EA4C0A 100%)",
      clipPath: "url(#mobileClip)",
    }} />

    {/* image */}
    <img
      src="/images/crossed_image.webp"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "top center",
        display: "block",
        clipPath: "url(#mobileClip)",
      }}
    />
  </div>
        <div
          className="flex flex-col gap-4 p-5 pt-12"
          style={{
            backgroundColor: "#1C1F28",
            borderRadius: "24px",
            marginTop: "-48px",
          }}
        >
          {textContent}
        </div>
      </div>

      {/* ── LARGE ── */}
      <div
        className="relative w-full max-w-5xl hidden lg:flex items-center"
        style={{ minHeight: "420px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* White overlay */}
        <div
          ref={overlayRef}
          className="absolute"
          style={{
            backgroundColor: "#FFFFFF",
            width: "870px",
            height: "550px",
            left: "235px",
            opacity: "0.10",
            borderRadius: "30px",
            zIndex: 1,
          }}
        />

        {/* Orange image panel */}
        <div
          ref={panelRef}
          className="relative z-10 flex-shrink-0"
          style={{
            width: "44%",
            aspectRatio: "1 / 1.05",
            overflow: "hidden",
            background: "linear-gradient(-180deg, #F97316 0%, #EA4C0A 100%)",
            
          }}
        >
          <img
            src="/images/service_hover.webp"
            alt="Design Solutions"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Divider */}
        <div
          className="relative z-10"
          style={{ width: "2px", margin: "10% 12px" }}
        />

        {/* Text */}
        <div
          className="relative z-10 flex flex-col gap-5 py-10 pr-10"
          style={{ flex: 1 }}
        >
          {textContent}
        </div>
      </div>
    </section>
  );
}
