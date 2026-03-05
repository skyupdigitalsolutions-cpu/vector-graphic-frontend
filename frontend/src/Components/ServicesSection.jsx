import React, { useState } from "react";

const services = [
  {
    title: "Packaging Designs",
    description:
      "Our Design process creates specialized layouts that blend perfectly with your branded product parameters.",
    logo: "/images/logo.png",
    logoHover: "/logo-white.png",
  },
  {
    title: "Artwork Management",
    description:
      "Our Design process creates specialized layouts that blend perfectly with your branded product parameters.",
    logo: "/images/logo.png",
    logoHover: "/logo-white.png",
  },
  {
    title: "Repro Print Ready File",
    description:
      "Our Design process creates specialized layouts that blend perfectly with your branded product parameters.",
    logo: "/images/logo.png",
    logoHover: "/logo-white.png",
  },
  {
    title: "Tracing & Retouching",
    description:
      "Our Design process creates specialized layouts that blend perfectly with your branded product parameters.",
    logo: "/images/logo.png",
    logoHover: "/logo-white.png",
  },
  {
    title: "3D CGI & Physical Mockups",
    description:
      "Our Design process creates specialized layouts that blend perfectly with your branded product parameters.",
    logo: "/images/logo.png",
    logoHover: "/logo-white.png",
  },
  {
    title: "PPM Print Coordination",
    description:
      "Our Design process creates specialized layouts that blend perfectly with your branded product parameters.",
    logo: "/images/logo.png",
    logoHover: "/logo-white.png",
  },
];

const ServiceCard = ({ title, description, logo, logoHover }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className="rounded-[30px] py-[30px] px-[20px] flex flex-col gap-[10px] shadow-sm  cursor-pointer"
      style={{
        backgroundColor: isActive ? "#C0160F" : "#ffffff",
        transition: "background-color 0.25s ease",
      }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(true)}
    >
      {/* Icon circle */}
      <div
        className="w-[60px] h-[60px] lg:w-[72px] lg:h-[72px] rounded-full flex items-center justify-center mb-2 flex-shrink-0"
        style={{
          backgroundColor: isActive ? "#ffffff" : "#fde8e8",
          transition: "background-color 0.25s ease",
        }}
      >
        <img
          src={isActive ? logoHover : logo}
          alt={title}
          className="w-[30px] h-[30px] lg:w-[36px] lg:h-[36px] object-cover"
          style={{ transition: "opacity 0.2s ease" }}
        />
      </div>

      {/* Title */}
      <h3
        className="sm:text-[16px] font-bold"
        style={{
          color: isActive ? "#ffffff" : "#111827",
          transition: "color 0.25s ease",
          fontSize: "18px",
          fontFamily: "unbounded",
          fontWeight: "500",
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="sm:text-[14px] lg:h-[72px] w-[360px] leading-relaxed flex-1"
        style={{
          color: isActive ? "rgba(255,255,255,0.8)" : "#6b7280",
          transition: "color 0.25s ease",
          fontSize: "16px",
          fontFamily: "poppins",
          fontWeight: "400",
        }}
      >
        {description}
      </p>

      {/* Button */}
      <div>
        <button
          className="mt-2  font-semibold px-5 py-2 rounded-[24px] transition-colors"
          style={{
            backgroundColor: isActive ? "#ffffff" : "#111827",
            fontSize: "12px",
            fontFamily: "unbounded",
            color: isActive ? "#111111" : "#ffffff",
            transition: "background-color 0.25s ease, color 0.25s ease",
          }}
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default function ServicesSection() {
  return (
    <section
      className="w-full py-14 lg:py-20"
      style={{ backgroundColor: "#181C23" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
        {/* heading: grows slightly at md */}
        <h2
          className="text-[24px] md:text-[26px] lg:text-[50px]  font-[400px] text-white mb-10"
          style={{ fontFamily: "unbounded",fontWeight:700 }}
        >
          Our Services
        </h2>

        {/* grid: 1 col → 2 col at md → 3 col at lg */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
