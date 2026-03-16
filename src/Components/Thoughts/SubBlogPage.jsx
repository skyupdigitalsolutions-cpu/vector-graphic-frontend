import React, { useEffect, useMemo, useState } from "react";
import { THOUGHTS } from "../../data/thoughtsData";
import { ChevronLeft, ChevronLeftIcon } from "lucide-react";
import CTASection from "../CTASection";

const slugify = (str = "") =>
  str
    .toLowerCase()
    .trim()
    .replace(/[""''"'`]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const renderInlineHTML = (text) => {
  if (!text || !text.includes("<strong>")) return text;
  const parts = text.split(/(<strong>.*?<\/strong>)/g);
  return parts.map((part, idx) => {
    const match = part.match(/^<strong>(.*?)<\/strong>$/);
    if (match) return <strong key={idx}>{match[1]}</strong>;
    return part;
  });
};

const TableOfContents = ({ items, activeId, onItemClick }) => (
  <div className="sticky top-8 px-10">
    <p
      className="text-[15px] md:text-[16px] mb-4  "
      style={{ fontFamily: "unbounded", fontWeight: "700", color: "#111111" }}
    >
      In this article
    </p>
    <div className="w-full h-[1px] bg-gray-200 mb-2" />
    <ul className="space-y-0">
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <li key={item.id}>
            <button
              onClick={() => onItemClick(item.id)}
              className="text-left w-full py-3 pl-4 pr-2 transition-colors border-l-2"
              style={{
                fontFamily: "poppins",
                fontWeight: isActive ? "600" : "400",
                fontSize: "13px",
                lineHeight: "1.5",
                color: isActive ? "#CC2200" : "#444444",
                borderLeftColor: isActive ? "#CC2200" : "transparent",
              }}
            >
              {item.text}
            </button>
            <div className="w-full h-[1px] bg-gray-100" />
          </li>
        );
      })}
    </ul>
  </div>
);

