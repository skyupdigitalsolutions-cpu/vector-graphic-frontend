const styles = `
  .logo-flip {
    transition: transform 0.6s ease-in-out;
  }
  .logo-flip:hover {
    transform: rotateX(360deg);
  }
`;

const ROW1 = [
  { src: "/images/logo_10.webp", alt: "Logo 1" },
  { src: "/images/logo_10.webp", alt: "Logo 2" },
  { src: "/images/logo_10.webp", alt: "Logo 3" },
  { src: "/images/logo_10.webp", alt: "Logo 4" },
  { src: "/images/logo_10.webp", alt: "Logo 5" },
  { src: "/images/logo_10.webp", alt: "Logo 6" },
];

const ROW2 = [
  { src: "/images/logo_10.webp", alt: "Logo 7" },
  { src: "/images/logo_10.webp", alt: "Logo 8" },
  { src: "/images/logo_10.webp", alt: "Logo 9" },
  { src: "/images/logo_10.webp", alt: "Logo 10" },
  { src: "/images/logo_10.webp", alt: "Logo 11" },
  { src: "/images/logo_10.webp", alt: "Logo 12" },
];

const ROW3 = [
  { src: "/images/logo_10.webp", alt: "Logo 13" },
  { src: "/images/logo_10.webp", alt: "Logo 14" },
  { src: "/images/logo_10.webp", alt: "Logo 15" },
  { src: "/images/logo_10.webp", alt: "Logo 16" },
  { src: "/images/logo_10.webp", alt: "Logo 17" },
  { src: "/images/logo_10.webp", alt: "Logo 18" },
];

const LogoRow = ({ logos }) => (
  <div className="grid grid-cols-2 sm:grid-cols-6 py-2 px-10">
    {logos.map((logo, i) => (
      <div key={i} className="flex items-center justify-center px-4">
        <img
          src={logo.src}
          alt={logo.alt}
          className="logo-flip h-28 w-auto object-contain invert"
        />
      </div>
    ))}
  </div>
);

export default function OurClient() {
  return (
    <>
      <style>{styles}</style>
      <div className="bg-black py-9">
        <h3 className="text-white text-[20px] lg:text-[40px] font-semibold text-center font-poppins lg:py-[50px]">
          Our Clients
        </h3>
        <LogoRow logos={ROW1} />
        <LogoRow logos={ROW2} />
        <div className="hidden lg:block"><LogoRow logos={ROW3} /></div>
      </div>
    </>
  );
}
