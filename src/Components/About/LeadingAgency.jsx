import { useEffect, useRef } from "react";

const cards = [
  {
    title: "Our Mission",
    icon:<img src="/images/rocket_launch1.svg" alt="Mission" />,
    text: "To deliver reliable and high-quality branding solutions built on trust and strong values. We aim to support brands with creative strategies that ensure clarity, consistency, and measurable impact.",
  },
  {
    title: "Our Vision",
    icon: <img src="/images/visibility1.svg" alt="Mission" />,
    text: "To become a preferred branding solutions partner known for creativity and client satisfaction. We strive to make professional branding accessible, effective, and valuable for every business we work with.",
  },
  {
    title: "Our Strategy",
    icon: <img src="/images/cognition1.svg" alt="Mission" />,
    text: "To use modern tools and smart processes to deliver result-driven branding solutions. We combine innovation with structured execution to create scalable and impactful brand growth.",
  },
];

function CardIcon({ icon }) {
  return (
    <div className=" flex items-center justify-center text-white flex-shrink-0">
      {icon}
    </div>
  );
}

function Card({ title, icon, text, delay }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("opacity-100", "translate-y-0");
          el.classList.remove("opacity-0", "translate-y-6");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className=" translate-y-6 transition-all duration-700 w-[340px] h-[182px] lg:w-[417px] lg:h-[216px]
                 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg p-3
                 lg:pt-[26px] lg:px-[24px] flex flex-col gap-2 lg:gap-5 "
    >
      <div className="flex items-center justify-between">
        <h3 className="text-[#C92020] font-bold text-[18px] lg:text-[24px]">{title}</h3>
        <CardIcon icon={icon} />
      </div>
      <div className="font-poppins text-[14px] mt-0 lg:mt-[19px] lg:text-[16px]">{text}</div>
    </div>
  );
}

export default function LeadingAgency() {
  const headingRef = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    [headingRef, subRef].forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;
      setTimeout(() => {
        el.classList.add("opacity-100", "translate-y-0");
        el.classList.remove("opacity-0", "translate-y-4");
      }, i * 150);
    });
  }, []);

  return (
    <section className="  flex items-center">
      <div className="max-w-7xl mx-auto px-1 py-20 w-full">
        {/* Heading */}
        <div className="mb-12 px-[20px] font-poppins">
          <h1
            className=" text-[20px] md:text-[50px]  font-extrabold   mb-4"
          >
            What makes us the Leading
            <br />
            Branding Solutions Agency in Bangalore
          </h1>
          <p
            className="text-[14px] lg:text-[16px]   max-w-[1002px]"
          >
            Despite being a growing name in the industry, we have successfully helped numerous brands achieve consistent growth over the years. As a creative agency specializing in branding solutions, we bring the expertise and strategic thinking that sets us apart. Our focus is on helping brands build strong identities, enhance visibility, and stay ahead in a competitive market.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center font-poppins">
          {cards.map((card, i) => (
            <Card key={card.title} {...card} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}