const BlogContent = ({ sections }) => {
  const used = new Map();

  return (
    <div className="space-y-5">
      {sections.map((s, i) => {
        if (s.type === "h2") {
          return (
            <h2
              key={i}
              className="scroll-mt-28 text-[20px] lg:text-[24px] font-bold text-gray-900 mt-4"
              style={{ fontFamily: "unbounded" }}
            >
              {renderInlineHTML(s.text)}
            </h2>
          );
        }

        if (s.type === "h3") {
          const base = slugify(s.text || "");
          const count = (used.get(base) || 0) + 1;
          used.set(base, count);
          const id = count === 1 ? base : `${base}-${count}`;
          return (
            <h3
              key={i}
              id={id}
              className="scroll-mt-28 text-[16px] lg:text-[20px] text-gray-900 pt-3"
              style={{ fontFamily: "unbounded", fontWeight: "600" }}
            >
              {renderInlineHTML(s.text)}
            </h3>
          );
        }

        if (s.type === "quote") {
          return (
            <div
              key={i}
              className="border-l-4 border-gray-300 pl-4 py-2 bg-gray-50"
            >
              <p
                className="text-[14px] text-gray-600 italic leading-relaxed"
                style={{ fontFamily: "poppins" }}
              >
                {renderInlineHTML(s.text)}
              </p>
            </div>
          );
        }

        if (s.type === "image") {
          return (
            <figure key={i} className="my-6">
              <div className="w-full aspect-[16/9] bg-gray-100 overflow-hidden">
                <img
                  src={s.src}
                  alt={s.caption || "Blog image"}
                  className="w-full h-full object-cover"
                />
              </div>
              {s.caption && (
                <figcaption
                  className="text-[12px] text-gray-400 mt-2 text-center italic"
                  style={{ fontFamily: "poppins" }}
                >
                  {s.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        if (s.type === "ul") {
          return (
            <ul key={i} className="list-disc list-outside pl-5 space-y-2">
              {s.text.map((item, idx) => (
                <li
                  key={idx}
                  className="text-[14px] text-gray-600 leading-relaxed"
                  style={{ fontFamily: "poppins" }}
                >
                  {renderInlineHTML(item)}
                </li>
              ))}
            </ul>
          );
        }

        if (s.type === "bold") {
          return (
            <p
              key={i}
              className="text-[14px] lg:text-[15px] text-gray-600 leading-relaxed"
              style={{ fontFamily: "poppins", fontWeight: "700" }}
            >
              {renderInlineHTML(s.text)}
            </p>
          );
        }

        return (
          <p
            key={i}
            className="text-[14px] lg:text-[15px] text-gray-600 leading-relaxed"
            style={{ fontFamily: "poppins", fontWeight: "400" }}
          >
            {renderInlineHTML(s.text)}
          </p>
        );
      })}
    </div>
  );
};

export const SubBlogPage = ({ blogId, onBack }) => {
  const blog = THOUGHTS.find((b) => b.id === blogId);

  const sections = blog?.sections?.length
    ? blog.sections
    : [
        {
          type: "p",
          text: "Content not added yet. Add sections in src/data/thoughtsData.js",
        },
      ];

  const toc = useMemo(() => {
    const used = new Map();
    return sections
      .filter((s) => s.type === "h3" && s.text)
      .map((s) => {
        const base = slugify(s.text);
        const count = (used.get(base) || 0) + 1;
        used.set(base, count);
        const id = count === 1 ? base : `${base}-${count}`;
        return { id, text: s.text };
      });
  }, [sections]);

  const [activeId, setActiveId] = useState(toc[0]?.id || "");

  useEffect(() => {
    if (!toc.length) return;
    const headingEls = toc
      .map((t) => document.getElementById(t.id))
      .filter(Boolean);
    if (!headingEls.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0),
          )[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { root: null, rootMargin: "-25% 0px -65% 0px", threshold: [0.1, 0.5, 1] },
    );
    headingEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [toc]);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  if (!blog) {
    return (
      <div className="px-5 py-10 text-center">
        <p className="text-gray-500" style={{ fontFamily: "poppins" }}>
          Blog not found.
        </p>
        <button
          onClick={onBack}
          className="mt-4 text-black underline text-[14px]"
          style={{ fontFamily: "poppins" }}
        >
          Go back
        </button>
      </div>
    );
  }

  const related = THOUGHTS.filter(
    (b) => b.id !== blog.id && b.category === blog.category,
  ).slice(0, 3);

  return (
    <div className="bg-white min-h-screen">
      <div className="lg:hidden px-2 md:px-1 pb-1 pt-3">
        <button
          onClick={onBack}
          className="inline-flex items-center rounded-full text-[14px] bg-[#FFD7D7] px-[10px] py-[10px] text-black transition-colors"
        >
          <ChevronLeftIcon />
        </button>
      </div>

      {/* ── Header ── */}
      <div className="px-5 md:px-10 lg:px-[80px] md:pt-6 md:pb-4 flex flex-col justify-center text-center items-center">
        <h1
          className="max-w-[1200px] font-bold text-[20px] md:text-[34px] lg:text-[50px] text-gray-900 leading-tight text-center"
          style={{ fontFamily: "unbounded" }}
        >
          {blog.title}
        </h1>
      </div>

      {/* ── Main layout: sidebar + content ── */}
      <div className="px-5 md:px-10 lg:px-[80px] md:pt-8 pt-2 pb-1">
        {/* On lg+: flex row (sidebar + article).
            Below lg: just center the article with mx-auto */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 lg:items-start">

          {/* Sidebar TOC — desktop only */}
          {toc.length > 0 && (
            <div className="lg:w-[400px] flex-shrink-0 hidden lg:block mt-4 px-5">
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 rounded text-[14px] font-medium bg-[#FFD7D7] px-[10px] py-[10px] text-black transition-colors mb-6"
                style={{ fontFamily: "poppins" }}
              >
                <ChevronLeftIcon />
                Back to Thoughts
              </button>

              <TableOfContents
                items={toc}
                activeId={activeId}
                onItemClick={scrollToId}
              />
            </div>
          )}

          {/* Article content
              - On lg+: flex-1 takes remaining width beside sidebar
              - Below lg: max-w-[810px] + mx-auto centers it on the page */}
          <div className="w-full max-w-[810px] mx-auto lg:mx-0 lg:flex-1 px-5">
            <div className="pt-6 mb-6">
              {/* Single rounded card — image + text overlay inside */}
              <div className="relative w-full h-[210px] lg:h-[462px] bg-gray-100 overflow-hidden rounded-xl">
                {/* Image */}
                <img
                  src={blog.heroImage || blog.src}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />

                {/* Blur overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-[30%] lg:h-[30%] bg-black/30 backdrop-blur-[21px]" />

                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-6 lg:p-6 md:ml-[16px]">
                  <h2
                    className="text-white text-[10px] md:text-[18px] lg:text-[24px] font-bold mb-1 md:mb-2 leading-tight"
                    style={{ fontFamily: "unbounded" }}
                  >
                    {blog.title}
                  </h2>
                  <p
                    className="text-white/60 text-[10px] mt-[2px] md:text-[13px] lg:text-[14px]"
                    style={{ fontFamily: "poppins" }}
                  >
                    {blog.date} &nbsp;·&nbsp; {blog.readTime}
                  </p>
                </div>
              </div>
            </div>

            <BlogContent sections={sections} />
          </div>

        </div>
      </div>

      <CTASection
        backgroundColor="#FFF1F1"
        className="mt-[50px]"
        heading={blog.cta?.heading || "Ready to Elevate Your Packaging?"}
        subheading={
          blog.cta?.subheading ||
          "Drive faster business growth with innovative solutions."
        }
      />
    </div>
  );
};

export default SubBlogPage;
