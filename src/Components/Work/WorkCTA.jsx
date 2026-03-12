import React from "react";

export default function WorkCTA({
  heading = "Find out how our team can help your brand grow",
  buttonLabel = "Let's Connect",
  buttonHref = "/contactus",
  backgroundColor = "white",
}) {
  return (
    <section className="w-full" style={{ backgroundColor }}>
      <div
        className="flex flex-col items-center justify-center text-center
                   py-[40px] px-[24px]
                   md:py-[60px] md:px-[60px]
                   lg:py-[80px] lg:px-[100px]"
      >
        <h2
          className="text-black leading-[1.3] mb-[28px]
                     text-[22px]
                     md:text-[32px] md:mb-[36px]
                     lg:text-[50px] lg:mb-[40px]
                     lg:px-[185px] lg:mx-[95px]"
          style={{ fontFamily: "Ultra, serif", fontWeight: "400", lineHeight: "140%" }}
        >
          {heading}
        </h2>

        <a
          href={buttonHref}
          className="flex justify-center items-center bg-[#C92020] hover:opacity-90 transition-opacity rounded-full text-white
                     h-[44px] w-[164px] text-[14px]
                     md:h-[52px] md:w-[200px] md:text-[16px]
                     lg:h-[60px] lg:w-[248px] lg:text-[18px]"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: "700" }}
        >
          {buttonLabel}
        </a>
      </div>
    </section>
  );
}