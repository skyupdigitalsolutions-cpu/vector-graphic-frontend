import React from "react";
import { useState } from "react";

const allImages = [
  {
    id: 1,
    src: "/images/work_1.webp",
    title: "Discussion of the Idea",
    description:
      "Explore our gallery of completed projects across design, packaging.",
  },
  {
    id: 2,
    src: "/images/work_2.webp",
    title: "Discussion of the Idea",
    description:
      "Explore our gallery of completed projects across design, packaging.",
  },
  {
    id: 3,
    src: "/images/work_3.webp",
    title: "Discussion of the Idea",
    description:
      "Explore our gallery of completed projects across design, packaging.",
  },
  {
    id: 4,
    src: "/images/work_4.webp",
    title: "Discussion of the Idea",
    description:
      "Explore our gallery of completed projects across design, packaging.",
  },
  {
    id: 5,
    src: "/images/work_5.webp",
    title: "Discussion of the Idea",
    description:
      "Explore our gallery of completed projects across design, packaging.",
  },
  {
    id: 6,
    src: "/images/work_6.webp",
    title: "Discussion of the Idea",
    description:
      "Explore our gallery of completed projects across design, packaging.",
  },
  {
    id: 7,
    src: "/images/work_7.webp",
    title: "Discussion of the Idea",
    description:
      "Explore our gallery of completed projects across design, packaging.",
  },
  {
    id: 8,
    src: "/images/work_8.webp",
    title: "Discussion of the Idea",
    description:
      "Explore our gallery of completed projects across design, packaging.",
  },
  {
    id: 9,
    src: "/images/work_9.webp",
    title: "Discussion of the Idea",
    description:
      "Explore our gallery of completed projects across design, packaging.",
  },
  {
    id: 10,
    src: "/images/work_10.webp",
    title: "Discussion of the Idea",
    description:
      "Explore our gallery of completed projects across design, packaging.",
  }
];

const INITIAL_COUNT = 10;
const LOAD_MORE_COUNT = 4;

const ImageCard = ({ src, title, description }) => (
  <div className="group flex flex-col gap-2  w-full lg:px-[55px] px-[20px] pt-[36px] ">
    <div className="overflow-hidden w-full  aspect-[620/430] bg-gray-100">
      <img
        src={src}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    <div className="px-1 pt-3">
      <h3
        className="text-gray-900 text-[15px] md:text-[16px] lg:text-[18px]"
        style={{ fontFamily: "unbounded", fontWeight: "600" }}
      >
        {title}
      </h3>
      {/* <p
        className="text-gray-500 text-[13px] md:text-[14px] lg:text-[16px] mt-2 leading-snug"
        style={{ fontFamily: "poppins", fontWeight: "400" }}
      >
        {description}
      </p> */}
    </div>
  </div>
);

export default function WorkImages() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visibleImages = allImages.slice(0, visibleCount);
  const hasMore = visibleCount < allImages.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + LOAD_MORE_COUNT, allImages.length),
    );
  };

  return (
    <section className="bg-white w-full  " >
      {/* ── Image grid ── */}
      <div className=" md:px-6 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 sm:gap-4 md:gap-5 lg:gap-x-[1px] lg:gap-y-[30px]">
          {visibleImages.map((img) => (
            <ImageCard key={img.id} {...img} />
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              className="p-[16px] border border-gray-300 w-[248px] text-gray-700 text-[20px] h-[60px] font-poppins hover:bg-gray-50 hover:border-gray-400 transition-all"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}