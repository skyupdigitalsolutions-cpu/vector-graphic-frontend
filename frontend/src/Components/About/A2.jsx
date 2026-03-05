import { useEffect } from "react";

const softwares = [
  { name: "Adobe Photoshop", abbr: "Ps", color: "#31A8FF", bg: "#001E36", logo: "/Photoshop.svg", src: "/images/cimage.png" },
  { name: "Adobe Illustrator", abbr: "Ai", color: "#FF9A00", bg: "#330000", logo: "/AdobeIcon.svg", src: "/images/cimage.png" },
  { name: "Adobe Indesign", abbr: "Id", color: "#FF3366", bg: "#49021F", logo: "/AdobeIcon2.svg", src: "/images/cimage.png" },
  { name: "Sketch", abbr: "Sk", color: "#F7B500", bg: "#FFFFFF", logo: "/Sketch.svg", src: "/images/cimage.png" },
  { name: "Corel", abbr: "Cd", color: "#6AC43F", bg: "#0a1a0a", logo: "/logos/corel.png", src: "/images/cimage.png" },
  { name: "Figma", abbr: "Fg", color: "#A259FF", bg: "#1a0033", logo: "/logos/figma.png", src: "/images/cimage.png" },
  { name: "Adobe XD", abbr: "Xd", color: "#FF61F6", bg: "#2b002b", logo: "/logos/adobexd.png", src: "/images/cimage.png" },
  { name: "Canva", abbr: "Cv", color: "#00C4CC", bg: "#002b2c", logo: "/logos/canva.png", src: "/images/cimage.png" },
];

const beliefs = [
  { num: "01", title: "We believe in quality", desc: "Quality is built into every step of our work. We follow clear standards and careful processes to ensure reliable and lasting outcomes." },
  { num: "02", title: "We believe in creativity", desc: "We use creative thinking and modern approaches to craft unique solutions that are practical, engaging, and effective." },
  { num: "03", title: "We believe in abilities", desc: "Our experienced team uses strong skills and dedication to handle challenges and deliver successful results every time." },
];

const SoftwarePill = ({ sw }) => (
  <div
    style={{
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      gap: "14px",
      width: "302px",
      height: "80px",
      borderRadius: "100px",
      flexShrink: 0,
      boxSizing: "border-box",
      padding: "10px 20px 10px 10px",
      boxShadow: "0 0px 0px rgba(0,0,0,0)",
    }}
  >
    {/* 1. Your image as the MAIN pill background */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "100px",
        backgroundImage: `url('/images/cimage.png')`,  // ✅ uses sw.src
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 0,
        backgroundColor:"gray",
        filter:"brightness(1.5)",
      }}
    />

    {/* 2. Dark overlay so text stays readable */}
    <div
  style={{
    position: "absolute",
    inset: 0,
    borderRadius: "100px",
    background:
      "linear-gradient(1deg, rgba(5,5,5,0) 0%, rgba(5,5,5,0) 60%, rgba(0,0,0,0) 100%)",
    zIndex: 1,
    pointerEvents: "none",
  }}
/>

    {/* 3. Top shimmer highlight */}
   <div
  style={{
    position: "absolute",
    inset: 0,
    borderRadius: "100px",
    background:"linear-gradient(250deg,rgba(30,30,30,0.1) 0%,rgba(60,60,60,0.1) 100%)",
    zIndex: 2,
    pointerEvents: "none",
  }}
