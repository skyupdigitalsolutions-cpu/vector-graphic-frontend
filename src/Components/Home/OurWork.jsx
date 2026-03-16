import React, { useEffect, useState, useRef } from "react";

const allImages = [
  { id: 1,  src: "/images/workpage_1.webp",  title: "Are You Ready for the 2D Barcode Revolution? 7 Powerful Ways 2D Barcodes Are Transforming Businesses in 2026." },
  { id: 2,  src: "/images/workpage_2.webp",  title: "Are You Ready for the 2D Barcode Revolution? 7 Powerful Ways 2D Barcodes Are Transforming Businesses in 2026." },
  { id: 3,  src: "/images/workpage_3.webp",  title: "Are You Ready for the 2D Barcode Revolution? 7 Powerful Ways 2D Barcodes Are Transforming Businesses in 2026." },
  { id: 4,  src: "/images/workpage_4.webp",  title: "Are You Ready for the 2D Barcode Revolution? 7 Powerful Ways 2D Barcodes Are Transforming Businesses in 2026." },
  { id: 5,  src: "/images/workpage_5.webp",  title: "Are You Ready for the 2D Barcode Revolution? 7 Powerful Ways 2D Barcodes Are Transforming Businesses in 2026." },
  { id: 6,  src: "/images/workpage_6.webp",  title: "Are You Ready for the 2D Barcode Revolution? 7 Powerful Ways 2D Barcodes Are Transforming Businesses in 2026." },
  { id: 7,  src: "/images/workpage_7.webp",  title: "Are You Ready for the 2D Barcode Revolution? 7 Powerful Ways 2D Barcodes Are Transforming Businesses in 2026." },
  { id: 8,  src: "/images/workpage_8.webp",  title: "Are You Ready for the 2D Barcode Revolution? 7 Powerful Ways 2D Barcodes Are Transforming Businesses in 2026." },
  { id: 9,  src: "/images/workpage_9.webp",  title: "Are You Ready for the 2D Barcode Revolution? 7 Powerful Ways 2D Barcodes Are Transforming Businesses in 2026." },
  { id: 10, src: "/images/workpage_10.webp", title: "Are You Ready for the 2D Barcode Revolution? 7 Powerful Ways 2D Barcodes Are Transforming Businesses in 2026." },
];

