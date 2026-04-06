import { useEffect } from "react";

const softwares = [
  {
    name: "Adobe Photoshop",
    abbr: "Ps",
    color: "#31A8FF",
    bg: "#001E36",
    logo: "/images/adobephotoshop.svg",
    src: "/images/cimage.png",
  },
  {
    name: "Adobe Illustrator",
    abbr: "Ai",
    color: "#FF9A00",
    bg: "#330000",
    logo: "/images/adobeillustrator.svg",
    src: "/images/cimage.png",
  },
  {
    name: "Adobe Indesign",
    abbr: "Id",
    color: "#FF3366",
    bg: "#49021F",
    logo: "/images/adobeindesign.svg",
    src: "/images/cimage.png",
  },
  {
    name: "Sketch",
    abbr: "Sk",
    color: "#F7B500",
    bg: "#FFFFFF",
    logo: "/images/skecth.svg",
    src: "/images/cimage.png",
  },
  {
    name: "Corel",
    abbr: "Cd",
    color: "#6AC43F",
    bg: "#0a1a0a",
    logo: "/images/corel.svg",
    src: "/images/cimage.png",
  },
  {
    name: "Blender",
    abbr: "Fg",
    color: "#A259FF",
    bg: "#1a0033",
    logo: "/images/blender.svg",
    src: "/images/cimage.png",
  },
  {
    name: "Canva",
    abbr: "Cv",
    color: "#00C4CC",
    bg: "#002b2c",
    logo: "/images/canva_logo.svg",
    src: "/images/cimage.png",
  },
];

const SoftwarePill = ({ sw }) => (
  <div
    className="relative inline-flex items-center justify-start gap-[14px] w-[200px] h-[54px] lg:w-[302px] lg:h-[80px] mb-10 lg:mb-0 rounded-full flex-shrink-0 box-border pl-[10px] md:px-3 md:pl-[6px] overflow-hidden"
    style={{
      backgroundImage: `url('/images/glasefect.webp')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* Icon */}
    <span
      className="relative z-[4] w-[38px] ml-0 lg:ml-1 h-[38px] lg:w-[60px] lg:h-[60px] rounded-[40px] flex items-center justify-center overflow-hidden flex-shrink-0"
      style={{ background: sw.bg }}
    >
      <img
        src={sw.logo}
        alt={sw.name}
        className="w-[38px] h-[38px] lg:w-[60px] lg:h-[60px] object-contain"
      />
    </span>

    {/* Label */}
    <span className="relative z-[4] flex-1 text-left font-poppins font-[600] text-[14px] lg:text-[18px] leading-[30px] md:leading-tight tracking-[0px] text-[#f0f0f0] whitespace-nowrap">
      {sw.name}
    </span>
  </div>
);

export default function A2() {
  const marqueeItems = [...softwares, ...softwares, ...softwares];

  return (
    <div className="bg-[#000000] w-full  font-poppins">
      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .marquee-track {
          display: flex;
          gap: 24px;
          animation: marqueeScroll 32s linear infinite;
          align-items: center;
          width: max-content;
        }
        @media (max-width: 768px) {
          .marquee-track { gap: 15px !important; }
        }
      `}</style>

      {/* MARQUEE */}
      <div className="w-full lg:py-10">
        <p className="text-white text-[20px] lg:text-[50px] px-3 lg:pl-20 font-extrabold mb-4 lg:mb-[15px] ">
          Softwares we Use
        </p>

        <div className="w-full overflow-hidden relative h-24 flex items-center">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#181C23] to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#181C23] to-transparent z-10 pointer-events-none" />

          <div className="marquee-track">
            {marqueeItems.map((sw, i) => (
              <SoftwarePill key={i} sw={sw} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
