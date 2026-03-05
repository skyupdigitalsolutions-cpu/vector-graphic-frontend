import React, { useRef, useEffect } from "react";

const TILT_PATTERN = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const allImages = [
  { id: 1, src: "/images/Frame.png" },
  { id: 2, src: "/images/Frame.png" },
  { id: 3, src: "/images/Frame.png" },
  { id: 4, src: "/images/Frame.png" },
  { id: 5, src: "/images/Frame.png" },
  { id: 6, src: "/images/Frame.png" },
  { id: 7, src: "/images/Frame.png" },
  { id: 8, src: "/images/Frame.png" },
  { id: 9, src: "/images/Frame.png" },
  { id: 10, src: "/images/Frame.png" },
  { id: 11, src: "/images/Frame.png" },
  { id: 12, src: "/images/Frame.png" },
  { id: 13, src: "/images/Frame.png" },
  { id: 14, src: "/images/Frame.png" },
];

export default function OurWork() {
  const trackRef = useRef(null);
  const clipId = "ourWorkCurveClip";

  // Mouse drag state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const hasDragged = useRef(false);

  const centerTrack = () => {
    const track = trackRef.current;
    if (!track) return;
    const centerX = (track.scrollWidth - track.clientWidth) / 2;
    track.scrollLeft = centerX;
  };

  useEffect(() => {
    const timeout = setTimeout(centerTrack, 50);
    window.addEventListener("resize", centerTrack);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", centerTrack);
    };
  }, []);

  const onMouseDown = (e) => {
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX;
    scrollStart.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "default";
    // Prevent text/image selection while dragging
    e.preventDefault();
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;w
    const dx = e.pageX - startX.current;
    if (Math.abs(dx) > 3) hasDragged.current = true;
    trackRef.current.scrollLeft = scrollStart.current - dx;
  };

  const onMouseUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    trackRef.current.style.cursor = "default";
  };

  // Suppress click on cards if the user was dragging
  const onClickCapture = (e) => {
    if (hasDragged.current) {
      e.stopPropagation();
      e.preventDefault();
      hasDragged.current = false;
    }
  };

  return (
    <>
      <style>{`
        .ow-track::-webkit-scrollbar { display: none; }
        .ow-track { -ms-overflow-style: none; scrollbar-width: none; }

        .ow-heading {
          font-family: 'Ultra', sans-serif;
          font-size: 50px;
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

        .ow-track:active {
          cursor: default;
        }

        .ow-card {
          flex-shrink: 0;
          width: 386px;
          height: 512px;
          overflow: hidden;
          background: #e5e7eb;
          border-radius: 4px;
          /* pointer-events restored so mouse events bubble up to the track */
          pointer-events: auto;
        }

        .ow-card img {
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
        }

        /* Tablet: 480px – 1023px */
        @media (max-width: 1023px) {
          .ow-heading { font-size: 40px; }
          .ow-track { gap: 32px; }
          .ow-card { width: 300px; height: 400px; }
        }

        /* Mobile: < 480px */
        @media (max-width: 479px) {
          .ow-heading { font-size: 28px; }
          .ow-track { gap: 20px; }
          .ow-card { width: 220px; height: 290px; }
        }
      `}</style>

      <svg
        width="100%"
        height="260"
        viewBox="0 0 1440 260"
        preserveAspectRatio="none"
        style={{ position: "absolute", top: 0, left: 0, overflow: "hidden" }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d="M 0 0.14 Q 0.5 0.3 1 0.14 L 1 0.86 Q 0.5 0.6 0 0.86 Z" />
          </clipPath>
        </defs>
      </svg>

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
            <svg
              viewBox="0 0 1440 160"
              preserveAspectRatio="none"
              style={{
                width: "100%",
                height: "160px",
                display: "block",
                marginTop: "-120px",
              }}
            >
              <path
                d="M0,90 
       C360,140 720,140 1080,100 
       C1260,80 1380,100 1440,110 
       L1440,160 
       L0,160 
       Z"
                fill="#ffffff"
              />
            </svg>

            {allImages.map((img, index) => {
              const tilt = TILT_PATTERN[index % TILT_PATTERN.length];
              return (
                <div
                  key={img.id}
                  className="ow-card"
                  style={{
                    transform: `rotate(${tilt}deg)`,
                    transformOrigin: "center center",
                  }}
                >
                  <img
                    src={img.src}
                    alt={`work-${img.id}`}
                    draggable="false"
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}