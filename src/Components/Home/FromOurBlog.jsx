import { useState, useRef } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { THOUGHTS } from "../../data/thoughtsData";

export default function FromOurBlog() {
  const blogs = THOUGHTS;
  const scrollRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const handleBrowseAll = () => {
    window.scrollTo(0, 0);
    window.location.href = "/thoughts";
  };

  const handleCardClick = (id) => {
    sessionStorage.setItem("openBlogId", String(id));
    window.scrollTo(0, 0);
    window.location.href = "/thoughts";
  };

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.querySelector("div")?.offsetWidth || 500;
    const scrollAmount = cardWidth + 24;
    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    setAtStart(container.scrollLeft <= 10);
    setAtEnd(
      container.scrollLeft + container.offsetWidth >= container.scrollWidth - 10
    );
  };

  return (
    <section className="font-poppins px-6 lg:px-16 py-14 bg-white overflow-hidden">
      {/* Top row — label + heading + browse button + arrows */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
        <div>
          <p className="text-[#CC2200] font-medium lg:font-bold text-[14px] lg:text-[30px] mb-3 flex items-center gap-1">
            <span>—</span>From our blog
          </p>
          <h2
            className="font-extrabold text-[20px] max-w-[926px]  lg:text-[50px] text-black "
          >
            We are curiosity driven,
            inspired by good design
          </h2>
        </div>

        {/* Right side: arrows + browse button */}
        <div className="hidden lg:flex items-center gap-3 self-start lg:self-auto">
          <button
            onClick={handleBrowseAll}
            className="flex items-center gap-2 border border-gray-400 text-black text-[13px] font-medium px-5 py-2.5 hover:bg-black hover:text-white transition-colors duration-200"
          >
            Browse all
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>

      {/* Blog cards slider */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
        style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
      >
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="flex-shrink-0 w-[85vw] sm:w-[55vw] lg:w-[38vw] cursor-pointer group snap-start"
            onClick={() => handleCardClick(blog.id)}
          >
            {/* Image */}
            <div className="w-full aspect-[620/430] overflow-hidden bg-gray-100">
              <img
                src={blog.heroImage || blog.src}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Title */}
            <p
              className="mt-4 text-[13px] lg:text-[16px] text-gray-900 leading-snug font-normal group-hover:text-[#CC2200] transition-colors duration-200"
              style={{ fontFamily: "poppins" }}
            >
              {blog.title}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center py-3 gap-3">
        <button
            onClick={() => scroll("prev")}
            disabled={atStart}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-black hover:text-white hover:border-black transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("next")}
            disabled={atEnd}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-black hover:text-white hover:border-black transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={18} />
          </button>
      </div>
    </section>
  );
}