import WorkHeading from "../Components/Work/WorkHeading";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import WorkImages from "../Components/Work/WorkImages";
import CTASection from "../Components/CTASection";
import FAQSection from "../Components/FAQSection";
import ClientMarquee from "../Components/ClientsMarquee";

const working = [
  {
    q: "What is Artwork Management?",
    a: "Artwork Management is the structured process of organizing, reviewing, updating, and approving design files for packaging and branding. It ensures accuracy, consistency, and compliance across all Packaging Design Services and marketing materials",
  },
  {
    q: "Why is Artwork Management important for packaging projects?",
    a: "Professional Artwork Management prevents costly print errors, ensures brand consistency, and speeds up approvals. It plays a critical role in Product Packaging Design, Brand Packaging Design, and large-scale production workflows.",
  },
  {
    q: "How does Artwork Management support Brand Identity Design?",
    a: "Artwork Management ensures that logos, typography, colors, and layouts follow established Brand Identity Design guidelines. This maintains visual consistency across packaging, labels, and digital assets.",
  },
  {
    q: "Does Artwork Management include packaging compliance checks?",
    a: "Yes. Effective Artwork Management includes regulatory checks, barcode accuracy, label verification, and content alignment especially important for Food Packaging Design, FMCG Packaging Design, and pharmaceutical packaging.",
  },
  {
    q: "How does Artwork Management improve production efficiency?",
    a: "By streamlining file version control and approval workflows, Artwork Management reduces revisions and delays. This supports smooth execution of Custom Packaging Design and high-volume print production.",
  },
  {
    q: "Is Artwork Management useful for rebranding projects?",
    a: "Absolutely. During Rebranding Services, Artwork Management ensures all updated brand elements are correctly implemented across packaging and marketing materials without inconsistencies.",
  },
  {
    q: "What industries benefit from Artwork Management?",
    a: "Industries such as FMCG, retail, cosmetics, pharmaceuticals, and food brands benefit greatly. Accurate Artwork Management strengthens Corporate Branding Services and large-scale packaging operations.",
  },
  {
    q: "How does Artwork Management help maintain brand consistency?",
    a: "Through centralized file control and structured approval systems, Artwork Management ensures all assets align with your Brand Strategy Development and Creative Packaging Solutions.",
  },
  {
    q: "Does Artwork Management include digital asset organization?",
    a: "Yes. In addition to print-ready files, Artwork Management also supports digital asset organization, making it easier for a Digital Branding Agency to maintain unified brand communication.",
  },
  {
    q: "Why choose professional Artwork Management services?",
    a: "Professional Artwork Management minimizes errors, protects brand integrity, ensures regulatory compliance, and supports scalable growth for businesses managing multiple packaging SKUs. ",
  },
];

const Work = () => {
  return (
    <>
      <Nav />
      <WorkHeading />
      <WorkImages />
      <FAQSection faqs={working} />
      <div>
        <ClientMarquee />
        <hr className=" bg-[#767474] h-[1px] w-full" />
        <CTASection subheading="Got a project in mind?" heading="Let’s build together"/>
      </div>
      <Footer />
    </>
  );
};

export default Work;
