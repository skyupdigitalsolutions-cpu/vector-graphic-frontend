import React, { useRef, useEffect } from "react";

const TILT_PATTERN = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const allImages = [
  { id: 1, src: "/images/work_1.webp" },
  { id: 2, src: "/images/work_2.webp" },
  { id: 3, src: "/images/work_3.webp" },
  { id: 4, src: "/images/work_4.webp" },
  { id: 5, src: "/images/work_5.webp" },
  { id: 6, src: "/images/work_6.webp" },
  { id: 7, src: "/images/work_7.webp" },
  { id: 8, src: "/images/work_8.webp" },
  { id: 9, src: "/images/work_9.webp" },
  { id: 10, src: "/images/work_10.webp" }
];

// ── Mobile: marquee scroll (same as Industries page) ─────────
function MobileMarquee() {
  return (
    <div style={{ overflow: "hidden", width: "100%", marginTop: "24px" }}>
      <marquee behavior="scroll" direction="left" scrollamount="20">
        <div style={{ display: "inline-flex", gap: "16px", padding: "8px 0" }}>
          {[...allImages, ...allImages].map((img, i) => (
            <div
              key={i}
              style={{
                width: "75vw",
                maxWidth: "300px",
                minWidth: "200px",
                height: "260px",
                borderRadius: "12px",
                overflow: "hidden",
                flexShrink: 0,
                display: "inline-block",
                background: "#e5e7eb",
              }}
            >
              <img
                src={img.src}
                alt={`work-${img.id}`}
                draggable="false"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          ))}
        </div>
      </marquee>
    </div>
  );
}

// ── Desktop/Tablet: original drag scroll ─────────────────────
function DesktopTrack() {
  const trackRef = useRef(null);
  const clipId = "ourWorkCurveClip";

 const isDragging = useRef(false);  
const startX = useRef(0);
const scrollStart = useRef(0);
const hasDragged = useRef(false);

const onMouseDown = (e) => {
  isDragging.current = true;
  hasDragged.current = false;
  startX.current = e.pageX;
  scrollStart.current = trackRef.current.scrollLeft;
  e.preventDefault();
};

const onMouseMove = (e) => {
  if (!isDragging.current) return;  
  const dx = e.pageX - startX.current;
  if (Math.abs(dx) > 3) hasDragged.current = true;
  trackRef.current.scrollLeft = scrollStart.current - dx;
};

const onMouseUp = () => {           
  isDragging.current = false;
};

const onClickCapture = (e) => {
  if (hasDragged.current) {
    e.stopPropagation();
    e.preventDefault();
    hasDragged.current = false;
  }
};

  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d="M 0 0.14 Q 0.5 0.3 1 0.14 L 1 0.86 Q 0.5 0.6 0 0.86 Z" />
          </clipPath>
        </defs>
      </svg>

      <div
        style={{
          position: "relative",
          width: "100%",
          clipPath: `url(#${clipId})`,
          marginTop: "-30px",
          marginBottom: "-30px",
        }}
      >
        <div
          ref={trackRef}
          className="ow-track"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onClickCapture={onClickCapture}
        >
          {allImages.map((img, index) => {
            const tilt = TILT_PATTERN[index % TILT_PATTERN.length];
            return (
              <div
                key={img.id}
                className="ow-card"
                style={{ transform: `rotate(${tilt}deg)`, transformOrigin: "center center" }}
              >
                <img
                  src={img.src}
                  alt={`work-${img.id}`}
                  draggable="false"
                  style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ── Root ─────────────────────────────────────────────────────
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
        .ow-track::-webkit-scrollbar { display: none; }
        .ow-track { -ms-overflow-style: none; scrollbar-width: none; }

        .ow-heading {
          font-family: 'Ultra', sans-serif;
          font-size: clamp(24px, 5vw, 50px);
          font-weight: 400;
          color: #111111;
          text-align: center;
          margin: 0;
        }

        .ow-track {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 48px;
          overflow-x: auto;
          overflow-y: visible;
          padding-top: 40px;
          padding-bottom: 40px;
          cursor: default;
          user-select: none;
        }

        .ow-card {
          flex-shrink: 0;
          width: 386px;
          height: 512px;
          overflow: hidden;
          background: #e5e7eb;
          border-radius: 4px;
          pointer-events: auto;
        }

        .ow-card img {
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
        }

        @media (max-width: 1023px) {
          .ow-track { gap: 32px; }
          .ow-card { width: 300px; height: 400px; }
        }
      `}</style>

      <section
        style={{
          background: "#ffffff",
          width: "100%",
          boxSizing: "border-box",
          paddingTop: "48px",
          paddingBottom: "48px",
          overflow: "hidden",
        }}
      >
        <h2 className="ow-heading">Our Work</h2>

        {isMobile ? <MobileMarquee /> : <DesktopTrack />}
      </section>
    </>
  );
}