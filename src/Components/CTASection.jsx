import React from "react";

export default function CTASection({
  heading = "Ready to Elevate Your Packaging?",
  subheading = "Drive faster business growth with innovative solutions and strategies that deliver real results and long-term success.",
  buttonLabel = "Let's Talk",
  buttonColor = "#C92020",
  onButtonClick,
  headingFont = "Ultra, serif",
  bodyFont = "Poppins, sans-serif",
  backgroundColor = "white",
  className="",
}) {
  // If it's a CSS color value (hex, rgb, named), use inline style
  // If it's a Tailwind class (e.g. "bg-gray-100"), use className
  const isCssColor = /^(#|rgb|hsl|[a-z]+$)/.test(backgroundColor.trim());

  return (
    <section
      className={`${!isCssColor ? backgroundColor : ""} ${className}`}
      style={isCssColor ? { backgroundColor } : {}}
    >
      <div
        className="flex flex-col justify-center items-center mx-auto text-center
                   py-[40px] px-[24px] max-w-[1300px]
                   md:py-[60px] md:px-[60px]
                   lg:py-[80px] lg:px-[100px]"
      >
        <h2
          className="text-black leading-[1.3] mb-[12px]
                     text-[22px] md:text-[32px] lg:text-[50px]"
          style={{ fontFamily: headingFont, fontWeight: "400" }}
        >
          {heading}
        </h2>

        <p
          className="text-gray-600 leading-[1.6] mb-[28px]
                     text-[13px]
                     md:text-[15px] md:mb-[36px]
                     lg:text-[20px] lg:mb-[40px]"
          style={{ fontFamily: bodyFont }}
        >
          {subheading}
        </p>

        <a
          href="/contactus"
          onClick={onButtonClick}
          className="transition-opacity hover:opacity-90 rounded-full text-white
                     font-poppins flex justify-center items-center
                     h-[44px] w-[140px] text-[14px]
                     md:h-[52px] md:w-[180px] md:text-[15px]
                     lg:h-[60px] lg:w-[248px] lg:text-[20px]"
          style={{ backgroundColor: buttonColor, fontWeight: "700" }}
        >
          {buttonLabel}
        </a>
      </div>
    </section>
  );
}