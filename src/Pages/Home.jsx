import React, { useState } from "react";
import HH6 from "../Components/Home/HH6";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import OurWork from "../Components/Home/OurWork";
import ThoughtsSection from "../Components/Home/HomeThoughts";
import CTASection from "../Components/CTASection";
import A5 from "../Components/About/A5";
import Card from "../Components/Home/Card";
import ServicesSection from "../Components/ServicesSection";
import FAQ from "../Components/FAQ";
import { SubBlogPage } from "../Components/Thoughts/SubBlogPage";
import Cloudy from "../Components/Home/HH6";

const Home = () => {
  const [activeBlogId, setActiveBlogId] = useState(null);

  if (activeBlogId) {
    return (
      <>
        <Nav />
        <SubBlogPage
          blogId={activeBlogId}
          onBack={() => {
            setActiveBlogId(null);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="py-[50px] px-[18px] lg:py-[60px] lg:px-[241px] text-center">
        <h3 className="text-[14px] lg:text-[20px] font-poppins">
          Premium Packaging Designs Agency in India
        </h3>
        <h2 className="text-[18px] lg:text-[50px] font-ultra pt-[12px]">
          We Build Packaging Designs That Convert - Proven Results.
        </h2>
      </div>
       <div className="w-full">
        <img
          src="/images/hero_banner_1.webp"
          alt="Food Packaging Design"
          className="w-full h-[250px] md:h-[400px] lg:h-[600px] object-cover"
        />
      </div>

      <Card />
      <ServicesSection />
      <OurWork />
      <ThoughtsSection
        onBlogClick={(id) => {
          setActiveBlogId(id);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
      <A5 />
      {/* <Cloudy  /> */}
      <FAQ
        faqs={[
          {
            question:
              "What Packaging Design services does Vector Graphics offer?",
            answer:
              "Vector Graphics provides complete Packaging Design Services, including Custom Packaging Design, Product Packaging Design, label design, and Sustainable Packaging Design. Our solutions align with your Brand Identity Design to ensure consistency and strong market presence.",
          },
          {
            question:
              " Why is professional Packaging Design important for my brand?",
            answer:
              "Professional Packaging Design improves shelf appeal, strengthens brand recognition, and influences buying decisions. As a Creative Design Agency, Vector Graphics ensures your packaging reflects your brand values and supports your Corporate Branding Services strategy.",
          },
          {
            question:
              "Do you offer Custom Packaging Design for different industries?",
            answer:
              "Yes. Our Custom Packaging Design solutions are tailored for FMCG, retail, cosmetics, food, and other industries. We create Creative Packaging Solutions that differentiate your product in competitive markets.",
          },
          {
            question:
              " How does Packaging Design support Brand Identity Design?",
            answer:
              "Packaging is a key part of Brand Identity Design. Vector Graphics ensures your logo, color palette, typography, and messaging are consistent across all packaging formats, reinforcing your overall Branding Solutions.",
          },
          {
            question:
              "Can Vector Graphics handle both Logo Design and Packaging Design?",
            answer:
              "Absolutely. As an experienced Logo Design Company and Digital Branding Agency, we integrate logo creation with Product Packaging Design to deliver a cohesive and professional brand appearance.",
          },
          {
            question: " Do you provide Sustainable Packaging Design options?",
            answer:
              "Yes. We offer Sustainable Packaging Design that aligns with modern eco-friendly trends while maintaining premium aesthetics and cost efficiency.",
          },
          {
            question:
              " What industries benefit most from your Packaging Design Services?",
            answer:
              "Our Packaging Design Services are ideal for startups, SMEs, and large enterprises looking to enhance product visibility, improve retail impact, and strengthen corporate branding.",
          },
          {
            question: "Can you redesign our existing packaging?",
            answer:
              "Yes. Our Rebranding Services include packaging redesign to modernize your product presentation while maintaining brand equity and customer trust.",
          },
          {
            question: "How long does a Packaging Design project take?",
            answer:
              "Depending on the complexity, a typical Packaging Design project takes 2–4 weeks. Vector Graphics follows a structured approach including research, concept development, revisions, and final production-ready files.",
          },
          {
            question: "Why choose Vector Graphics for Packaging Design?",
            answer:
              "Vector Graphics combines strategic thinking, Creative Packaging Solutions, and Brand Strategy Development to create high-impact packaging that boosts brand recall, improves customer perception, and drives sales growth.",
          },
        ]}
      />
      <CTASection />
      <Footer />
    </>
  );
};

export default Home;
