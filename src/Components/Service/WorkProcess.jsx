import React from "react";

const steps = [
  {
    number: "01",
    title: "Understanding Your Brand Vision",
    description:
      "We analyze your goals, target audience, and market positioning through detailed discussions and research before starting the creative process.",
  },
  {
    number: "02",
    title: "Crafting Unique Design Concepts",
    description:
      "Our team develops creative and functional design concepts that align with your brand identity and effectively capture customer attention.",
  },
  {
    number: "03",
    title: "Refinement & Quality Testing",
    description:
      "Each design is carefully reviewed and optimized to ensure visual appeal, accuracy, durability, and consistency across all materials.",
  },
  {
    number: "04",
    title: "Final Delivery",
    description:
      "We deliver production-ready files on time, ensuring smooth execution across printing and distribution channels.",
  },
];

const StepRow = ({ number, title, description }) => (
  <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6 lg:flex-row  lg:items-start py-5  border-b border-gray-200 ">
    <div className="flex items-center gap-3 md:w-[240px] md:flex-shrink-0 lg:w-[583px] lg:flex-shrink-0 lg:items-start">
      <span className="text-red-500 font-bold text-[18px] md:text-sm lg:text-[20px] lg:-mt-1 lg:translate-y-[-4px]">
        {number}
      </span>
      <h3
        className="font-semibold text-[18px] font-poppins md:text-sm lg:text-[18px]"
      >
        {title}
      </h3>
    </div>
    <p
      className="text-[#C0C0C0] text-[16px] font-poppins lg:w-[546px]"
      style={{ fontFamily: "poppins" }}
    >
      {description}
    </p>
  </div>
);

export default function WorkProcess() {
  return (
    <section className="bg-black text-white px-6 md:px-10 lg:px-2 py-12 lg:py-16">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl md:text-[32px] lg:text-4xl font-extrabold font-poppins mb-10"
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