import FAQSection from "../Components/FAQSection";
import Footer from "../Components/Footer";
import ContactForm from "../Components/Home/ContactForm";
import FromOurBlog from "../Components/Home/FromOurBlog";
import HeroSection from "../Components/Home/HeroSection";
import OurClient from "../Components/Home/OurClients";
import ServiceSection from "../Components/Home/ServiceSection";
import WorkSection from "../Components/Home/workSection";
import Nav from "../Components/Nav";
import CTASection from "../Components/CTASection";

const homeFaq=[
  {
    q:"What Packaging Design services does Vector Graphics offer?",
    a:"Vector Graphics provides complete Packaging Design Services, including Custom Packaging Design, Product Packaging Design, label design, and Sustainable Packaging Design. Our solutions align with your Brand Identity Design to ensure consistency and strong market presence."
  },
  {
    q:"Why is professional Packaging Design important for my brand?",
    a:"Professional Packaging Design improves shelf appeal, strengthens brand recognition, and influences buying decisions. As a Creative Design Agency, Vector Graphics ensures your packaging reflects your brand values and supports your Corporate Branding Services strategy."
  },
  {
    q:"Do you offer Custom Packaging Design for different industries?",
    a:"Yes. Our Custom Packaging Design solutions are tailored for FMCG, retail, cosmetics, food, and other industries. We create Creative Packaging Solutions that differentiate your product in competitive markets."
  },
  {
    q:"How does Packaging Design support Brand Identity Design?",
    a:"Packaging is a key part of Brand Identity Design. Vector Graphics ensures your logo, color palette, typography, and messaging are consistent across all packaging formats, reinforcing your overall Branding Solutions."
  },
  {
    q:"Can Vector Graphics handle both Logo Design and Packaging Design?",
    a:"Absolutely. As an experienced Logo Design Company and Digital Branding Agency, we integrate logo creation with Product Packaging Design to deliver a cohesive and professional brand appearance."
  },
  {
    q:"Do you provide Sustainable Packaging Design options?",
    a:"Yes. We offer Sustainable Packaging Design that aligns with modern eco-friendly trends while maintaining premium aesthetics and cost efficiency."
  },
  {
    q:"What industries benefit most from your Packaging Design Services?",
    a:"Our Packaging Design Services are ideal for startups, SMEs, and large enterprises looking to enhance product visibility, improve retail impact, and strengthen corporate branding."
  },
  {
    q:"Can you redesign our existing packaging?",
    a:"Yes. Our Rebranding Services include packaging redesign to modernize your product presentation while maintaining brand equity and customer trust."
  },
  {
    q:"How long does a Packaging Design project take?",
    a:"Depending on the complexity, a typical Packaging Design project takes 2–4 weeks. Vector Graphics follows a structured approach including research, concept development, revisions, and final production-ready files."
  },
  {
    q:"Why choose Vector Graphics for Packaging Design?",
    a:"Vector Graphics combines strategic thinking, Creative Packaging Solutions, and Brand Strategy Development to create high-impact packaging that boosts brand recall, improves customer perception, and drives sales growth."
  }
]

export default function Home(){
  return (
    <div className="bg-white">
      <Nav/>
      <HeroSection/>
      <ServiceSection/>
      <WorkSection/>
      <ContactForm/>
      <FromOurBlog/>
      <OurClient/>
      <FAQSection faqs={homeFaq}/>
      <CTASection/>
      <Footer/>
    </div>
  )
}