import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import A1 from "../Components/About/A1";
import A2 from "../Components/About/A2";
import A4 from "../Components/About/A4";
import A3 from "../Components/About/A3";
import A5 from "../Components/About/A5";
import FAQ from "../Components/FAQ";
import CTASection from "../Components/CTASection";


export default function AboutUs() {
  return (
    <>
      <Nav />
      <div className="py-[50px] px-[18px] lg:py-[60px] lg:px-[241px] text-center">
        <h3 className="text-[14px] lg:text-[20px] font-poppins">We Collaborate As Your Trusted Branding Partner</h3>
        <h2 className="text-[18px] lg:text-[50px] font-ultra pt-[12px]">To Build Impactful Brands.</h2>
      </div>
      <A1 />
      <A2 />
      <A3 />
      <A4 />
      <A5 />
      <FAQ faqs={[
  {
    question: "What Branding Solutions does Vector Graphics offer?",
    answer:
      "Vector Graphics provides complete Branding Solutions, including Brand Identity Design, Logo Design, Corporate Branding Services, Packaging Design Services, and Digital Branding strategies. Our goal is to create strong, consistent, and growth-driven brand systems.",
  },
  {
    question: " How do Branding Solutions improve brand identity?",
    answer:
      "Professional Branding Solutions combine Brand Strategy Development with creative execution. At Vector Graphics, we design cohesive visual identities, messaging frameworks, and brand guidelines that strengthen recognition and trust.",
  },
  {
    question: "Is Vector Graphics a Logo Design Company or a full Branding Agency?",
    answer:
      "Vector Graphics is more than a Logo Design Company. We are a Creative Design Agency offering complete Branding Solutions, including brand positioning, corporate branding, packaging, and digital brand assets.",
  },
  {
    question: " Do you provide Corporate Branding Services for established businesses?",
    answer:
      "Yes. Our Corporate Branding Services help businesses refine their positioning, improve brand consistency, and enhance professional credibility across digital and offline platforms.",
  },
  {
    question: " Can Branding Solutions help with Packaging Design?",
    answer:
      "Absolutely. Our Packaging Design Services are integrated into our Branding Solutions to ensure your product packaging aligns with your brand identity and increases shelf appeal.",
  },
  {
    question: " Do you offer Rebranding Services?",
    answer:
      "Yes. Vector Graphics provides strategic Rebranding Services for businesses looking to modernize their image, reposition in the market, or improve brand perception.",
  },
  {
    question: "How does Brand Strategy Development impact business growth?",
    answer:
      "Strong Brand Strategy Development ensures your brand communicates a clear value proposition. Our Branding Solutions align business goals with customer expectations to drive measurable growth.",
  },
   {
    question: " Are your Branding Solutions suitable for startups?",
    answer:
      "Yes. Startups benefit greatly from structured Branding Solutions, including brand identity design, logo creation, and digital branding support, helping them establish authority from the beginning.",
  },
   {
    question: " What makes Vector Graphics different from other Digital Branding Agencies?",
    answer:
      "Unlike many agencies, Vector Graphics combines strategic thinking with creative excellence. Our Branding Solutions focus on performance, consistency, and long-term scalability.",
  },
   {
    question: " How can I start Branding Solutions with Vector Graphics?",
    answer:
      "You can begin with a consultation where our team evaluates your brand presence and recommends tailored Branding Solutions designed to strengthen visibility, credibility, and growth.",
  },
     ] }
      />
      <CTASection heading="Partner with us to take your brand to the next level." subheading="Let’s work together to elevate your brand and unlock new growth opportunities.
"/>
      <Footer />
    </>
  );
}