/>

    {/* 4. Border radial gradient */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "100px",
        border: "10px solid transparent",
         background:"linear-gradient(250deg,rgba(30,30,30,0.1) 0%,rgba(60,60,60,0.1) 100%)",
        backgroundOrigin: "border-box",
        WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) border-box",
        WebkitMaskComposite: "destination-out",
        maskComposite: "exclude",
        zIndex: 3,
        pointerEvents: "none",
      }}
    />

    {/* 5. Icon — 60×60px, radius 40px */}
    <span
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
      {sw.logo ? (
        <img
          src={sw.logo}
          alt={sw.name}
          style={{ width: "34px", height: "34px", objectFit: "contain" }}
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentNode.innerHTML = `<span style="color:${sw.color};font-weight:800;font-size:14px;font-family:'Poppins',sans-serif">${sw.abbr}</span>`;
          }}
        />
      ) : (
        <span style={{ color: sw.color, fontWeight: 800, fontSize: "14px", fontFamily: "'Poppins',sans-serif" }}>
          {sw.abbr}
        </span>
      )}
    </span>

    {/* 6. Label */}
    <span
      style={{
        position: "relative",
        zIndex: 4,
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
    <span className="absolute top-[13px] left-0 font-bold text-[40px] leading-[40px] tracking-[-0.01em] text-[#D70000]" style={{ fontFamily: "'Inter','Poppins',sans-serif" }}>
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
          gap: 20px;
          animation: marqueeScroll 32s linear infinite;
          align-items: center;
          width: max-content;
        }
      `}</style>

      {/* MARQUEE */}
      <div className="w-full pt-5">
        <p className="text-white text-[18px] text-center tracking-[0.5px] mb-[35px] mt-0" style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 300 }}>
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

      {/* HERO */}
      <div className="w-full box-border text-center px-4 pt-8 pb-12 sm:px-6 sm:pt-10 sm:pb-[60px] lg:max-w-[1440px] lg:mx-auto lg:px-4 lg:pt-14 lg:pb-[72px]">
        <div className="mx-auto mb-5 sm:max-w-[680px] sm:mb-8 lg:max-w-[1036px] lg:mb-11">
          <h1 className="text-white text-[24px] leading-[1.4] mb-4 text-center block sm:hidden" style={{ fontFamily: "'Ultra',Georgia,serif", fontWeight: 400 }}>
            We provide high quality &amp; cost-effective services
          </h1>
          <h1 className="text-white leading-[1.3] mb-[18px] text-center hidden sm:block lg:hidden" style={{ fontFamily: "'Ultra',Georgia,serif", fontWeight: 400, fontSize: "clamp(28px,4.5vw,40px)" }}>
            We provide high quality &amp; cost-effective services
          </h1>
          <h1 className="text-white leading-[56px] mb-[22px] text-center tracking-[-0.3px] hidden lg:block" style={{ fontFamily: "'Ultra',Georgia,serif", fontWeight: 400, fontSize: "clamp(36px,4.2vw,50px)" }}>
            <span className="block whitespace-nowrap">We provide high quality and</span>
            <span className="block whitespace-nowrap">cost-effective services</span>
          </h1>
          <p className="text-[#9ca3af] text-[13px] leading-[1.75] font-normal mx-auto text-center sm:text-[15px] sm:leading-[1.7] sm:max-w-[560px] lg:text-[18px] lg:leading-[28px] lg:max-w-[1360px]" style={{ fontFamily: "'Poppins',sans-serif" }}>
            We deliver reliable, high-standard solutions that balance quality and affordability, ensuring maximum value and measurable results for every client.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 gap-4 w-full mx-auto sm:grid-cols-2 sm:gap-5 sm:max-w-[720px] lg:grid-cols-3 lg:gap-10 lg:max-w-[1280px]">
          {beliefs.map((b, i) => (
            <div
              key={b.num}
              className={`bg-white text-left box-border flex flex-col gap-[10px] rounded-[30px] p-[30px_20px] sm:rounded-3xl sm:p-[28px_22px] sm:shadow-[0_4px_20px_rgba(0,0,0,0.25)] lg:rounded-[30px] lg:p-[30px_20px] lg:shadow-[0_8px_32px_rgba(0,0,0,0.35)] ${i === 2 ? "sm:[grid-column:1/-1] sm:max-w-[340px] sm:mx-auto sm:w-full lg:[grid-column:auto] lg:max-w-none lg:mx-0" : ""}`}
            >
              <BeliefBadge num={b.num} />
              <h3 className="text-[16px] sm:text-[17px] lg:text-[18px] font-bold m-0 text-[#111827]" style={{ fontFamily: "'Poppins',sans-serif" }}>
                {b.title}
              </h3>
              <p className="text-[13px] sm:text-[14px] lg:text-[16px] leading-[1.75] text-[#4b5563] m-0" style={{ fontFamily: "'Poppins',sans-serif" }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}