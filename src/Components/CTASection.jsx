import React from "react";

export default function CTASection({
  heading = "Get a proposal.",
  subheading = "Ready to discuss your project with us?",
  buttonLabel = "Let's Talk",
  backgroundColor = "white",
  className = "",
}) {
  const isCssColor = /^(#|rgb|hsl|[a-z]+$)/.test(backgroundColor.trim());

  return (
    <section className="bg-black font-poppins">
      <div
        className="flex flex-col lg:flex-row justify-between items-center lg:text-start mx-auto
                   py-[40px] font-medium
                   md:py-[60px] md:px-[60px]
                   lg:py-[60px] lg:px-[80px]"
      >
        <div>
          <p
            className="text-white 
                     text-[18px] py-2
                     lg:text-[30px] "
          >
            {subheading}
          </p>
          <h2
            className="text-white leading-[1.3] font-semibold
                     text-[22px] md:text-[32px] lg:text-[70px]"
          >
            {heading}
          </h2>
        </div>

        <a
          href="/contactus"
          className="font-poppins flex justify-center items-center bg-white font-medium
                     h-[36px] w-[134px] text-[14px] my-[20px] lg:my-0
                     md:h-[52px] md:w-[180px] md:text-[15px]
                     lg:h-[68px] lg:w-[280px] lg:text-[30px]"
        >
          {buttonLabel}
        </a>
      </div>
    </section>
  );
}
