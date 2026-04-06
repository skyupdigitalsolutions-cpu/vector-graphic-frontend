import Nav from "../Components/Nav";
import WorkProcess from "../Components/Service/WorkProcess";
import Footer from "../Components/Footer";
import ContactForm from "../Components/Home/ContactForm";
import Packaging from "../Components/Service/Packaging";
import FAQSection from "../Components/FAQSection";
import { a, q } from "framer-motion/client";
import ClientMarquee from "../Components/ClientsMarquee";
import CTASection from "../Components/CTASection";

const enquire = [
  {
    q: "What is Food Packaging Design and why is it important?",
    a: "Food Packaging Design is the process of creating visually appealing and functional packaging for food products. It combines Product Packaging Design, branding, and compliance to attract customers, build trust, and increase shelf visibility in competitive retail markets.",
  },
  {
    q: "Do you offer Custom Food Packaging Design?",
    a: "Yes. We provide Custom Packaging Design tailored to your product type, target audience, and market positioning. Our Creative Packaging Solutions ensure your packaging stands out while maintaining brand consistency.",
  },
  {
    q: "How does Food Packaging Design improve sales?",
    a: "Strategic Food Packaging Design Services enhance shelf appeal, communicate product benefits clearly, and create emotional connection. High-impact Brand Packaging Design directly influences buying decisions and boosts conversions.",
  },
  {
    q: "Do you provide Sustainable Food Packaging Design?",
    a: "Absolutely. We offer Sustainable Packaging Design and Eco-Friendly Packaging Solutions that align with modern consumer expectations while maintaining durability and visual appeal.",
  },
  {
    q: "Can you help with Food Label Design and compliance?",
    a: "Yes. Our team ensures accurate Food Label Design, including nutritional information layout, barcode placement, and regulatory compliance as part of our complete Packaging Design Services.",
  },
  {
    q: "Do you handle packaging for different food industries?",
    a: "We specialize in FMCG Packaging Design, snack packaging, beverage packaging, organic food packaging, frozen food packaging, and more. Our solutions are customized for each food segment.",
  },
  {
    q: "Is Food Packaging Design part of Branding Solutions?",
    a: "Yes. Food Packaging Design plays a crucial role in Brand Identity Design and Corporate Branding Services. We ensure your packaging reflects your logo, brand colors, typography, and overall brand strategy.",
  },
  {
    q: "Do you offer Packaging Redesign Services?",
    a: "Yes. If your current packaging looks outdated or underperforms, we provide Packaging Redesign Services to modernize your appearance and improve shelf impact without losing brand recognition.",
  },
  {
    q: "What makes your Food Packaging Design services different?",
    a: "Our approach combines Brand Strategy Development, creative innovation, and Artwork Management to deliver market-ready packaging that balances aesthetics, compliance, and sales performance.",
  },
  {
    q: "How long does a Food Packaging Design project take?",
    a: "Typically, a Food Packaging Design project takes 2-4 weeks depending on complexity, product range, and approval stages. We follow a structured process from research to final production-ready files.",
  },
];

const experience = [
  [
    {
      icon: "/images/experience_1.svg",
      title: "Food",
    },
    {
      icon: "/images/dry.svg",
      title: "Spice",
    },
    {
      icon: "/images/headphones.svg",
      title: "Electronics",
    },
    {
      icon: "/images/grocery.svg",
      title: "Dairy Products",
    },
  ],
  [
    {
      icon: "/images/fastfood.svg",
      title: "FMCG",
    },
    {
      icon: "/images/fragrance.svg",
      title: "Cosmetics",
    },
    {
      icon: "/images/fluid_med.svg",
      title: "Pharmaceutical",
    },
    {
      icon: "/images/pill.svg",
      title: "Medical",
    },
  ],
  [
    {
      icon: "/images/avocado_bean.svg",
      title: "Dry Fruits",
    },
    {
      icon: "/images/liquor.svg",
      title: "Beverages",
    },
    {
      icon: "/images/frozen_food.svg",
      title: "Frozen Food",
    },
    {
      icon: "/images/automob.svg",
      title: "Automobile",
    },
  ],
];
const Services = () => {
  return (
    <>
      <Nav />
      <div className="flex flex-col justify-center items-center mx-auto font-poppins lg:w-[958px] py-[30px] lg:py-[60px] text-center">
        <h4 className="h4  text-[14px] lg:text-[20px] font-medium">
          LEADING FOOD PACKAGING DESIGN COMPANY IN INDIA
        </h4>
        <h1 className="h1 font-extrabold text-[20px] lg:text-[50px] py-2 px-3 lg:!px-0 lg:w-[910px]">
         Food Packaging Design Agency that delivers
          <span className="text-[#C92020]"> Sales-Driven Results.</span>
        </h1>
      </div>
      {/* Hero Image */}
      <div className="w-full flex justify-center items-center">
        <img
          src="/images/service_banner_1.webp"
          alt="Food Packaging Design"
          className="w-full lg:w-[1295px] lg:h-[659px]"
        />
      </div>
      <div className="py-[30px] lg:py-[90px] font-poppins">
        <div className="flex flex-col lg:flex-row lg:gap-24 lg:px-[80px]">
          <div className="hidden lg:block font-extrabold text-[20px] lg:text-[50px] px-3 lg:!px-0 lg:w-[504px]">
            Experience of over 20+ years & 2000+ business served in:
          </div>
          <div className="flex lg:gap-44 py-3">
            <div className="px-4">
              <div className="text-[30px] lg:text-[70px] text-[#FF3535] font-extrabold">
                2005
              </div>
              <p className="text-[14px] lg:text-[16px]">
                Established over two decades ago
              </p>
            </div>
            <div className="px-3">
              <div className="text-[30px] lg:text-[70px] text-[#FF3535] font-extrabold">
                2K
              </div>
              <p className="text-[14px] lg:text-[16px]">
                Over 2000+ business served
              </p>
            </div>
          </div>
        </div>
        <div className="block lg:hidden font-extrabold text-[20px] lg:text-[50px] px-3 lg:!px-0 lg:w-[504px]">
          Experience of over 20+ years & 2000+ business served in:
        </div>
        <div className="mt-[30px] w-full px-6 lg:px-[80px]">
          {experience.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 mb-8"
            >
              {row.map((item, i) => (
                <div key={i} className="flex items-center gap-2 lg:!gap-3">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-[30px] h-[30px] lg:w-[50px] lg:h-[50px] object-contain flex-shrink-0"
                  />
                  <span className=" text-[14px] lg:text-[18px] font-medium ">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <WorkProcess />
      <ContactForm />
      <Packaging />
      <ClientMarquee />
      <FAQSection faqs={enquire} />
        <CTASection/>
      <Footer />
    </>
  );
};

export default Services;
