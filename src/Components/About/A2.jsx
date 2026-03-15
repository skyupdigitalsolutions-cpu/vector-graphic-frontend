import { useEffect } from "react";

const softwares = [
  { name: "Adobe Photoshop", abbr: "Ps", color: "#31A8FF", bg: "#001E36", logo: "/images/adobephotoshop.svg", src: "/images/cimage.png" },
  { name: "Adobe Illustrator", abbr: "Ai", color: "#FF9A00", bg: "#330000", logo: "/images/adobeillustrator.svg", src: "/images/cimage.png" },
  { name: "Adobe Indesign", abbr: "Id", color: "#FF3366", bg: "#49021F", logo: "/images/adobeindesign.svg", src: "/images/cimage.png" },
  { name: "Sketch", abbr: "Sk", color: "#F7B500", bg: "#FFFFFF", logo: "/images/skecth.svg", src: "/images/cimage.png" },
  { name: "Corel", abbr: "Cd", color: "#6AC43F", bg: "#0a1a0a", logo: "/images/corel.svg", src: "/images/cimage.png" },
  { name: "Blender", abbr: "Fg", color: "#A259FF", bg: "#1a0033", logo: "/images/blender.svg", src: "/images/cimage.png" },
  { name: "Canva", abbr: "Cv", color: "#00C4CC", bg: "#002b2c", logo: "/images/canva_logo.svg", src: "/images/cimage.png" },
];

const beliefs = [
  { num: "01", title: "We believe in quality", desc: "Quality is built into every step of our work. We follow clear standards and careful processes to ensure reliable and lasting outcomes." },
  { num: "02", title: "We believe in creativity", desc: "We use creative thinking and modern approaches to craft unique solutions that are practical, engaging, and effective." },
  { num: "03", title: "We believe in abilities", desc: "Our experienced team uses strong skills and dedication to handle challenges and deliver successful results every time." },
];

