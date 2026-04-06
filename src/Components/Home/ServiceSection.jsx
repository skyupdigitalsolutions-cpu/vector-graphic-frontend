import {
  Package,
  FolderKanban,
  Box,
  PenTool,
  Cuboid,
  Printer,
} from "lucide-react";

// ✅ To change any icon, replace the `icon` value with any Lucide component.
// Full list: https://lucide.dev/icons
const services = [
  {
    id: 1,
    src: "/images/service_icon_1.svg",
    title: "Packaging Designs",
    description:
      "Creative packaging designs that boost brand identity, attract customers, and help products stand out.",
    href: "/service",
  },
  {
    id: 2,
    src: "/images/service_icon_1.svg",
    title: "Artwork Management",
    description:
      "Artwork Management organizes and tracks design files with version control for brand consistency.",
    href: "/service",
  },
  {
    id: 3,
    src: "/images/print.svg",
    title: "Repro Print Ready File",
    description:
      "Print-ready files with accurate color, resolution, and formatting for flawless, professional printing.",
    href: "/service",
  },
  {
    id: 4,
    src: "/images/brush.svg",
    title: "Tracing & Retouching",
    description:
      "We provide high-quality image tracing and retouching to enhance clarity, accuracy, and visual appeal.",
    href: "/service",
  },
  {
    id: 5,
    src: "/images/deployed_code.svg",
    title: "3D CGI & Physical Mockups",
    description:
      "Create realistic 3D CGI visuals and mockups to preview designs and ensure accuracy before production.",
    href: "/service",
  },
  {
    id: 6,
    src: "/images/text_snippet.svg",
    title: "PPM Print Coordination",
    description:
      "PPM print coordination ensures accurate color, layout, and quality before mass printing to avoid errors.",
    href: "/service",
  },
];

function ServiceCard({ icon: Icon, src, title, description, href }) {
  return (
    <div className="flex gap-3">
      {/* Title */}
      <img src={src} className="w-[36px] h-[36px] lg:w-[69px] lg:h-[69px]" alt="" />
      <div>
        <a
          href={href}
          className="font-semibold text-[16px] lg:text-[18px] uppercase tracking-wide text-black hover:!text-red-600 leading-snug"
        >
          {title}
        </a>

        {/* Description */}
        <p className="text-[14px] text-gray-700 py-2 lg:py-3 leading-relaxed">
          {description}
        </p>

        {/* View More Link */}
        <a
          href={href}
          className="flex text-[15px] hover:font-semibold hover:text-red-600 "
        >
          View More
          <span className="text-[11px] ">
            <img src="/images/keyboard_double_arrow_right.svg" />
          </span>
        </a>
      </div>
    </div>
  );
}

export default function ServiceSection() {
  return (
    <div className="flex flex-col justify-center items-center mx-auto font-poppins lg:w-[1278px] lg:py-[60px] lg:text-center">
      <div className="lg:w-[1164px]">
        <h1 className="h1 font-extrabold text-[20px] px-3 lg:text-[50px] text-start lg:!text-center">
          Transform Your Brand with Our Creative Packaging Design Solutions
        </h1>
        <p className="text-[14px] lg:text-[16px] px-3">
          We transform brands with creative packaging design solutions that
          combine strategy, innovation, and visual appeal. With strong industry
          experience and a diverse portfolio, we design packaging that enhances
          brand identity and influences buying decisions. From concept to
          print-ready execution, every detail is crafted with precision to
          ensure high shelf impact. We believe packaging should not only look
          good but also create an emotional connection, helping your product
          stand out and gain a competitive edge in the market.
        </p>
      </div>

      {/* Service Cards Grid */}
      <div className="py-9 lg:py-[90px] w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-[36px] text-left px-4 lg:px-0">
        {services.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </div>
  );
}
