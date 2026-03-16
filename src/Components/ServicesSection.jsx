import React, { useState } from "react";

const services = [
  {
    title: "Packaging Designs",
    description:
      "Creative packaging designs that boost brand identity, attract customers, and help products stand out.",
    logo: "/images/service_logo_1.svg",
    logoHover: "/images/service_logo_hover_1.svg",
  },
  {
    title: "Artwork Management",
    description:
      "Artwork Management organizes and tracks design files with version control for brand consistency.",
    logo: "/images/service_logo_2.svg",
    logoHover: "/images/service_logo_hover_2.svg",
  },
  {
    title: "Repro Print Ready File",
    description:
      "Print-ready files with accurate color, resolution, and formatting for flawless, professional printing.",
    logo: "/images/service_logo_3.svg",
    logoHover: "/images/service_logo_hover_3.svg",
  },
  {
    title: "Tracing & Retouching",
    description:
      "We provide high-quality image tracing and retouching to enhance clarity, accuracy, and visual appeal.",
    logo: "/images/service_logo_4.svg",
    logoHover: "/images/service_logo_hover_4.svg",
  },
  {
    title: "3D CGI & Physical Mockups",
    description:
      "Create realistic 3D CGI visuals and mockups to preview designs and ensure accuracy before production.",
    logo: "/images/service_logo_5.svg",
    logoHover: "/images/service_logo_hover_5.svg",
  },
  {
    title: "PPM Print Coordination",
    description:
      "PPM print coordination ensures accurate color, layout, and quality before mass printing to avoid errors.",
    logo: "/images/service_logo_6.svg",
    logoHover: "/images/service_logo_hover_6.svg",
  },
];

const ServiceCard = ({ title, description, logo, logoHover }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className="rounded-[30px]  py-[30px] px-[20px] flex flex-col gap-[10px]  shadow-sm cursor-pointer w-full"
      style={{
        backgroundColor: isActive ? "#C0160F" : "#ffffff",
        transition: "background-color 0.25s ease",
      }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {/* Icon circle */}
      <div className="sm:gap-[16px] sm:h-[230px] w-[310px] lg:h-[249px] lg:w-[360px] lg:gap-[24px]">
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
        <h3 className="text-[16px] lg:text-[18px]"
          style={{
            color: isActive ? "#ffffff" : "#111827",
            transition: "color 0.25s ease",
            fontFamily: "unbounded",
            fontWeight: "500",
          }}
        >
          {title}
        </h3>

        {/* Description — no fixed width or height, grows naturally */}
        <p
          className=" h-[72px] text-[14px] leading-[150%] font-normal py-[12px] pe-4 md:text-[16px]"
          style={{
            fontFamily: "Poppins",
            color: isActive ? "rgba(255,255,255,0.8)" : "#353434",
            transition: "color 0.25s ease",
          }}
        >
          {description}
        </p>

        {/* Button */}
        {/* <div className=" sm:mt-[20px] lg:mt-[24px] lg:mb-[30px]">
        <button
          className="mt-4 font-[500] px-3 py-2 rounded-[24px] sm:w-[78px] sm:h-[18px] lg:w-[142px] lg:h-[42px] transition-colors"
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
      </div> */}
      </div>
    </div>
  );
};

export default function ServicesSection() {
  return (
    <>
      <style>{`
        .services-section {
          background-image: url('/images/Our_Service_Background_Mobile.webp');
          background-size: 100% 100%;
          background-position: center top;
          background-repeat: no-repeat;
        }
        @media (min-width: 768px) {
          .services-section {
            background-image: url('/images/service_banner.webp');
            background-size: cover;
            background-position: center center;
          }
        }
      `}</style>

      <section className="services-section w-full py-14 lg:py-35">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-5">
          <h2
            className="text-[24px] md:text-[26px] lg:text-[50px] text-white mb-3"
            style={{ fontFamily: "unbounded", fontWeight: 500 }}
          >
            Our Services
          </h2>
          <p
            className="text-[14px] md:text-[20px] lg:text-[18px] text-white/70 mb-8"
            style={{ fontFamily: "poppins", fontWeight: 400 }}
          >
            Our packaging includes eye-catching visuals optimized for retail
            shelves and e-commerce.
          </p>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
            {services.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