const SoftwarePill = ({ sw }) => (
  <div
    className="software-pill"
    style={{
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "14px",
      width: "270px",
      height: "80px",
      borderRadius: "100px",
      flexShrink: 0,
      boxSizing: "border-box",
      padding: "10px 20px 10px 10px",
      boxShadow: "0 0px 0px rgba(0,0,0,0)",
    }}
  >
    {/* 1. Background image */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "100px",
        backgroundImage: `url('${sw.src}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 0,
        backgroundColor: "gray",
        filter: "brightness(1.5)",
      }}
    />

    {/* 2. Dark overlay */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "100px",
        background: "linear-gradient(1deg, rgba(5,5,5,0) 0%, rgba(5,5,5,0) 60%, rgba(0,0,0,0) 100%)",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />

    {/* 3. Shimmer highlight */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "100px",
        background: "linear-gradient(250deg,rgba(30,30,30,0.1) 0%,rgba(60,60,60,0.1) 100%)",
        zIndex: 2,
        pointerEvents: "none",
      }}
    />

    {/* 4. Border gradient */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "100px",
        border: "1px solid transparent",
        background: "linear-gradient(250deg,rgba(30,30,30,0.1) 0%,rgba(60,60,60,0.1) 100%)",
        backgroundOrigin: "border-box",
        WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) border-box",
        WebkitMaskComposite: "destination-out",
        maskComposite: "exclude",
        zIndex: 3,
        pointerEvents: "none",
      }}
    />

    {/* 5. Icon — logo only, no abbr fallback */}
    <span
      className="pill-icon"
      style={{
        position: "relative",
        zIndex: 4,
        width: "60px",
        height: "60px",
        minWidth: "60px",
        borderRadius: "40px",
        background: sw.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <img
        src={sw.logo}
        alt={sw.name}
        style={{ width: "60px", height: "60px", objectFit: "contain" }}
      />
    </span>

    {/* 6. Label */}
    <span
      className="pill-label"
      style={{
        position: "relative",
        zIndex: 4,
        flex: 1,
        textAlign: "center",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        fontSize: "18px",
        lineHeight: "30px",
        letterSpacing: "0px",
        color: "#f0f0f0",
        whiteSpace: "nowrap",
      }}
    >
      {sw.name}
    </span>
  </div>
);

const BeliefBadge = ({ num }) => (
  <div className="relative w-[83px] h-[62px] flex-shrink-0">
    <div className="absolute top-0 left-[21px] w-[62px] h-[62px] rounded-full bg-[#FFB3B3]" />
    <span
      className="absolute top-[13px] left-0 font-bold text-[40px] leading-[40px] tracking-[-0.01em] text-[#D70000]"
      style={{ fontFamily: "'Inter','Poppins',sans-serif" }}
    >
      {num}
    </span>
  </div>
);

export default function A2() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Ultra&family=Inter:wght@700&family=Poppins:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const marqueeItems = [...softwares, ...softwares, ...softwares];

  return (
    <div className="bg-[#181C23] w-full overflow-hidden" style={{ fontFamily: "'Poppins',sans-serif" }}>
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
          .hero-section{
  background-image: url('/images/ourservicebackgound.webp'); /* default = desktop */
}
  /* Tablet */
@media (max-width:1024px){
  .hero-section{
    background-image: url('/images/ourservicebackgound.webp');
  }
}

/* Mobile */
@media (max-width:640px){
  .hero-section{
    background-image: url('/images/Aboutus_softwarebg.webp');
  }
}
        @media (max-width: 768px) {
          .software-pill {
            width: 218px !important;
            height: 54px !important;
            padding: 6px 12px 6px 6px !important;
            gap: 8px !important;
          }
          .software-pill .pill-icon {
            width: 46px !important;
            height: 45px !important;
            min-width: 38px !important;
          }
          .software-pill .pill-label {
            font-size: 12px !important;
            line-height: 1.3 !important;
          }
          .marquee-track {
            gap: 15px !important;
          }
        }
         @media (max-width: 639px){
  .cards-grid{
    padding-left:16px;
    padding-right:16px;
  }
}
      `}</style>

      {/* MARQUEE */}
      <div className="w-full pt-5">
        <p
          className="text-white text-[18px] sm:mb-[24px] text-center tracking-[0.5px] lg:mb-[35px] mt-0"
          style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 300 }}
        >
          Softwares we Use
        </p>

        <div style={{ width: "100%", overflow: "hidden", position: "relative", height: "96px", display: "flex", alignItems: "center" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to right, #181C23, transparent)", zIndex: 10, pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to left, #181C23, transparent)", zIndex: 10, pointerEvents: "none" }} />

          <div className="marquee-track">
            {marqueeItems.map((sw, i) => (
              <SoftwarePill key={i} sw={sw} />
            ))}
          </div>
        </div>
      </div>

      {/* HERO style={{backgroundImage:"url('/images/ourservicebackgound.webp')"}}*/}

      <div  className="hero-section w-full box-border text-center  pt-8 pb-12  sm:pt-10 sm:pb-[60px] lg:pt-20 lg:pb-[190px] bg-center bg-no-repeat bg-cover">
        <div className="mx-auto mb-5 sm:max-w-[680px] sm:mb-8 lg:max-w-[1036px] lg:mb-11">
          <h1
            className="text-white text-[24px] leading-[1.4] mb-4 text-center block sm:hidden"
            style={{ fontFamily: "'Ultra',Georgia,serif", fontWeight: 400 }}
          >
            We provide high quality cost-effective services
          </h1>
          <h1
            className="text-white leading-[1.3] mb-[18px] text-center hidden sm:block lg:hidden"
            style={{ fontFamily: "'Ultra',Georgia,serif", fontSize: "clamp(24px,4.5vw,40px)" }}
          >
            We provide high quality cost-effective services
          </h1>
          <h1
            className="text-white leading-[56px] mb-[22px] text-center tracking-[-0.3px] hidden lg:block"
            style={{ fontFamily: "'Ultra',Georgia,serif", fontSize: "clamp(36px,4.2vw,50px)" }}
          >
            <span className="block whitespace-nowrap">We provide high quality and</span>
            <span className="block whitespace-nowrap">cost-effective services</span>
          </h1>
          <p
            className="text-[#9ca3af] leading-[1.75] font-normal mx-auto text-center text-[14px] sm:leading-[1.7] sm:max-w-[560px] lg:text-[18px] lg:leading-[28px] lg:max-w-[1360px]"
            style={{ fontFamily: "'Poppins',sans-serif" }}
          >
            We deliver reliable, high-standard solutions that balance quality and affordability, ensuring maximum value and measurable results for every client.
          </p>
        </div>

        {/* CARDS */}
        <div className="cards-grid grid grid-cols-1 gap-4 w-full mx-auto sm:grid-cols-2 sm:gap-5 sm:max-w-[720px] lg:grid-cols-3 lg:gap-10 lg:max-w-[1280px]">
          {beliefs.map((b, i) => (
            <div
              key={b.num}
              className={`bg-white text-left box-border flex flex-col gap-[10px] rounded-[30px] p-[30px_20px] sm:rounded-3xl sm:p-[28px_22px] sm:shadow-[0_4px_20px_rgba(0,0,0,0.25)] lg:rounded-[30px] lg:p-[30px_20px] lg:shadow-[0_8px_32px_rgba(0,0,0,0.35)] ${i === 2 ? "sm:[grid-column:1/-1] sm:max-w-[340px] sm:mx-auto sm:w-full lg:[grid-column:auto] lg:max-w-none lg:mx-0" : ""}`}
            >
              <BeliefBadge num={b.num} />
              <h3
                className="text-[16px] sm:text-[17px] lg:text-[18px] font-[500] m-0 text-[#111827]"
                style={{ fontFamily: "'Unbounded',sans-serif" }}
              >
                {b.title}
              </h3>
              <p
                className="text-[13px] sm:text-[14px] lg:text-[16px] lg:font-[400] leading-[1.75] text-[#353434] m-0"
                style={{ fontFamily: "'Poppins',sans-serif" }}
              >
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
