import React, { useEffect, useState } from "react";

const allImages = [
  { id: 1, src: "/images/workpage_1.webp", title: "Are You Ready for the 2D Barcode Revolution? 7 Powerful Ways 2D Barcodes Are Transforming Businesses in 2026." },
  { id: 2, src: "/images/workpage_2.webp", title: "Are You Ready for the 2D Barcode Revolution? 7 Powerful Ways 2D Barcodes Are Transforming Businesses in 2026." },
  { id: 3, src: "/images/workpage_3.webp", title: "Are You Ready for the 2D Barcode Revolution? 7 Powerful Ways 2D Barcodes Are Transforming Businesses in 2026." },
  { id: 4, src: "/images/workpage_4.webp", title: "Are You Ready for the 2D Barcode Revolution? 7 Powerful Ways 2D Barcodes Are Transforming Businesses in 2026." },
  { id: 5, src: "/images/workpage_5.webp", title: "Are You Ready for the 2D Barcode Revolution? 7 Powerful Ways 2D Barcodes Are Transforming Businesses in 2026." },
  { id: 6, src: "/images/workpage_6.webp", title: "Are You Ready for the 2D Barcode Revolution? 7 Powerful Ways 2D Barcodes Are Transforming Businesses in 2026." },
  { id: 7, src: "/images/workpage_7.webp", title: "Are You Ready for the 2D Barcode Revolution? 7 Powerful Ways 2D Barcodes Are Transforming Businesses in 2026." },
  { id: 8, src: "/images/workpage_8.webp", title: "Are You Ready for the 2D Barcode Revolution? 7 Powerful Ways 2D Barcodes Are Transforming Businesses in 2026." },
  { id: 9, src: "/images/workpage_9.webp", title: "Are You Ready for the 2D Barcode Revolution? 7 Powerful Ways 2D Barcodes Are Transforming Businesses in 2026." },
  { id: 10, src: "/images/workpage_10.webp", title: "Are You Ready for the 2D Barcode Revolution? 7 Powerful Ways 2D Barcodes Are Transforming Businesses in 2026." },
];

// ── Mobile: touch pause ───────────────────────────────────────
function MobileMarquee() {
  const [paused, setPaused] = useState(false);
  const doubled = [...allImages, ...allImages];

  return (
    <div style={{ overflow: "hidden", width: "100%", marginTop: "24px" }}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div
        className="ow-marquee-track-mobile"
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {doubled.map((img, i) => (
          <div key={i} style={{ width: "250px", flexShrink: 0, display: "flex", flexDirection: "column" }}>
            <div style={{ width: "250px", height: "220px", borderRadius: "12px", overflow: "hidden", background: "#e5e7eb" }}>
              <img
                src={img.src}
                alt={`work-${img.id}`}
                draggable="false"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
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

// ── Desktop: hover pause ──────────────────────────────────────
function DesktopMarquee() {
  const [paused, setPaused] = useState(false);
  const doubled = [...allImages, ...allImages];

  return (
    <div style={{ overflow: "hidden", width: "100%", marginTop: "32px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="ow-marquee-track"
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {doubled.map((img, i) => (
          <div key={i} className="ow-card-wrap">
            <div className="ow-card">
              <img
                src={img.src}
                alt={`work-${img.id}`}
                draggable="false"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
            <div className="ow-card-desc">
              <p className="ow-card-title">{img.title}</p>
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
        @keyframes ow-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .ow-heading {
          font-family: 'Ultra', sans-serif;
          font-size: clamp(24px, 5vw, 50px);
          font-weight: 400;
          color: #111111;
          text-align: center;
          margin: 0;
        }

        .ow-marquee-track {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 42px;
          width: max-content;
          animation: ow-scroll 35s linear infinite;
          padding: 8px 0 24px;
        }

        .ow-marquee-track-mobile {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 16px;
          width: max-content;
          animation: ow-scroll 35s linear infinite;
          padding: 8px 0 24px;
        }

        .ow-card-wrap {
          flex-shrink: 0;
          width: 575px;
        }

        .ow-card {
          width: 100%;
          height: 360px;
          border-radius: 10px;
          overflow: hidden;
          background: #e5e7eb;
        }

        .ow-card img {
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
        }

        .ow-card-desc { padding: 12px 4px 0; }

        .ow-card-title {
          margin: 0 0 4px;
          font-size: 18px;
          font-weight: 600;
          color: #111111;
        }
      `}</style>

      <section style={{ background: "#ffffff", width: "100%", boxSizing: "border-box", paddingTop: "48px", paddingBottom: "48px", overflow: "hidden" }}>
        <div className="h-auto flex justify-between md:px-12 px-2">
          <h2 className="ow-heading">Our Work</h2>
          <a href="/works" className="md:text-[18px] text-[16px]">Browse all ↗</a>
        </div>

        {isMobile ? <MobileMarquee /> : <DesktopMarquee />}
      </section>
    </>
  );
}
