const brands = [
  { id: 1, logo: "/images/logo_1.webp", alt: "Mi Labs" },
  { id: 2, logo: "/images/logo_1.webp", alt: "Prabha Ayurvedic Remedies" },
  { id: 3, logo: "/images/logo_1.webp", alt: "Brand 3" },
  { id: 4, logo: "/images/logo_1.webp", alt: "Brand 4" },
  { id: 5, logo: "/images/logo_1.webp", alt: "Brand 5" },
  { id: 6, logo: "/images/logo_10.webp", alt: "Mi Labs" },
  { id: 7, logo: "/images/logo_10.webp", alt: "Prabha Ayurvedic Remedies" },
  { id: 8, logo: "/images/logo_10.webp", alt: "Brand 3" },
  { id: 9, logo: "/images/logo_10.webp", alt: "Brand 4" },
  { id: 10, logo: "/images/logo_10.webp", alt: "Brand 5" },
];

const marqueeStyles = `
  @keyframes scroll-left {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .marquee-track {
    display: flex;
    min-width: max-content;        /* ✅ KEY FIX: forces track to full content width */
    animation: scroll-left 20s linear infinite;
    will-change: transform;
    backface-visibility: hidden;
  }
  .marquee-track:hover {
    animation-play-state: paused;
  }
`;

const BrandItem = ({ brand }) => (
  <div className="inline-flex items-center justify-center flex-shrink-0 lg:px-10 min-h-[110px] hover:opacity-50 transition-opacity duration-100 cursor-default">
    <img
      src={brand.logo}
      alt={brand.alt}
      className="h-[59px] md:h-[98px] w-auto object-contain brightness-100 invert"
    />
  </div>
);

export default function ClientMarquee() {
  const duplicated = [...brands, ...brands];

  return (
    <section className="w-full font-poppins bg-black border-t border-[#767474]">
      <style>{marqueeStyles}</style>

      <div className="flex items-center min-h-[122px] md:min-h-[230px] px-3 md:px-28 py-[30px] lg:py-[60px] gap-[10px]">
        
        {/* Left Label */}
        <div className="flex-shrink-0 flex flex-col justify-center pr-5 md:pr-10 min-w-[150px] md:min-w-[220px]">
          <p className="text-white text-[14px] md:text-[20px] leading-[1.3] pb-2">
            Brands we Partner
          </p>
          <h2 className="text-white font-extrabold text-[20px] md:text-[50px] leading-[1.3]">
            Our Clients
          </h2>
        </div>

        {/* Marquee wrapper — overflow hidden clips the moving track */}
        <div className="flex-1 overflow-hidden">   {/* ✅ remove whitespace-nowrap from here */}
          <div className="marquee-track">           {/* ✅ remove flex/whitespace-nowrap, CSS handles it */}
            {duplicated.map((brand, index) => (
              <BrandItem key={index} brand={brand} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}