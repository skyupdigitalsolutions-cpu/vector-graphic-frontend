import React from "react";
import { useState, useEffect, useRef } from "react";

const slides = [
  {
    id: 1,
    title: "Artwork & Design",
    description: "We create and adapt artwork for brochures, packaging, labels, and mockups with strong visuals, correct sizing, and balanced color usage.",
    image: "/images/service_expertise_1",
    
  },
  {
    id: 2,
    title: "Brand Strategy",
    description: "We craft compelling brand narratives, visual identities, and strategic positioning that resonate with your target audience.",
    image: "/images/service_expertise_2",
    
  },
  {
    id: 3,
    title: "Print Production",
    description: "From concept to press-ready files, we handle full print production with precision color management and quality assurance.",
    image: "/images/service_expertise_3",
   
  },
  {
    id: 4,
    title: "Digital Marketing",
    description: "We build digital campaigns that convert — from social assets to email templates, optimized for performance and engagement.",
    image: "/images/service_expertise_4",
   
  },
    {
    id: 5,
    title: "Digital Marketing",
    description: "We build digital campaigns that convert — from social assets to email templates, optimized for performance and engagement.",
    image: "/images/service_expertise_5",
   
  },
];

function getCardStyle(diff, device) {
  if (device === "mobile") {
    const map = [
      { transform: "translateX(0) scale(1)",          opacity: 1,    filter: "blur(0px)",  zIndex: 10 },
      { transform: "translateX(-55px) scale(0.93)",   opacity: 0.85, filter: "blur(1px)",  zIndex: 7  },
      { transform: "translateX(-100px) scale(0.86)",  opacity: 0.6,  filter: "blur(2px)",  zIndex: 4  },
      { transform: "translateX(-140px) scale(0.79)",  opacity: 0.3,  filter: "blur(3px)",  zIndex: 2  },
    ];
    return map[diff] ?? { transform: "translateX(-160px) scale(0.72)", opacity: 0, zIndex: 1, pointerEvents: "none" };
  }
  if (device === "medium") {
    const map = [
      { transform: "translateX(0) scale(1)",            opacity: 1,    filter: "blur(0px)",  zIndex: 10 },
      { transform: "translateX(-68px) scale(0.925)",    opacity: 0.85, filter: "blur(1px)",  zIndex: 7  },
      { transform: "translateX(-125px) scale(0.85)",    opacity: 0.63, filter: "blur(2px)",  zIndex: 4  },
      { transform: "translateX(-175px) scale(0.775)",   opacity: 0.33, filter: "blur(3px)",  zIndex: 2  },
    ];
    return map[diff] ?? { transform: "translateX(-210px) scale(0.70)", opacity: 0, zIndex: 1, pointerEvents: "none" };
  }
  const map = [
    { transform: "translateX(0) scale(1)",             opacity: 1,    filter: "blur(0px)",  zIndex: 10 },
    { transform: "translateX(-80px) scale(0.92)",      opacity: 0.85, filter: "blur(1px)",  zIndex: 7  },
    { transform: "translateX(-150px) scale(0.84)",     opacity: 0.65, filter: "blur(2px)",  zIndex: 4  },
    { transform: "translateX(-210px) scale(0.76)",     opacity: 0.35, filter: "blur(3px)",  zIndex: 2  },
  ];
  return map[diff] ?? { transform: "translateX(-260px) scale(0.68)", opacity: 0, zIndex: 1, pointerEvents: "none" };
}

const DRAG_THRESHOLD = 60;

