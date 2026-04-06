export default function HeroSection() {
  return (
    <div className="flex flex-col justify-center items-center mx-auto font-poppins lg:w-[958px] py-[30px] lg:py-[60px] text-center">
      <h4 className="h4 text-[14px] lg:text-[20px] font-medium">
        Premium Packaging Designs Agency in India
      </h4>
      <h1 className="h1 font-extrabold text-[20px] lg:text-[50px] py-2 px-3 lg:!px-0 lg:w-[797px]">
        We Build Packaging Designs That Convert -{" "}
        <span className="text-[#C92020]">Proven Results.</span>
      </h1>
      <img src="/images/hero_section.webp"  alt="Premium Packaging Designs Agency in India"/>
    </div>
  );
}
