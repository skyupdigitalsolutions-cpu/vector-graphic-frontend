import React from "react";
import Nav from "../Components/Nav";
import HeroSection from "../Components/Service/Herosection";
import Imagesection from "../Components/Service/Imagesection";
import ServicesSection from "../Components/ServicesSection";
import WorkProcess from "../Components/Service/WorkProcess";
import ServiceExpertise from "../Components/Service/ServiceExpertise";
import CTASection from "../Components/CTASection";
import Footer from "../Components/Footer";
import { HeroCarousel } from "../Components/HeroCaraousel";
import FAQ from "../Components/FAQ";

const Services = () => {
  return (
    <>
      <Nav />
      <div className="py-[50px] px-[18px] lg:py-[60px] lg:px-[200px] text-center">
        <h3 className="lg:text-[20px] font-poppins">
          Leading Food Packaging Design Company In India
        </h3>
        <h2 className="text-[18px] lg:text-[50px] font-ultra pt-[12px]">
          Food Packaging Design Agency That Delivers Sales-Driven Results
        </h2>
      </div>
      {/* Hero Image */}
      <div className="w-full">
        <img
          src="/images/hero_banner_1.webp"
          alt="Food Packaging Design"
          className="w-full h-[250px] md:h-[400px] lg:h-[600px] object-cover"
        />
      </div>
      <HeroSection />
      <Imagesection />
      <ServicesSection />
      <WorkProcess />
      <ServiceExpertise />
      <FAQ
        faqs={[
          {
            question: "What is Food Packaging Design and why is it important?",
            answer:
              "Food Packaging Design is the process of creating visually appealing and functional packaging for food products. It combines Product Packaging Design, branding, and compliance to attract customers, build trust, and increase shelf visibility in competitive retail markets.",
          },
          {
            question: "Do you offer Custom Food Packaging Design?",
            answer:
              "Yes. We provide Custom Packaging Design tailored to your product type, target audience, and market positioning. Our Creative Packaging Solutions ensure your packaging stands out while maintaining brand consistency.",
          },
          {
            question: " How does Food Packaging Design improve sales?",
            answer:
              "Strategic Food Packaging Design Services enhance shelf appeal, communicate product benefits clearly, and create emotional connection. High-impact Brand Packaging Design directly influences buying decisions and boosts conversions.",
          },
          {
            question: "Do you provide Sustainable Food Packaging Design?",
            answer:
              "Absolutely. We offer Sustainable Packaging Design and Eco-Friendly Packaging Solutions that align with modern consumer expectations while maintaining durability and visual appeal.",
          },
          {
            question: "Can you help with Food Label Design and compliance?",
            answer:
              "Yes. Our team ensures accurate Food Label Design, including nutritional information layout, barcode placement, and regulatory compliance as part of our complete Packaging Design Services.",
          },
          {
            question: "Do you handle packaging for different food industries?",
            answer:
              "We specialize in FMCG Packaging Design, snack packaging, beverage packaging, organic food packaging, frozen food packaging, and more. Our solutions are customized for each food segment.",
          },
          {
            question: "Is Food Packaging Design part of Branding Solutions?",
            answer:
              "Yes. Food Packaging Design plays a crucial role in Brand Identity Design and Corporate Branding Services. We ensure your packaging reflects your logo, brand colors, typography, and overall brand strategy.",
          },
          {
            question: "Do you offer Packaging Redesign Services?",
            answer:
              "Yes. If your current packaging looks outdated or underperforms, we provide Packaging Redesign Services to modernize",
          },
          {
            question:
              "What makes your Food Packaging Design services different?",
            answer:
              "Our approach combines Brand Strategy Development, creative innovation, and Artwork Management to deliver market-ready packaging that balances aesthetics, compliance, and sales performance.",
          },
          {
            question: "How long does a Food Packaging Design project take?",
            answer:
              "Typically, a Food Packaging Design project takes 2-4 weeks depending on complexity, product range, and approval stages. We follow a structured process from research to final production-ready files.",
          },
        ]}
      />
      <CTASection
        heading="Unlock your brand’s full potential with our team."
        subheading="Boost your brand growth with expert strategies, creative solutions, and a dedicated team."
      />
      <Footer />
    </>
  );
};

export default Services;