export default function ServiceExpertise() {
  const [active, setActive] = useState(0);
  const [exiting, setExiting] = useState(null);
  const [device, setDevice] = useState("desktop");
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 768)       setDevice("mobile");
      else if (w < 1024) setDevice("medium");
      else               setDevice("desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const goTo = (idx) => {
    if (idx === active || exiting !== null) return;
    setExiting(active);
    setActive(idx);
    setTimeout(() => setExiting(null), 450);
  };

  const getClientX = (e) => e.touches ? e.touches[0].clientX : e.clientX;

  const handleDragStart = (e) => {
    dragStart.current = getClientX(e);
    setDragging(true);
    setDragX(0);
  };

  const handleDragMove = (e) => {
    if (!dragging || dragStart.current === null) return;
    const delta = getClientX(e) - dragStart.current;
    setDragX(delta);
  };

  const handleDragEnd = () => {
    if (!dragging) return;
   if (dragX >= DRAG_THRESHOLD) {
  // swipe right → next card
  goTo((active + 1) % slides.length);
} 
else if (dragX <= -DRAG_THRESHOLD) {
  // swipe left → previous card
  goTo((active - 1 + slides.length) % slides.length);
}
    setDragging(false);
    setDragX(0);
    dragStart.current = null;
  };

  // Mobile: reduced stack height to fit within 511px (text ~155px + gap-6 + cards)
  const stackHeight = device === "mobile" ? "270px" : device === "medium" ? "300px" : "440px";
  const cardWidth   = device === "mobile" ? "72%"   : device === "medium" ? "70%"   : "68%";

  const behindBaseX = device === "mobile" ? -55 : device === "medium" ? -68 : -80;

  return (
    // ONLY mobile changed: w-[393px] h-[511px] — md/lg remain exactly as original
 <section className="w-full h-auto md:min-h-0 lg:h-[730px] flex items-center justify-center bg-[#1a1a1a] overflow-hidden py-10 md:py-16">
      <div className="flex flex-col md:flex-row items-start md:items-center w-full max-w-6xl px-6 md:px-10 gap-6 md:gap-0">

        {/* Left / Top: Text panel */}
        <div className="w-full lg:w-[428px] lg:h-[262px] md:w-80 flex-shrink-0 text-white order-1 md:order-1 md:pr-16 lg:gap-24">
          <h2 className="text-[24px] lg:text-[50px] md:text-3xl font-ultra font-normal leading-tight mb-3 md:mb-4" style={{lineHeight:"120%"}}>Our Service Expertise</h2>
          <p className="text-[14px] md:text-[14px] text-white/50 leading-relaxed font-poppins lg:text-[18px] lg:w-[428px] lg:h-[108px]" style={{lineHeight:"150%"}}>
            Get a clear overview of our professional services and capabilities. We present each
            offering with transparency so you understand the scope, value, and outcomes we deliver.
          </p>
        </div>

        {/* Right / Bottom: Card slider */}
        <div className="w-full md:flex-1 flex flex-col items-start gap-5 overflow-visible order-2 md:order-2">
          <div
            className="relative w-full"
            style={{ height: stackHeight, touchAction: "pan-y", userSelect: "none" }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            {slides.map((slide, i) => {
              const diff = (active - i + slides.length) % slides.length;
              const isActive = diff === 0;
              const isExiting = exiting === i;
              const cardStyle = getCardStyle(diff, device);

              const activeDragStyle = isActive && dragging && dragX > 0
                ? { transform: `translateX(${dragX}px) scale(1)`, transition: "none" }
                : {};

              const progress = Math.min(dragX / DRAG_THRESHOLD, 1);
            const behindDragStyle = diff === 1 && dragging && dragX !== 0
                ? {
                    transform: `translateX(${behindBaseX + (-behindBaseX * progress * 0.6)}px) scale(${0.92 + 0.08 * progress})`,
                    opacity: 0.85 + 0.15 * progress,
                    filter: `blur(${1 - progress}px)`,
                    transition: "none",
                  }
                : {};

              const exitStyle = {
                transform: "translateX(110%) scale(1)",
                opacity: 0,
                filter: "blur(0px)",
                zIndex: 11,
              };

              const computedStyle = isExiting
                ? exitStyle
                : { ...cardStyle, ...(isActive ? activeDragStyle : behindDragStyle) };

              return (
                <div
                  key={slide.id}
                  onClick={() => { if (!isActive && !dragging && dragX === 0) goTo(i); }}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    left: "auto",
                    width: cardWidth,
                    height: "100%",
                    transition: dragging ? "none" : "transform 0.45s cubic-bezier(0.23,1,0.32,1), opacity 0.45s ease, filter 0.45s ease",
                    cursor: isActive ? (dragging ? "grabbing" : "grab") : "pointer",
                    borderRadius: 20,
                    overflow: "hidden",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                    ...computedStyle,
                  }}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    
                    <h3 className="text-white font-bold text-base text-18 md:text-20 font-unbounded mb-1">{slide.title}</h3>
                    <p className="text-white/75 text-12 md:text-16 font-poppins leading-relaxed">{slide.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
