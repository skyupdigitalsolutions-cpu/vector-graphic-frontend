import React from "react";

const steps = [
  {
    number: "01",
    title: "Discussion of the Idea",
    description:
      "We understand your goals, requirements, and brand vision through detailed discussion and research before starting the creative work.",
  },
  {
    number: "02",
    title: "Handcrafting Templates",
    description:
      "Our team creates structured design concepts and custom templates aligned with your brand and project objectives.",
  },
  {
    number: "03",
    title: "Testing for Perfection",
    description:
      "Each design is carefully reviewed and refined to ensure accuracy, quality, and visual consistency across all outputs.",
  },
  {
    number: "04",
    title: "Final Delivery",
    description:
      "We deliver ready-to-use, production-quality files on time, ensuring smooth implementation across digital and print platforms.",
  },
];

const StepRow = ({ number, title, description }) => (
  <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6 lg:flex-row  lg:items-start py-5  border-b border-gray-200 ">
    <div className="flex items-center gap-3 md:w-[240px] md:flex-shrink-0 lg:w-[583px] lg:flex-shrink-0 lg:items-start">
      <span className="text-red-500 font-bold text-[18px] md:text-sm lg:text-base lg:-mt-1 lg:translate-y-[-4px]">
        {number}
      </span>
      <h3
        className="font-bold text-gray-900 text-[18px] md:text-sm lg:text-base"
        style={{ fontFamily: "unbounded" }}
      >
        {title}
      </h3>
    </div>
    <p
      className="text-gray-500 text-[16px] font-poppins lg:w-[546px]"
      style={{ fontFamily: "poppins" }}
    >
      {description}
    </p>
  </div>
);

export default function WorkProcess() {
  return (
    <section className="bg-white px-6 md:px-10 lg:px-2 py-12 lg:py-16">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl md:text-[32px] lg:text-4xl font-extrabold text-gray-900 mb-10"
          style={{ fontFamily: "ultra" }}
        >
          Our Work Process
        </h2>
        <div className="border-t border-gray-200">
          {steps.map((step) => (
            <StepRow key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}