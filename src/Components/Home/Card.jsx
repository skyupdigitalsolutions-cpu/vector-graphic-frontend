import React, { useState, useEffect } from "react";

const industries = [
  {
    id: "01",
    title: "FMCG & Foods",
    description:
      "FMCG & food packaging design that boosts product appeal, ensures compliance, and strengthens brand visibility, helping your products stand out on retail shelves",
    image: "/images/responsive_card_1.webp",
    collapsedGradient: "linear-gradient(180deg, rgba(201,32,32,0.85) 0%, rgba(0,0,0,0.85) 100%)",
  },
  {
    id: "02",
    title: "Retail & E-commerce Services",
    description:
      "Help businesses sell products online and offline with seamless shopping experiences, secure payments, and efficient order management for smooth operations and growth.",
    image: "/images/responsive_card_2.webp",
    collapsedGradient: "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(201,32,32,0.85) 100%)",
  },
  {
    id: "03",
    title: "Pharmacy & Healthcare",
    description:
      "Services ensure safe medicines, trusted medical support, and quality care to improve patient health, safety, and overall well-being.",
    image: "/images/responsive_card_3.webp",
    collapsedGradient: "linear-gradient(180deg, rgba(201,32,32,0.85) 0%, rgba(0,0,0,0.85) 100%)",
  },
  {
    id: "04",
    title: "Corporate & Consulting",
    description:
      "Corporate & consulting services provide expert guidance to improve strategy, streamline operations, and support sustainable growth for businesses across industries.",
    image: "/images/responsive_card_4.webp",
    collapsedGradient: "linear-gradient(180deg, rgba(15,30,50,0.9) 0%, rgba(15,30,50,0.9) 100%)",
  },
];

const styles = `
  .marquee-card {
    width: 75vw;
    max-width: 353px;
    min-width: 220px;
    height: 280px;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
    display: inline-block;
  }
  @media (min-width: 400px) { .marquee-card { width: 70vw; height: 300px; } }
  @media (min-width: 480px) { .marquee-card { width: 60vw; height: 320px; } }
  @media (min-width: 600px) { .marquee-card { width: 45vw; height: 320px; } }

 .desktop-accordion {
  display: flex;
  width: fit-content;
  max-width: 100%;
  height: 531px;
  gap: 10px;
  align-items: stretch;
  flex-wrap: nowrap;
  overflow-x: auto;
  margin: 0 auto;
}
  /* ✅ Collapsed: locked at 220px, never shrinks */
  .accordion-card {
  flex: 0 0 220px;   /* fixed width */
  min-width: 220px;
  height:531px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: flex-basis 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}
  /* ✅ Active: only this card expands, others untouched */
  .accordion-card.active {
    flex-basis: 528px;
    flex-grow: 0;
    flex-shrink: 0;
  }

  /* ✅ Non-active: explicitly locked, never affected */
  .accordion-card:not(.active) {
  flex: 0 0 220px;
    flex-grow: 0;
    flex-shrink: 0;
  }

  .tablet-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    width: 100%;
  }
  .tablet-grid-card {
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    height: 260px;
    cursor: pointer;
  }
  @media (min-width: 900px) { .tablet-grid-card { height: 300px; } }

  .section-heading {
    font-size: clamp(22px, 5vw, 50px);
    text-align: center;
    color: #111827;
    margin-bottom: 40px;
    font-family: ultra;
    font-weight: 400;
  }
`;

