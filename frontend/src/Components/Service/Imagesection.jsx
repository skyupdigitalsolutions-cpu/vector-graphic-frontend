import React, { useState } from "react";

const images = [
  { src: "/images/Frame.png", alt: "City lights",   rotate: -4.03, translateY: -10, zIndex: 4 },
  { src: "/images/Frame.png", alt: "Portrait",      rotate:  8.69, translateY: -8,  zIndex: 1 },
  { src: "/images/Frame.png", alt: "Abstract blue", rotate: -2.09, translateY: -15, zIndex: 4 },
  { src: "/images/Frame.png", alt: "Mountains",     rotate: -11.05,translateY: -20, zIndex: 4 },
  { src: "/images/Frame.png", alt: "Butterfly",     rotate:  10,   translateY: -15, zIndex: 4 },
];

export default function Imagesection() {
  const [hovered, setHovered] = useState(null);
  const [active, setActive]   = useState(null);

  return (
    <div className="flex items-end justify-center w-full max-w-5xl mx-auto px-4 overflow-visible h-[180px] md:h-[260px] lg:h-[347px] lg:w-[1280px] lg:px-[80px] mt-[44px] pb-[50px] lg:pt-[30px] lg:mt-[120px] lg:pb-[90px]">
      {images.map((img, i) => {
        const isHovered = hovered === i;
        const isActive  = active  === i;
        const isEngaged = isHovered || isActive;

        const extraY  = isActive ? 6 : isHovered ? -18 : 0;
        const scale   = isActive ? 0.96 : isHovered ? 1.07 : 1;
        const rotate  = isEngaged ? 0 : img.rotate;
        const zIndex  = isEngaged ? 10 : img.zIndex;

        return (
          <div
            key={i}
            style={{
              transform: `translateY(${img.translateY + extraY}px) rotate(${rotate}deg)`,
              zIndex,
              position: "relative",
              flexShrink: 0,
              marginLeft: i === 0 ? "0" : undefined,
              transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
              cursor: "pointer",
            }}
            className={i === 0 ? "" : "-ml-1 md:-ml-2 lg:ml-2"}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => { setHovered(null); setActive(null); }}
            onMouseDown={()  => setActive(i)}
            onMouseUp={()    => setActive(null)}
          >
            <div
              className="rounded-xl lg:rounded-2xl overflow-hidden w-[69px] h-[81px] md:w-[155px] md:h-[185px] lg:w-[248px] lg:h-[290px]"
              style={{
                transform: `scale(${scale})`,
                transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, filter 0.3s ease",
                boxShadow: isHovered
                  ? "0 24px 48px rgba(0,0,0,0.35)"
                  : isActive
                  ? "0 4px 12px rgba(0,0,0,0.2)"
                  : "0 8px 24px rgba(0,0,0,0.18)",
                filter: isHovered
                  ? "brightness(1.1) saturate(1.15)"
                  : isActive
                  ? "brightness(0.9)"
                  : "brightness(1)",
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}