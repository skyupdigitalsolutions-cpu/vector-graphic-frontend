import React, { useState, useRef } from "react";

const industries = [
  {
    id: "01",
    title: "FMCG & Foods",
    description:
      "We design packaging and marketing materials that capture attention on shelves and drive consumer engagement for food and beverage brands.",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
    collapsedGradient:
      "linear-gradient(180deg, rgba(201,32,32,0.8) 0%, rgba(0,0,0,0.8) 100%)",
  },
  {
    id: "02",
    title: "Retail & E-commerce",
    description:
      "From product imagery to digital storefronts, we craft visual experiences that convert browsers into buyers across all retail channels.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    collapsedGradient:
      "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(201,32,32,0.8) 100%)",
  },
  {
    id: "03",
    title: "Pharmacy & Healthcare",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lectus non mauris turpis eros. Sit id feugiat tempor ornare amet vulputate nec amet. Sed quisque et sagittis donec",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
    collapsedGradient:
      "linear-gradient(180deg, rgba(201,32,32,0.8) 0%, rgba(0,0,0,0.8) 100%)",
  },
  {
    id: "04",
    title: "Corporate & Consulting",
    description:
      "We create professional brand identities, presentations, and collateral that position consulting firms with authority and credibility.",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80",
    collapsedGradient:
      "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(201,32,32,0.8) 100%)",
  },
];

const SWIPE_THRESHOLD = 50;

// Each non-hovered card keeps this exact pixel width always
const CARD_W = 180;
// Hovered card expands to this width
const ACTIVE_W = 500;
const GAP = 12;

function MobileCarousel() {
  const [current, setCurrent] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);

  const getClientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);
  const handleDragStart = (e) => { dragStart.current = getClientX(e); setDragging(true); setDragX(0); };
  const handleDragMove = (e) => { if (!dragging || dragStart.current === null) return; setDragX(getClientX(e) - dragStart.current); };
  const handleDragEnd = () => {
    if (!dragging) return;
    if (dragX < -SWIPE_THRESHOLD && current < industries.length - 1) setCurrent(current + 1);
    else if (dragX > SWIPE_THRESHOLD && current > 0) setCurrent(current - 1);
    setDragging(false); setDragX(0); dragStart.current = null;
  };

  return (
    <div style={{ width: "100%", maxWidth: "480px", margin: "0 auto" }}>
      <div style={{ overflow: "hidden", borderRadius: "20px", touchAction: "pan-y", userSelect: "none" }}
        onMouseDown={handleDragStart} onMouseMove={handleDragMove} onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd} onTouchStart={handleDragStart} onTouchMove={handleDragMove} onTouchEnd={handleDragEnd}
      >
        <div style={{ display: "flex", transform: `translateX(calc(-${current * 100}% + ${dragX}px))`, transition: dragging ? "none" : "transform 0.45s cubic-bezier(0.23,1,0.32,1)" }}>
          {industries.map((ind) => (
            <div key={ind.id} style={{ minWidth: "100%", height: "300px", position: "relative", flexShrink: 0 }}>
              <img src={ind.image} alt={ind.title} draggable={false} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <div style={{ width: "22px", height: "1px", background: "rgba(255,255,255,0.5)" }} />
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px", letterSpacing: "1px" }}>{ind.id}</span>
                </div>
                <h3 style={{ color: "white", fontSize: "22px", fontWeight: "800", marginBottom: "6px", lineHeight: "1.2" }}>{ind.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "12px", lineHeight: "1.55", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{ind.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "14px" }}>
        {industries.map((_, i) => (
          <div key={i} onClick={() => setCurrent(i)} style={{ width: current === i ? "20px" : "8px", height: "8px", borderRadius: "4px", background: current === i ? "#111" : "#ccc", transition: "all 0.3s ease", cursor: "pointer" }} />
        ))}
      </div>
    </div>
  );
}

export default function Card() {
  const [active, setActive] = useState(null);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Total container width:
  // No hover  → 4 cards × CARD_W + 3 gaps
  // On hover  → 1 active (ACTIVE_W) + 3 others (CARD_W each) + 3 gaps
  const noHoverW = 4 * CARD_W + 3 * GAP;
  const hoverW   = ACTIVE_W + 3 * CARD_W + 3 * GAP;
  const containerW = active !== null ? hoverW : noHoverW;

  return (
    <section className="bg-white py-16 px-6 md:px-12">
      <h2
        className="text-center lg:text-[50px] md:text-[35px] text-[24px] font-400 text-gray-900 mb-10"
        style={{ fontFamily: "ultra" }}
      >
        Industries We Work With
      </h2>

      {isMobile && <MobileCarousel />}

      {!isMobile && (
        <div
          style={{
            // Container grows to fit expanded card — no card ever shrinks
            display: "flex",
            width: `${containerW}px`,
            maxWidth: "100%",
            margin: "0 auto",
            height: "480px",
            gap: `${GAP}px`,
            transition: "width 0.5s cubic-bezier(0.23,1,0.32,1)",
          }}
          onMouseLeave={() => setActive(null)}
        >
          {industries.map((ind, i) => {
            const isActive = active === i;

            return (
              <div
                key={ind.id}
                onMouseEnter={() => setActive(i)}
                style={{
                  // Active card: fixed ACTIVE_W. Others: fixed CARD_W. No shrinking ever.
                  width: isActive ? `${ACTIVE_W}px` : `${CARD_W}px`,
                  flexShrink: 0,
                  flexGrow: 0,
                  transition: "width 0.5s cubic-bezier(0.23,1,0.32,1)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <img
                  src={ind.image}
                  alt={ind.title}
                  draggable={false}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                    transform: isActive ? "scale(1.04)" : "scale(1)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: isActive
                      ? "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)"
                      : ind.collapsedGradient,
                    transition: "background 0.5s ease",
                  }}
                />

                {/* Collapsed */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    height: "531px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "0px",
                    opacity: isActive ? 0 : 0.8,
                    transition: "opacity 0.25s ease",
                    pointerEvents: isActive ? "none" : "auto",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "2px", height: "46px", background: "rgba(255,255,255,0.55)" }} />
                    <span
                      style={{
                        color: "white",
                        height: "17px",
                        fontWeight: "600",
                        fontSize: "24px",
                        letterSpacing: "4%",
                        writingMode: "vertical-rl",
                        fontFamily: "Outfit",
                        whiteSpace: "nowrap",
                        marginTop: "0px",
                      }}
                    >
                      {ind.title}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "90px",
                      marginTop: "1px",
                      fontWeight: 600,
                      lineHeight: "100%",
                      letterSpacing: "-2px",
                      marginBottom: "55px",
                      fontFamily: "poppins",
                      color: "transparent",
                      WebkitTextStroke: "1px #FFFFFF",
                    }}
                  >
                    {ind.id}
                  </span>
                </div>

                {/* Expanded */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "32px",
                    opacity: isActive ? 1 : 0,
                    fontFamily: "poppins",
                    transition: "opacity 0.35s ease 0.15s",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <div style={{ width: "28px", height: "1px", background: "rgba(255,255,255,0.5)" }} />
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", letterSpacing: "1px" }}>{ind.id}</span>
                  </div>
                  <h3 style={{ color: "white", fontSize: "28px", fontWeight: "800", marginBottom: "14px", lineHeight: "1.2", whiteSpace: "nowrap" }}>
                    {ind.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "13px", lineHeight: "1.65", maxWidth: "400px" }}>
                    {ind.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}