// ── Mobile: marquee ──────────────────────────────────────────
function MobileMarquee() {
  return (
    <div className="overflow-hidden w-full">

      <style>
        {`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        `}
      </style>

      <div className="flex gap-4 w-max animate-[marqueeScroll_5s_linear_infinite]">

        {[...industries, ...industries].map((ind, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 
            w-[75vw] max-w-[353px] min-w-[220px] 
            h-[280px] rounded-[20px] overflow-hidden
            sm:w-[70vw] sm:h-[300px]
            md:w-[60vw] md:h-[320px]
            lg:w-[45vw]"
          >
            
            <img
              src={ind.image}
              alt={ind.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-[18px]">

              <div className="flex items-center gap-2 mb-1">
                <div className="w-[18px] h-[1px] bg-white/50" />
                <span className="text-[10px] tracking-[1px] text-white/60">
                  {ind.id}
                </span>
              </div>

              <h3 className="text-white font-extrabold mb-1 leading-[1.2] text-[clamp(15px,4vw,20px)]">
                {ind.title}
              </h3>

              <p className="text-white/70 leading-[1.5] text-[clamp(10px,2.5vw,12px)] line-clamp-2">
                {ind.description}
              </p>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

// ── Tablet: 2-column hover grid ──────────────────────────────
function TabletGrid() {
  const [active, setActive] = useState(null);
  return (
    <div className="tablet-grid">
      {industries.map((ind, i) => {
        const isActive = active === i;
        return (
          <div key={ind.id} className="tablet-grid-card"
            onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
            <img src={ind.image} alt={ind.title} draggable={false}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
                transition: "transform 0.5s ease", transform: isActive ? "scale(1.05)" : "scale(1)" }} />
            <div style={{
              position: "absolute", inset: 0,
              background: isActive
                ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)"
                : ind.collapsedGradient,
              transition: "background 0.4s ease",
            }} />
            <div style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "flex-end",
              padding: "20px", opacity: isActive ? 0 : 1, transition: "opacity 0.25s ease",
            }}>
              <h3 style={{ color: "white", fontSize: "clamp(14px, 2vw, 18px)", fontWeight: "700" }}>{ind.title}</h3>
            </div>
            <div style={{
              position: "absolute", inset: 0, display: "flex", flexDirection: "column",
              justifyContent: "flex-end", padding: "20px",
              opacity: isActive ? 1 : 0, transition: "opacity 0.35s ease 0.1s",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <div style={{ width: "20px", height: "1px", background: "rgba(255,255,255,0.5)" }} />
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px", letterSpacing: "1px" }}>{ind.id}</span>
              </div>
              <h3 style={{ color: "white", fontSize: "clamp(16px, 2.2vw, 22px)", fontWeight: "800", marginBottom: "8px", lineHeight: "1.2" }}>
                {ind.title}
              </h3>
              <p style={{
                color: "rgba(255,255,255,0.75)", fontSize: "clamp(11px, 1.4vw, 13px)", lineHeight: "1.6",
                display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
              }}>
                {ind.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Desktop: accordion ───────────────────────────────────────
function DesktopAccordion() {
  const [active, setActive] = useState(null);

  return (
    <div className="desktop-accordion" onMouseLeave={() => setActive(null)}>
      {industries.map((ind, i) => {
        const isActive = active === i;
        return (
          <div
            key={ind.id}
            className={`accordion-card ${isActive ? "active" : ""}`}
            onMouseEnter={() => setActive(i)}
          >
            <img src={ind.image} alt={ind.title} draggable={false}
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
                transition: "transform 0.5s ease", transform: isActive ? "scale(1.04)" : "scale(1)",
              }} />

            <div style={{
              position: "absolute", inset: 0,
              background: isActive
                ? "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)"
                : ind.collapsedGradient,
              transition: "background 0.5s ease",
            }} />

            {/* Collapsed: vertical title + big number */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "space-between",
              padding: "0 0 36px 0",
              opacity: isActive ? 0 : 1,
              transition: "opacity 0.2s ease",
              pointerEvents: isActive ? "none" : "auto",
            }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: "2px", height: "52px", background: "rgba(255,255,255,0.6)" }} />
                <span style={{
                  color: "white", fontWeight: "600", fontSize: "16px",
                  writingMode: "vertical-rl", fontFamily: "Outfit, sans-serif",
                  whiteSpace: "nowrap", letterSpacing: "1.5px",
                  marginTop: "14px", textTransform: "uppercase",
                }}>
                  {ind.title}
                </span>
              </div>
              <span style={{
                fontSize: "clamp(56px, 5.5vw, 88px)", fontWeight: 700,
                lineHeight: 1, letterSpacing: "-3px",
                fontFamily: "Poppins, sans-serif", color: "transparent",
                WebkitTextStroke: "1.5px rgba(255,255,255,0.85)",
              }}>
                {ind.id}
              </span>
            </div>

            {/* Expanded: description fades in */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              justifyContent: "flex-end", padding: "40px",
              fontFamily: "Poppins, sans-serif",
              opacity: isActive ? 1 : 0,
              transition: "opacity 0.35s ease 0.15s",
              pointerEvents: isActive ? "auto" : "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{ width: "88px", height: "1px", background: "rgba(255,255,255,0.5)" }} />
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", letterSpacing: "2px" }}>{ind.id}</span>
              </div>
              <h3 style={{
                color: "white", fontSize: "clamp(20px, 2vw, 30px)",
                fontWeight: "800", marginBottom: "14px", lineHeight: "1.2",
              }}>
                {ind.title}
              </h3>
              <p style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "clamp(12px, 1.1vw, 14px)",
                lineHeight: "1.7", maxWidth: "420px",
              }}>
                {ind.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Root ─────────────────────────────────────────────────────
export default function Card() {
  const [screen, setScreen] = useState("desktop");

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) setScreen("mobile");
      else if (w < 1024) setScreen("tablet");
      else setScreen("desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section style={{
      backgroundColor: "white",
      paddingTop: "clamp(40px, 6vw, 80px)",
      paddingBottom: "clamp(40px, 6vw, 80px)",
      paddingLeft: "clamp(16px, 6vw, 80px)",
      paddingRight: "clamp(16px, 6vw, 80px)",
    }}>
      <style>{styles}</style>
      <h2 className="section-heading">Industries We Work With</h2>

      {screen === "mobile"  && <MobileMarquee />}
      {screen === "tablet"  && <TabletGrid />}
      {screen === "desktop" && <DesktopAccordion />}
    </section>
  );
}