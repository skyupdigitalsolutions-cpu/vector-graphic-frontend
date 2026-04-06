import { useEffect } from "react";

const beliefs = [
  { side: "left",  title: "We Believe In Quality",    desc: "Quality drives everything at Vector Graphics, delivering reliable, impactful packaging from concept to final execution with precision." },
  { side: "right", title: "We Believe In Creativity", desc: "Creativity drives our packaging design, blending innovative ideas and modern trends to create engaging packaging that captures attention." },
  { side: "left",  title: "We Believe in Expertise",  desc: "With 20+ years of experience, we deliver strategic designs that are visually appealing and perfectly aligned with your brand goals." },
  { side: "right", title: "We Believe in Results",  desc: "We go beyond design to create packaging that performs, blending creativity and insights to boost brand value and drive growth." },
];

function BeliefCard({ title, desc }) {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-base font-bold text-gray-900 leading-snug">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

const DASH = {
  stroke: "#444",
  strokeWidth: 2.5,
  strokeDasharray: "3 5",
  strokeLinecap: "butt",
  fill: "none",
};

function LeftTopLine({ width, height }) {
  const rx = 10, ry = height;
  const d = `M 0,${height} A ${rx},${ry} 0 0 1 ${rx},0 H ${width}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" className="block">
      <path d={d} {...DASH} />
    </svg>
  );
}

function LeftBottomLine({ width, height }) {
  const rx = 10, ry = height;
  const d = `M 0,0 A ${rx},${ry} 0 0 0 ${rx},${height} H ${width}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" className="block">
      <path d={d} {...DASH} />
    </svg>
  );
}

function RightTopLine({ width, height }) {
  const rx = 10, ry = height;
  const d = `M ${width},${height} A ${rx},${ry} 0 0 0 ${width - rx},0 H 0`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" className="block">
      <path d={d} {...DASH} />
    </svg>
  );
}

function RightBottomLine({ width, height }) {
  const rx = 10, ry = height;
  const d = `M ${width},0 A ${rx},${ry} 0 0 1 ${width - rx},${height} H 0`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" className="block">
      <path d={d} {...DASH} />
    </svg>
  );
}

export default function A1({
  imageSrc = "/images/aboutus_banner.webp",
  mobileImageSrc = "/images/about.webp",
  imageAlt = "Open packaging box",
  cards = beliefs,
}) {
  useEffect(() => {
    if (document.querySelector('link[href*="Poppins"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);

  const leftCards  = cards.filter((c) => c.side === "left");
  const rightCards = cards.filter((c) => c.side === "right");

  const TOP_LINE_W    = 300;
  const BOTTOM_LINE_W = 300;
  const CORNER_H      = 18;
  const PANEL_H       = 471;
  const V_INSET       = 10;

  return (
    <section className="bg-white lg:py-16 [font-family:'Poppins',sans-serif]">

      {/* ── DESKTOP LAYOUT (unchanged) ── */}
      <div className="hidden md:flex items-center justify-center">

        {/* LEFT PANEL */}
        <div className="relative z-10 -mr-[140px] pr-5" style={{ width: "330px", height: `${PANEL_H}px` }}>
          <div className="absolute pointer-events-none z-[1] pt-3" style={{ top: V_INSET, left: 80 }}>
            <LeftTopLine width={TOP_LINE_W} height={CORNER_H} />
          </div>
          <div className="absolute pointer-events-none z-[1]" style={{ bottom: V_INSET, left: 80 }}>
            <LeftBottomLine width={BOTTOM_LINE_W} height={CORNER_H} />
          </div>
          <div className="absolute inset-0 z-[1] flex flex-col justify-around pr-5">
            {leftCards.map((c, i) => <BeliefCard key={i} title={c.title} desc={c.desc} />)}
          </div>
        </div>

        {/* IMAGE */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="block relative z-[1] shrink-0 object-contain"
          style={{ width: "863px", height: `${PANEL_H}px` }}
        />

        {/* RIGHT PANEL */}
        <div className="relative z-10 -ml-[100px] pl-5" style={{ width: "330px", height: `${PANEL_H}px` }}>
          <div className="absolute pointer-events-none z-[1] pt-3" style={{ top: V_INSET, right: 200 }}>
            <RightTopLine width={TOP_LINE_W} height={CORNER_H} />
          </div>
          <div className="absolute pointer-events-none z-[1]" style={{ bottom: V_INSET, right: 200 }}>
            <RightBottomLine width={BOTTOM_LINE_W} height={CORNER_H} />
          </div>
          <div className="absolute inset-0 z-[1] flex flex-col justify-around pl-5">
            {rightCards.map((c, i) => <BeliefCard key={i} title={c.title} desc={c.desc} />)}
          </div>
        </div>

      </div>

      {/* ── MOBILE LAYOUT ── */}
      <div className="flex flex-col md:hidden px-5">

        {/* Top row: Quality (left) + Creativity (right) */}
        <div className="grid grid-cols-2 gap-4 ">
          <div>
            <h3 className="text-[12px] font-semibold text-[#3A3A3A] leading-snug">{leftCards[0].title}</h3>
          </div>
          <div className="text-right">
            <h3 className="text-[12px] font-semibold text-[#3A3A3A] leading-snug">{rightCards[0].title}</h3>
          </div>
        </div>

       

        {/* Image */}
        <img
          src={mobileImageSrc}
          alt={imageAlt}
          className="w-full h-[220px] max-w-xs mx-auto object-contain"
        />

       

        {/* Bottom row: Abilities (left) + Creativity (right) */}
        <div className="grid grid-cols-2 gap-4 ">
          <div>
            <h3 className="text-[12px] font-semibold text-[#3A3A3A] leading-snug">{leftCards[1].title}</h3>
          </div>
          <div className="text-right">
            <h3 className="text-[12px] font-semibold text-[#3A3A3A] leading-snug">{rightCards[1].title}</h3>
          </div>
        </div>

      </div>

    </section>
  );
}