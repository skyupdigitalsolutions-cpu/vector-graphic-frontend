import React from "react";

export default function CTASection() {
  return (
    <section className="w-full bg-white">
      <div
        className="flex flex-col items-center justify-center text-center
                      py-[40px] px-[24px]
                      md:py-[60px] md:px-[60px]
                      lg:py-[80px] lg:px-[100px]"
      >
        <h2
          className="text-black leading-[1.3] mb-[12px]
                     text-[22px]
                     md:text-[32px]
                     lg:text-[50px]"
          style={{ fontFamily: "Ultra, serif", fontWeight: "400" }}
        >
          Ready to Elevate Your Packaging?
        </h2>

        <p
          className="text-gray-600 leading-[1.6] mb-[28px]
                     text-[13px] max-w-[320px]
                     md:text-[15px] md:max-w-[520px] md:mb-[36px]
                     lg:text-[16px] lg:max-w-[680px] lg:mb-[40px]"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Drive faster business growth with innovative solutions and strategies
          that deliver real results and long-term success.
        </p>

        <button
          className="bg-[#C92020] hover:bg-[#C92020] transition-colors rounded-full text-white
                     h-[44px] w-[140px] text-[14px]
                     md:h-[52px] md:w-[180px] md:text-[15px]
                     lg:h-[60px] lg:w-[248px] lg:text-[18px]"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: "700" }}
        >
          Let's Talk
        </button>
      </div>
    </section>
  );
}
