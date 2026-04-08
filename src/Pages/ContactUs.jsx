import Nav from "../Components/Nav";
import { C1 } from "../Components/Contact/C1";
import C2 from "../Components/Contact/C2";
import Footer from "../Components/Footer";
import CTASection from "../Components/CTASection";
import FAQSection from "../Components/FAQSection";

const ContactUs = () => {
  return (
    <>
      <Nav />
      <C1 />
      <C2 />
      <FAQSection
        faqs={[
          {
            q: "What is Brand Packaging Design in Bangalore?",
            a:
              "Brand Packaging Design in Bangalore involves creating visually appealing and strategically aligned packaging that reflects your brand identity. At Vector Graphics, we combine Custom Packaging Design, Brand Identity Design, and Creative Packaging Solutions to help products stand out in competitive markets.",
          },
          {
            q:
              "Why is professional Brand Packaging Design important for businesses?",
            a:
              "Professional Packaging Design Services enhance shelf appeal, build brand recognition, and influence buying decisions. Strong Product Packaging Design improves customer trust and supports overall Corporate Branding Services strategy.",
          },
          {
            q:
              " Does Vector Graphics offer Custom Packaging Design for different industries?",
            a:
              "Yes. We provide Custom Packaging Design for food, cosmetics, FMCG, retail, and more. Our Creative Design Agency team ensures every packaging solution aligns with your industry requirements and target audience.",
          },
          {
            q:
              "How does Brand Packaging Design support Brand Strategy Development?",
            a:
              "Effective Brand Packaging Design strengthens your Brand Strategy Development by maintaining consistency in colors, typography, messaging, and logo placement. It ensures your packaging communicates your brand story clearly.",
          },
          {
            q:
              " Do you provide Sustainable Packaging Design in Bangalore?",
            a:
              "Yes. Vector Graphics offers Sustainable Packaging Design solutions that align with eco-friendly trends while maintaining premium aesthetics and cost efficiency.",
          },
          {
            q: " Can you handle both Logo Design and Packaging Design?",
            a:
              "Absolutely. As a professional Logo Design Company and Digital Branding Agency, we integrate logo creation with packaging design to deliver cohesive and impactful branding.",
          },
          {
            q:
              " Do you offer Packaging Redesign and Rebranding Services?",
            a:
              "Yes. Our Rebranding Services include packaging redesign to modernize your product presentation while preserving brand recognition and customer loyalty.",
          },
          {
            q: " How long does a Brand Packaging Design project take?",
            a:
              "A typical project takes 2-4 weeks, depending on complexity. Our structured process includes research, concept creation, revisions, and final production-ready artwork.",
          },
          {
            q: "How does Packaging Design improve sales?",
            a:
              "Strategic Product Packaging Design increases shelf visibility, creates emotional appeal, and enhances perceived value leading to higher conversions and stronger brand recall.",
          },
          {
            q:
              " Why choose Vector Graphics for Brand Packaging Design in Bangalore?",
            a:
              "Vector Graphics combines strategic thinking, Creative Packaging Solutions, and expert Artwork Management to deliver packaging that builds brand authority and drives measurable growth.",
          },
        ]}
      />
      <CTASection heading="Brand’s success together." subheading="Let’s build your"/>
      <Footer />
    </>
  );
};

export default ContactUs;
