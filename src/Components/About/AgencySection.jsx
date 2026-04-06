import { MdArrowOutward } from "react-icons/md";

export default function AgencySection() {
  return (
    <div className="lg:px-20 pb-12 lg:py-12  font-poppins">
      <div className="w-[353px] lg:w-[920px] px-3 lg:px-5">
        <p className="text-[16px] lg:text-[30px] font-medium lg:font-bold text-gray-900 mb-3 tracking-wide">
          Branding Solutions Work
        </p>
        <h1 className="text-[20px] lg:text-[50px] font-extrabold mb-3 lg:mb-5">
          Our Type of Branding Solutions Agency Needs All Types of Brands.
        </h1>

        <p className="text-[14px] lg:text-[16px] mb-8  lg:w-[960px] ">
          Our branding solutions are designed to help businesses of all sizes build a strong and consistent identity. We work with startups, growing companies, and established brands to create impactful strategies that enhance visibility and trust. By combining creativity with market insights, we deliver branding solutions that connect with the right audience, strengthen brand positioning, and support long-term business growth in a competitive market.
        </p>
      </div>
      <button className="inline-flex items-center mx-3 lg:mx-5 gap-2 border-2 border-gray-900 text-gray-900 text-[16px] shadow-xl font-medium px-[12px] lg:px-[38px] py-2.5  hover:bg-gray-100 transition-colors duration-150">
        Apply for Job <MdArrowOutward />
      </button>
    </div>
  );
}
