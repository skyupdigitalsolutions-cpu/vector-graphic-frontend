import React, { useState } from "react";
import { THOUGHTS } from "../data/thoughtsData";

const INITIAL_COUNT = 10;
const LOAD_MORE_COUNT = 4;

const ImageCard = ({ src, title, onClick }) => (
  <div
    className="group flex flex-col gap-2 cursor-pointer w-full px-3 lg:px-[45px]"
    onClick={onClick}
  >
    <div className="overflow-hidden w-full aspect-[620/430] bg-gray-100 ">
      <img
        src={src}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    <div className="px-1 pb-4 pt-2">
      <h3
        className="text-gray-900 text-[15px] md:text-[16px] lg:text-[18px]"
        style={{ fontFamily: "unbounded", fontWeight: "600" }}
      >
        {title}
      </h3>
      {/* <p
        className="text-gray-500 text-[13px] md:text-[14px] lg:text-[16px] mt-1 leading-snug"
        style={{ fontFamily: "poppins", fontWeight: "400" }}
      >
        {description}
      </p> */}
    </div>
  </div>
);

export default function WorkImage({ onCardClick }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visibleImages = THOUGHTS.slice(0, visibleCount);
  const hasMore = visibleCount < THOUGHTS.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, THOUGHTS.length));
  };

  return (
    <section className="bg-white w-full">
      <div className="px-[clamp(16px,5vw,64px)] pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 sm:gap-4 md:gap-5 ">
          {visibleImages.map((img) => (
            <ImageCard
              key={img.id}
              {...img}
              onClick={() => onCardClick && onCardClick(img.id)}
            />
          ))}
        </div>

        {/* {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              className="p-[16px] border border-gray-300 w-[248px] text-gray-700 text-[20px] h-[60px] hover:bg-gray-50 hover:border-gray-400 transition-all"
              style={{ fontFamily: "poppins" }}
            >
              Load More
            </button>
          </div>
        )} */}
      </div>
    </section>
  );
}
