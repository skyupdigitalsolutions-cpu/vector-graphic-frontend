import React from "react";
import WorkHeading from "../Components/Work/WorkHeading";
import WorkImage from "../Components/WorkImage";
import WorkCTA from "../Components/Work/WorkCTA";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Cloudy from "../Components/Work/Cloudy";
import FAQ from "../Components/FAQ";
import WorkImages from "../Components/Work/WorkImages";
import CTASection from "../Components/CTASection";
const Work = () => {
  return (
    <>
      <Nav />
      <WorkHeading />
      <WorkImages />
      <Cloudy />
      <FAQ
        faqs={[
          {
            question: "What is Artwork Management?",
            answer:
              "Artwork Management is the structured process of organizing, reviewing, updating, and approving design files for packaging and branding. It ensures accuracy, consistency, and compliance across all Packaging Design Services and marketing materials",
          },
          {
            question: "Why is Artwork Management important for packaging projects?",
            answer:
              "Professional Artwork Management prevents costly print errors, ensures brand consistency, and speeds up approvals. It plays a critical role in Product Packaging Design, Brand Packaging Design, and large-scale production workflows.",
          },
          {
            question: "How does Artwork Management support Brand Identity Design?",
            answer:
              "Artwork Management ensures that logos, typography, colors, and layouts follow established Brand Identity Design guidelines. This maintains visual consistency across packaging, labels, and digital assets.",
          },
          {
            question: "Does Artwork Management include packaging compliance checks?",
            answer:
              "Yes. Effective Artwork Management includes regulatory checks, barcode accuracy, label verification, and content alignment especially important for Food Packaging Design, FMCG Packaging Design, and pharmaceutical packaging.",
          },
          {
            question: "How does Artwork Management improve production efficiency?",
            answer:
              "By streamlining file version control and approval workflows, Artwork Management reduces revisions and delays. This supports smooth execution of Custom Packaging Design and high-volume print production.",
          },
          {
            question: "Is Artwork Management useful for rebranding projects?",
            answer:
              "Absolutely. During Rebranding Services, Artwork Management ensures all updated brand elements are correctly implemented across packaging and marketing materials without inconsistencies.",
          },
          {
            question: "What industries benefit from Artwork Management?",
            answer:
              "Industries such as FMCG, retail, cosmetics, pharmaceuticals, and food brands benefit greatly. Accurate Artwork Management strengthens Corporate Branding Services and large-scale packaging operations.",
          },
          {
            question: "How does Artwork Management help maintain brand consistency?",
            answer:
              "Through centralized file control and structured approval systems, Artwork Management ensures all assets align with your Brand Strategy Development and Creative Packaging Solutions.",
          },
          {
            question: "Does Artwork Management include digital asset organization?",
            answer:
              "Yes. In addition to print-ready files, Artwork Management also supports digital asset organization, making it easier for a Digital Branding Agency to maintain unified brand communication.",
          },
          {
            question: "Why choose professional Artwork Management services?",
            answer:
              "Professional Artwork Management minimizes errors, protects brand integrity, ensures regulatory compliance, and supports scalable growth for businesses managing multiple packaging SKUs. ",
          },
        ]}
      />
      <CTASection heading="Find out how our team can help your brand grow" subheading="" />
      <Footer />
    </>
  );
};

export default Work;
