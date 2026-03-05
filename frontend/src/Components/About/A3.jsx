import React from "react";

const cards = [
  {
    title: "Our Mission",
    icon: "/images/rocket_launch.svg",
    desc: "To deliver reliable and high-quality graphic design solutions built on trust and strong ethics. We aim to support brands with creative work that creates clarity, consistency, and measurable impact.",
  },
  {
    title: "Our Vision",
    icon: "/images/visibility.svg",
    desc: "To be a preferred creative partner known for excellence and client satisfaction. We strive to make professional design accessible, effective, and valuable for every customer we serve.",
  },
  {
    title: "Our Strategy",
    icon: "/images/cognition.svg",
    desc: "To use modern tools and smart processes to create business-focused design solutions. We combine innovation and structured execution to deliver fast, scalable, and goal-driven outcomes.",
  },
];

const A3 = () => {
  return (
    <section className="w-full bg-white font-[Poppins] overflow-hidden">
      <style>{`
        .a3-mobile  { display: flex; }
        .a3-tablet  { display: none; }
        .a3-desktop { display: none; }

        @media (min-width: 768px) {
          .a3-mobile  { display: none; }
          .a3-tablet  { display: flex; }
          .a3-desktop { display: none; }
        }

        @media (min-width: 1024px) {
          .a3-mobile  { display: none; }
          .a3-tablet  { display: none; }
          .a3-desktop { display: block; }
        }
      `}</style>

      <div className="w-full max-w-[1440px] mx-auto">
        {/* ── MOBILE (< 768px) ── */}
        <div className="a3-mobile flex-col gap-[36px] px-[20px] pt-[36px] pb-[50px] box-border">
          <div className="flex flex-col gap-[16px]">
            <h1
              className="font-[Ultra] text-[24px] text-[#000000] m-0"
              style={{ lineHeight: "140%", letterSpacing: "0px" }}
            >
              Why Our Creative <br />
              Solutions Stand Out
            </h1>
            <p
              className="text-[14px] text-[#525252] m-0"
              style={{ lineHeight: "140%", letterSpacing: "0.5px" }}
            >
              We help businesses grow with high-impact design solutions that
              blend strategy, creativity, and technology. Our focus is on real
              results, strong brand value, and long-term client success.
            </p>
          </div>
          <div className="flex flex-col gap-[15px]">
            {cards.map((card) => (
              <div
                key={card.title}
                className="bg-[#E31E24] rounded-[16px] px-[20px] pt-[20px] pb-[24px] flex flex-col gap-[12px]"
              >
                <div className="flex items-center justify-between">
                  <h2
                    className="font-[Ultra] text-[20px] text-white m-0"
                    style={{ lineHeight: "120%" }}
                  >
                    {card.title}
                  </h2>
                  <img
                    src={card.icon}
                    alt={card.title}
                    className="w-[30px] h-[30px] object-contain"
                  />
                </div>
                <p
                  className="text-white/90 text-[14px] m-0"
                  style={{ lineHeight: "150%" }}
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── TABLET (768px–1023px) ── */}
        <div className="a3-tablet flex-col px-[32px] pt-[40px] pb-[40px] gap-[36px]">
          <div className="flex flex-col gap-[12px]">
            <h1
              className="font-[Ultra] text-[32px] text-[#000000] m-0"
              style={{ lineHeight: "140%", letterSpacing: "0px" }}
            >
              Why Our Creative <br />
              Solutions Stand Out
            </h1>
            <p
              className="text-[14px] text-[#525252] m-0"
              style={{ lineHeight: "140%", letterSpacing: "0.5px" }}
            >
              We help businesses grow with high-impact design solutions that
              blend strategy, creativity, and technology. Our focus is on real
              results, strong brand value, and long-term client success.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {cards.map((card) => (
              <div
                key={card.title}
                className="bg-[#E31E24] rounded-[16px] px-[20px] pt-[24px] pb-[30px] flex flex-col min-h-[240px]"
              >
                <div className="flex items-center justify-between">
                  <h2
                    className="font-[Ultra] text-[20px] text-white m-0"
                    style={{ lineHeight: "1.2" }}
                  >
                    {card.title}
                  </h2>
                  <img
                    src={card.icon}
                    alt={card.title}
                    className="w-[32px] h-[32px] object-contain"
                  />
                </div>
                <p
                  className="mt-[14px] text-white/85 text-[14px] m-0"
                  style={{ lineHeight: "140%" }}
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── DESKTOP (1024px+) ── */}
        <div className="a3-desktop px-[80px] pt-[90px] pb-[60px]">
          <div className="flex flex-row justify-between items-start mb-[40px]">
            <h1
              className="font-[Ultra] text-[40px] text-[#000000] m-0"
              style={{ lineHeight: "64px", letterSpacing: "0px" }}
            >
              Why Our Creative <br />
              Solutions Stand Out
            </h1>
            <div style={{ width: "581px", paddingTop: "8px" }}>
              <p
                className="text-[16px] text-[#525252] m-0"
                style={{ lineHeight: "160%", letterSpacing: "0.5px" }}
              >
                We help businesses grow with high-impact design solutions that
                blend strategy, creativity, and technology. Our focus is on real
                results, strong brand value, and long-term client success.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-[25px]">
            {cards.map((card) => (
              <div
                key={card.title}
                className="bg-[#E31E24] rounded-[16px] px-[28px] pt-[28px] pb-[28px] flex flex-col gap-[16px]"
              >
                <div className="flex items-center justify-between">
                  <h2
                    className="font-[Ultra] text-[24px] text-white m-0"
                    style={{ lineHeight: "1.2" }}
                  >
                    {card.title}
                  </h2>
                  <img
                    src={card.icon}
                    alt={card.title}
                    className="w-[36px] h-[36px] object-contain"
                  />
                </div>
                <p
                  className="text-white/60 text-[15px] m-0"
                  style={{ lineHeight: "140%", letterSpacing: "0.5px" }}
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default A3;
