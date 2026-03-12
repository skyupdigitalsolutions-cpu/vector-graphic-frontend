import { useState } from "react";

const defaultFaqs = [
  {
    question: "What Branding Solutions does Vector Graphics offer?",
    answer:
      "Vector Graphics provides complete Branding Solutions, including Brand Identity Design, Logo Design, Corporate Branding Services, Packaging Design Services, and Digital Branding strategies. Our goal is to create strong, consistent, and growth-driven brand systems.",
  },
  {
    question: "Why is professional Packaging Design important for my brand?",
    answer:
      "Professional Packaging Design improves shelf appeal, strengthens brand recognition, and influences buying decisions. As a Creative Design Agency, Vector Graphics ensures your packaging reflects your brand values and supports your Corporate Branding Services strategy.",
  },
  {
    question: "Do you offer Custom Packaging Design for different industries?",
    answer:
      "Yes. Our Custom Packaging Design solutions are tailored for FMCG, retail, cosmetics, food, and other industries. We create Creative Packaging Solutions that differentiate your product in competitive markets.",
  },
  {
    question: "How does Packaging Design support Brand Identity Design?",
    answer:
      "Packaging is a key part of Brand Identity Design. Vector Graphics ensures your logo, color palette, typography, and messaging are consistent across all packaging formats, reinforcing your overall Branding Solutions.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We work across a wide range of industries including FMCG, retail, hospitality, technology, healthcare, and fashion. Our team adapts its design approach to match the unique demands of each sector.",
  },
  {
    question: "How long does a branding project typically take?",
    answer:
      "Project timelines vary depending on scope. A logo design can take 1-2 weeks, while a full Brand Identity system may take 4–8 weeks. We provide a detailed timeline at the start of every engagement.",
  },
  {
    question: "Do you provide brand guidelines after the project?",
    answer:
      "Yes. Every branding project includes a comprehensive Brand Guidelines document covering logo usage, color palette, typography, tone of voice, and application examples to ensure consistency across all touchpoints.",
  },
];

export default function FAQ({
  title = "FAQ's",
  faqs = defaultFaqs,
  initialCount = 4,
  buttonLabel = "For More Questions",
  collapsedLabel = "Show Less",
}) {
  const [showAll, setShowAll] = useState(false);

  const hasMore = faqs.length > initialCount;
  const visibleFaqs = showAll ? faqs : faqs.slice(0, initialCount);

  return (
    <section className="bg-[#f0f0f0] min-h-screen rounded-2xl lg:rounded-none my-3 mx-2 lg:mx-0 px-4 py-16 sm:px-8 md:px-16 lg:px-24">
      {/* Title */}
      <h2 className="text-center font-bold font-unbounded text-4xl lg:text-[50px] tracking-tight text-[#C92020] lg:mb-14">
        {title}
      </h2>

      {/* FAQ Items */}
      <div className="max-w-[1250px] mx-auto">
        {visibleFaqs.map((faq, index) => (
          <FAQItem
            key={index}
            index={index + 1}
            question={faq.question}
            answer={faq.answer}
            isNew={showAll && index >= initialCount}
          />
        ))}
      </div>

      {/* CTA Button — only shown if there are more than initialCount questions */}
      {hasMore && (
        <div className="flex justify-center mt-2">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className=" rounded-xl px-[13.5px] py-[8px] lg:py-[16px] lg:px-[32px] text-[#C92020] border-2 border-[#C92020] bg-white text-[16px] lg:text-[18px] font-poppins hover:shadow-xl"
          >
            {showAll ? collapsedLabel : buttonLabel}
          </button>
        </div>
      )}
    </section>
  );
}

function FAQItem({ index, question, answer, isNew }) {
  return (
    <div style={isNew ? { animation: "faqFadeIn 0.4s ease forwards" } : {}}>
      <style>{`
        @keyframes faqFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Desktop layout */}
      <div className="hidden md:grid md:grid-cols-[80px_1.2fr_1.2fr] md:gap-3 md:items-start py-8 sm:py-10">
        <span className="text-7xl font-bold text-[#E5E5EA] font-inter relative -top-3">
          {index}
        </span>
        <p className="font-bold font-unbounded text-gray-900 lg:text-[18px] leading-snug pr-4">
          {question}
        </p>
        <p className="font-poppins text-[#000000] text-[15px] leading-relaxed">
          {answer}
        </p>
        <div className="relative left-20" style={{ width:"375px", height: "3px", backgroundColor: "#ffffff" }} />
      </div>

      {/* Mobile layout */}
      <div className="md:hidden grid grid-cols-[20px_1fr] gap-4 items-start py-3">
        <span className="text-[35px] font-black font-inter text-[#E5E5EA] relative -top-2">
          {index}
        </span>
        <div>
          <p className="font-bold text-[#000000] font-unbounded text-sm mb-3">
            {question}
          </p>
          <p className="text-[#000000] font-poppins text-[12px] ">{answer}<div className="w-full h-[2px] bg-white mt-3" /></p>
        </div>
        {/* <div className="relative left-10" style={{ width:"295px", height: "2px", backgroundColor: "#ffffff" }} /> */}
      </div>
      
    </div>
  );
}