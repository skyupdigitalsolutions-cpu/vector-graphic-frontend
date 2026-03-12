import React from "react";

const WorkHeading = () => {
  return (
    <div className="sm:mx-[41px]">
      <h1
        className="px-4 mt-4 md:pr-[60px] md:pl-[40px] lg:px-[129px] text-[20px] md:text-[35px] lg:text-[50px] mb-[12px] md:mb-[16px] lg:mb-[20px] lg:mt-[50px] font-ultra"
        style={{
          letterSpacing: "0%",
          fontWeight: "400",
          color: "#111111",
          textAlign: "center",
          lineHeight: "1.25",
        }}
      >
        Our Artwork Management and work speak through precision, creativity, and real results.

      </h1>
      <p
        className="px-[20px] sm:px-[40px] md:px-[30px] lg:px-[156px] pt-[16px] sm:pt-[20px] lg:pt-[20px]  lg:mb-[61px] font-poppins text-[14px] lg:text-[16px]"
        style={{
          letterSpacing: "0%",
          fontWeight: "400",
          color: "#767676",
          textAlign: "center",
          lineHeight: "1.6",
        }}
      >
       Our Artwork Management services ensure accuracy, consistency, and brand compliance while delivering creative designs that enhance visual impact and drive measurable business results.

      </p>
    </div>
  );
};

export default WorkHeading;
