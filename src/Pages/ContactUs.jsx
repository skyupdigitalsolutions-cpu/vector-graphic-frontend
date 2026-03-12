import React from "react";
import Nav from "../Components/Nav";
import { C1 } from "../Components/Contact/C1";
import C2 from "../Components/Contact/C2";
import Footer from "../Components/Footer";
import FAQ from "../Components/FAQ";
import CTASection from "../Components/CTASection";

const ContactUs = () => {
  return (
    <>
      <Nav />
      <C1 />
      <C2 />
      <FAQ faqs={[
  {
    question: "What is Brand Packaging Design in Bangalore?",
    answer:
      "Brand Packaging Design in Bangalore involves creating visually appealing and strategically aligned packaging that reflects your brand identity. At Vector Graphics, we combine Custom Packaging Design, Brand Identity Design, and Creative Packaging Solutions to help products stand out in competitive markets.",
  },
  {
    question: "Why is professional Brand Packaging Design important for businesses?",
    answer:
      "Professional Packaging Design Services enhance shelf appeal, build brand recognition, and influence buying decisions. Strong Product Packaging Design improves customer trust and supports overall Corporate Branding Services strategy.",
  },
  {
    question: " Does Vector Graphics offer Custom Packaging Design for different industries?",
    answer:
      "Yes. We provide Custom Packaging Design for food, cosmetics, FMCG, retail, and more. Our Creative Design Agency team ensures every packaging solution aligns with your industry requirements and target audience.",
  },
  {
    question: "How does Brand Packaging Design support Brand Strategy Development?",
    answer:
      "Effective Brand Packaging Design strengthens your Brand Strategy Development by maintaining consistency in colors, typography, messaging, and logo placement. It ensures your packaging communicates your brand story clearly.",
  },
  {
    question: " Do you provide Sustainable Packaging Design in Bangalore?",
    answer:
      "Yes. Vector Graphics offers Sustainable Packaging Design solutions that align with eco-friendly trends while maintaining premium aesthetics and cost efficiency.",
  },
  {
    question: " Can you handle both Logo Design and Packaging Design?",
    answer:
      "Absolutely. As a professional Logo Design Company and Digital Branding Agency, we integrate logo creation with packaging design to deliver cohesive and impactful branding.",
  },
  {
    question: " Do you offer Packaging Redesign and Rebranding Services?",
    answer:
      "Yes. Our Rebranding Services include packaging redesign to modernize your product presentation while preserving brand recognition and customer loyalty.",
  },
   {
    question: " How long does a Brand Packaging Design project take?",
    answer:
      "A typical project takes 2-4 weeks, depending on complexity. Our structured process includes research, concept creation, revisions, and final production-ready artwork.",
  },
   {
    question: "How does Packaging Design improve sales?",
    answer:
      "Strategic Product Packaging Design increases shelf visibility, creates emotional appeal, and enhances perceived value leading to higher conversions and stronger brand recall.",
  },
   {
    question: " Why choose Vector Graphics for Brand Packaging Design in Bangalore?",
    answer:
      "Vector Graphics combines strategic thinking, Creative Packaging Solutions, and expert Artwork Management to deliver packaging that builds brand authority and drives measurable growth.",
  },
     ] }/>
     <CTASection heading="Let’s build your brand’s success together." subheading="Start your brand’s growth journey with innovative strategies and expert support."/>
      <Footer />
    </>
  );
};

export default ContactUs;
