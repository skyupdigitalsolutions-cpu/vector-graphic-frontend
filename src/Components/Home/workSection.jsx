"use client";
import { useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  [
    {
      id: 1,
      src: "/images/image-12.jpg",
      alt: "Packaging design 1",
    },
    {
      id: 2,
      src: "/images/image-2.jpg",
      alt: "Packaging design 2",
    },
  ],
  [
    {
      id: 3,
      src: "/images/image-3.jpg",
      alt: "Packaging design 3",
    },
    {
      id: 4,
      src: "/images/image-4.jpg",
      alt: "Packaging design 4",
    },
  ],
  [
    {
      id: 5,
      src: "/images/image-5.jpg",
      alt: "Packaging design 5",
    },
    {
      id: 6,
      src: "/images/image-6.jpg",
      alt: "Packaging design 6",
    },
  ],
  [
    {
      id: 7,
      src: "/images/image-7.jpg",
      alt: "Packaging design 7",
    },
    {
      id: 8,
      src: "/images/image-8.jpg",
      alt: "Packaging design 8",
    },
  ],
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
      icon: "/images/automobile.svg",
      title: "Automobile",
    },
  ],
];

export default function WorkSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1));
  const next = () => setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1));

  return (
    <section className="bg-black text-white py-12  lg:py-16 font-poppins">
      {/* Top row */}
      <div className="flex items-start justify-between mb-2 px-6 lg:px-16">
        <p className="font-semibold lg:font-bold text-[16px] lg:text-[30px]">
          Packaging Design Work
        </p>
      </div>

      {/* Heading + description + button row */}
      <div className="flex flex-col lg:flex-row px-6 lg:px-16 lg:items-end lg:justify-between gap-6 mb-10">
        <div>
          <h2 className="max-w-3xl font-extrabold text-[20px] lg:text-[50px] leading-tight mb-4">
            We create packaging <br className="hidden lg:block" />
            design that generate sales
          </h2>
          <p className="text-[14px] lg:text-[16px] text-gray-300 leading-relaxed max-w-4xl">
            The Objective Of The Business, Irrespective Of Its Type, Is To
            Generate A Bigger Sales Figure, Which Remains With A Wide Variety Of
            Clients, From Start-Ups To Global Brands. Did You Ever Notice That
            Innovative Packaging Has The Potential To Increase Sales? In Recent
            Times, Packaging Design Has Been Vital In Boosting Sales Figures.
          </p>
        </div>

        {/* Browse all button — hidden on mobile */}
        <a
          href="/works"
          className="flex-shrink-0 hidden lg:flex items-center gap-2 border border-white text-white text-[14px] font-medium px-5 py-2.5 hover:bg-white/30 transition-colors duration-200 self-start lg:self-auto"
        >
          Browse all
          <ArrowUpRight size={16} />
        </a>
      </div>

      {/* Image Carousel */}
      <div className="relative">
        {/* Image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6 lg:px-16">
          {slides[current].map((img, index) => (
            <div
              key={img.id}
              className={`overflow-hidden aspect-[4/3] bg-gray-800 ${index === 1 ? "hidden sm:block" : ""}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Dots + Arrow controls row */}
        <div className="flex items-center justify-center gap-4 mt-6">
          {/* Prev button */}
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border-2 border-gray-500 flex items-center justify-center text-white hover:border-red-600 hover:text-red-500 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          {/* {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                i === current ? "bg-red-600" : "bg-gray-500 hover:bg-gray-300"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))} */}

          {/* Next button */}
          <button
            onClick={next}
            className="w-9 h-9 rounded-full border-2 border-gray-500 flex items-center justify-center text-white hover:border-red-600 hover:text-red-500 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <hr className="border-0 bg-gray-200 h-[3px] w-full my-[60px]" />
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
                <span className="text-white text-[14px] lg:text-[18px] font-medium ">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
