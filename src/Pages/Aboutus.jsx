import Footer from "../Components/Footer";
import HeroSection from "../Components/Home/HeroSection";
import A1 from "../Components/About/A1";
import Nav from "../Components/Nav";
import A2 from "../Components/About/A2";
import AgencySection from "../Components/About/AgencySection";
import FAQ from "../Components/FAQ";
import ContactForm from "../Components/Home/ContactForm";
import AboutWorkSection from "../Components/About/AboutWorkSection";
import CTASection from "../Components/CTASection";
import LeadingAgency from "../Components/About/LeadingAgency";
import OurClient from "../Components/Home/OurClients";
import FAQSection from "../Components/FAQSection";

const Aboutfaqs = [
  {
    q: "What Branding Solutions does Vector Graphics offer?",
    a: "Vector Graphics provides complete Branding Solutions, including Brand Identity Design, Logo Design, Corporate Branding Services, Packaging Design Services, and Digital Branding strategies. Our goal is to create strong, consistent, and growth-driven brand systems.",
  },
  {
    q: " How do Branding Solutions improve brand identity?",
    a: "Professional Branding Solutions combine Brand Strategy Development with creative execution. At Vector Graphics, we design cohesive visual identities, messaging frameworks, and brand guidelines that strengthen recognition and trust.",
  },
  {
    q: "Is Vector Graphics a Logo Design Company or a full Branding Agency?",
    a: "Vector Graphics is more than a Logo Design Company. We are a Creative Design Agency offering complete Branding Solutions, including brand positioning, corporate branding, packaging, and digital brand assets.",
  },
  {
    q: " Do you provide Corporate Branding Services for established businesses?",
    a: "Yes. Our Corporate Branding Services help businesses refine their positioning, improve brand consistency, and enhance professional credibility across digital and offline platforms.",
  },
  {
    q: " Can Branding Solutions help with Packaging Design?",
    a: "Absolutely. Our Packaging Design Services are integrated into our Branding Solutions to ensure your product packaging aligns with your brand identity and increases shelf appeal.",
  },
  {
    q: " Do you offer Rebranding Services?",
    a: "Yes. Vector Graphics provides strategic Rebranding Services for businesses looking to modernize their image, reposition in the market, or improve brand perception.",
  },
  {
    q: "How does Brand Strategy Development impact business growth?",
    a: "Strong Brand Strategy Development ensures your brand communicates a clear value proposition. Our Branding Solutions align business goals with customer expectations to drive measurable growth.",
  },
  {
    q: " Are your Branding Solutions suitable for startups?",
    a: "Yes. Startups benefit greatly from structured Branding Solutions, including brand identity design, logo creation, and digital branding support, helping them establish authority from the beginning.",
  },
  {
    q: " What makes Vector Graphics different from other Digital Branding Agencies?",
    a: "Unlike many agencies, Vector Graphics combines strategic thinking with creative excellence. Our Branding Solutions focus on performance, consistency, and long-term scalability.",
  },
  {
    q: " How can I start Branding Solutions with Vector Graphics?",
    a: "You can begin with a consultation where our team evaluates your brand presence and recommends tailored Branding Solutions designed to strengthen visibility, credibility, and growth.",
  },
];

export default function AboutUs() {
  return (
    <>
      <Nav />
      <div className="flex flex-col justify-center items-center mx-auto font-poppins px-[20px] py-[30px] lg:w-[958px] lg:py-[60px] text-center">
        <h4 className="h4 text-[14px] lg:text-[20px] font-medium">
          Powered by 20+ Years of Creative Design Experience
        </h4>
        <h1 className="h1 font-extrabold text-[20px] lg:text-[50px] lg:w-[797px]">
          Trusted branding partner To build
          <span className="text-[#C92020]"> Impactful Brands. </span>
        </h1>
      </div>
      <A1 />
      <LeadingAgency />
      <AboutWorkSection />
      <A2 />
      <ContactForm />
      <AgencySection />
      <OurClient />
      <FAQSection faqs={Aboutfaqs} />
      <CTASection
        subheading="Let’s Create Something Impactful"
        heading="Contact Us Today"
      />
      <Footer />
    </>
  );
}