// ── Shared rAF-based infinite marquee hook ────────────────────
function useInfiniteMarquee(speed = 0.6) {
  const trackRef   = useRef(null);
  const outerRef   = useRef(null);
  const rafRef     = useRef(null);
  const posRef     = useRef(0);     // current translateX in px
  const halfRef    = useRef(0);     // width of one set of cards
  const dragging   = useRef(false);
  const lastX      = useRef(0);
  const hovered    = useRef(false); // desktop: pause on hover

  useEffect(() => {
    if (trackRef.current) {
      halfRef.current = trackRef.current.scrollWidth / 2;
    }

    const tick = () => {
      if (!dragging.current && !hovered.current) {
        posRef.current -= speed;
        if (Math.abs(posRef.current) >= halfRef.current) {
          posRef.current = 0;
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${posRef.current}px)`;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed]);

  const onPointerDown = (clientX) => {
    dragging.current = true;
    lastX.current = clientX;
    if (outerRef.current) outerRef.current.style.cursor = "grabbing";
  };

  const onPointerMove = (clientX) => {
    if (!dragging.current) return;
    const dx = clientX - lastX.current;
    lastX.current = clientX;
    posRef.current += dx;
    if (posRef.current > 0) posRef.current -= halfRef.current;
    if (Math.abs(posRef.current) >= halfRef.current) {
      posRef.current = posRef.current % -halfRef.current;
    }
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${posRef.current}px)`;
    }
  };

  const onPointerUp = () => {
    dragging.current = false;
    if (outerRef.current) outerRef.current.style.cursor = "grab";
  };

  const setHovered = (val) => { hovered.current = val; };

  return {
    trackRef,
    outerRef,
    onMouseDown:  (e) => onPointerDown(e.clientX),
    onMouseMove:  (e) => onPointerMove(e.clientX),
    onMouseUp:    onPointerUp,
    onMouseLeave: onPointerUp,
    onTouchStart: (e) => onPointerDown(e.touches[0].clientX),
    onTouchMove:  (e) => { e.preventDefault(); onPointerMove(e.touches[0].clientX); },
    onTouchEnd:   onPointerUp,
    setHovered,
  };
}

// ── Mobile ────────────────────────────────────────────────────
function MobileMarquee() {
  const doubled = [...allImages, ...allImages];
  const handlers = useInfiniteMarquee(0.5);

  return (
    <div
      ref={handlers.outerRef}
      onMouseDown={handlers.onMouseDown}
      onMouseMove={handlers.onMouseMove}
      onMouseUp={handlers.onMouseUp}
      onMouseLeave={handlers.onMouseLeave}
      onTouchStart={handlers.onTouchStart}
      onTouchMove={handlers.onTouchMove}
      onTouchEnd={handlers.onTouchEnd}
      style={{
        overflow: "hidden",
        width: "100%",
        marginTop: "24px",
        cursor: "grab",
      }}
    >
      <div
        ref={handlers.trackRef}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: "16px",
          width: "max-content",
          padding: "8px 0 24px",
          willChange: "transform",
        }}
      >
        {doubled.map((img, i) => (
          <div key={i} style={{ width: "250px", flexShrink: 0, display: "flex", flexDirection: "column" }}>
            <div style={{ width: "250px", height: "220px", borderRadius: "12px", overflow: "hidden", background: "#e5e7eb" }}>
              <img
                src={img.src}
                alt={`work-${img.id}`}
                draggable="false"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none", userSelect: "none" }}
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
            <div style={{ padding: "8px 0 0", width: "250px" }}>
              <p style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "#111111", lineHeight: "150%", whiteSpace: "normal" }}>
                {img.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Desktop ───────────────────────────────────────────────────
function DesktopMarquee() {
  const doubled = [...allImages, ...allImages];
  const handlers = useInfiniteMarquee(0.6);

  return (
    <div
      ref={handlers.outerRef}
      onMouseDown={handlers.onMouseDown}
      onMouseMove={handlers.onMouseMove}
      onMouseUp={handlers.onMouseUp}
      onMouseLeave={() => { handlers.onMouseLeave(); handlers.setHovered(false); }}
      onMouseEnter={() => handlers.setHovered(true)}
      onTouchStart={handlers.onTouchStart}
      onTouchMove={handlers.onTouchMove}
      onTouchEnd={handlers.onTouchEnd}
      style={{
        overflow: "hidden",
        width: "100%",
        marginTop: "32px",
        cursor: "grab",
      }}
    >
      <div
        ref={handlers.trackRef}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: "42px",
          width: "max-content",
          padding: "8px 0 24px",
          willChange: "transform",
        }}
      >
        {doubled.map((img, i) => (
          <div key={i} style={{ flexShrink: 0, width: "575px" }}>
            <div style={{ width: "100%", height: "360px", borderRadius: "10px", overflow: "hidden", background: "#e5e7eb" }}>
              <img
                src={img.src}
                alt={`work-${img.id}`}
                draggable="false"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none", userSelect: "none" }}
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
            <div style={{ padding: "12px 4px 0" }}>
              <p style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: "600", color: "#111111" }}>
                {img.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────
export default function OurWork() {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <style>{`
        .ow-heading {
          font-family: 'Ultra', sans-serif;
          font-size: clamp(24px, 5vw, 50px);
          font-weight: 400;
          color: #111111;
          text-align: center;
          margin: 0;
        }
      `}</style>

      <section style={{ background: "#ffffff", width: "100%", boxSizing: "border-box", paddingTop: "48px", paddingBottom: "48px", overflow: "hidden" }}>
<div className="h-auto flex justify-between px-[clamp(16px,5vw,80px)]">
          <h2 className="ow-heading">Our Work</h2>
          <a href="/works" className="md:text-[18px] text-[16px]">Browse all ↗</a>
        </div>

        {isMobile ? <MobileMarquee /> : <DesktopMarquee />}
      </section>
    </>
  );
}
