import React, { useEffect, useMemo, useState } from "react";
import { THOUGHTS } from "../../data/thoughtsData";
import { ChevronLeftIcon } from "lucide-react";
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

// All heading types that appear in the TOC
const TOC_TYPES = new Set([
  "h2","h3","h4","h5","h6",
  "h2_with_link","h3_with_link","h4_with_link","h5_with_link","h6_with_link",
]);
const getHeadingTag = (type) => type.replace("_with_link", "");

const TableOfContents = ({ items, activeId, onItemClick }) => (
  <div className="sticky top-8 px-10">
    <p
      className="text-[15px] md:text-[16px] mb-4"
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
        // ── Plain headings h2–h6 ──
        if (["h2","h3","h4","h5","h6"].includes(s.type)) {
          const base = slugify(s.text || "");
          const count = (used.get(base) || 0) + 1;
          used.set(base, count);
          const id = count === 1 ? base : `${base}-${count}`;
          const sizes = { h2: "text-[20px] lg:text-[24px]", h3: "text-[16px] lg:text-[20px]", h4: "text-[15px] lg:text-[17px]", h5: "text-[13px] lg:text-[15px]", h6: "text-[12px] lg:text-[13px]" };
          const weights = { h2: "700", h3: "600", h4: "600", h5: "600", h6: "600" };
          return React.createElement(
            s.type,
            { key: i, id, className: `scroll-mt-28 ${sizes[s.type]} text-gray-900 pt-3`, style: { fontFamily: "unbounded", fontWeight: weights[s.type] } },
            renderInlineHTML(s.text)
          );
        }

        // ── Headings with link h2_with_link–h6_with_link ──
        if (["h2_with_link","h3_with_link","h4_with_link","h5_with_link","h6_with_link"].includes(s.type)) {
          const tag = getHeadingTag(s.type);
          const base = slugify(s.linkText || "");
          const count = (used.get(base) || 0) + 1;
          used.set(base, count);
          const id = count === 1 ? base : `${base}-${count}`;
          const sizes = { h2: "text-[20px] lg:text-[24px]", h3: "text-[16px] lg:text-[20px]", h4: "text-[15px] lg:text-[17px]", h5: "text-[13px] lg:text-[15px]", h6: "text-[12px] lg:text-[13px]" };
          const weights = { h2: "700", h3: "600", h4: "600", h5: "600", h6: "600" };
          return React.createElement(
            tag,
            { key: i, id, className: `scroll-mt-28 ${sizes[tag]} text-gray-900 pt-3`, style: { fontFamily: "unbounded", fontWeight: weights[tag] } },
            [
              s.textBefore ? s.textBefore + " " : "",
              <a key="lnk" href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: "#CC2200", textDecoration: "underline" }}>{s.linkText}</a>,
              s.textAfter ? " " + s.textAfter : "",
            ]
          );
        }

        // ── Quote ──
        if (s.type === "quote") {
          return (
            <div key={i} className="border-l-4 border-gray-300 pl-4 py-2 bg-gray-50">
              <p className="text-[14px] text-gray-600 italic leading-relaxed" style={{ fontFamily: "poppins" }}>
                {renderInlineHTML(s.text)}
              </p>
            </div>
          );
        }

        // ── Image ──
        if (s.type === "image") {
          return (
            <figure key={i} className="my-6">
              <div className="w-full aspect-[16/9] bg-gray-100 overflow-hidden">
                <img src={s.src} alt={s.caption || "Blog image"} className="w-full h-full object-cover" />
              </div>
              {s.caption && (
                <figcaption className="text-[12px] text-gray-400 mt-2 text-center italic" style={{ fontFamily: "poppins" }}>
                  {s.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        // ── Bullet list ──
        if (s.type === "ul") {
          return (
            <ul key={i} className="list-disc list-outside pl-5 space-y-2">
              {(s.text || []).map((item, idx) => (
                <li key={idx} className="text-[14px] text-gray-600 leading-relaxed" style={{ fontFamily: "poppins" }}>
                  {renderInlineHTML(item)}
                </li>
              ))}
            </ul>
          );
        }

        // ── Numbered list ──
        if (s.type === "ol") {
          return (
            <ol key={i} className="list-decimal list-outside pl-5 space-y-2">
              {(s.text || []).map((item, idx) => (
                <li key={idx} className="text-[14px] text-gray-600 leading-relaxed" style={{ fontFamily: "poppins" }}>
                  {renderInlineHTML(item)}
                </li>
              ))}
            </ol>
          );
        }

        // ── Bold paragraph ──
        if (s.type === "bold") {
          return (
            <p key={i} className="text-[14px] lg:text-[15px] text-gray-600 leading-relaxed" style={{ fontFamily: "poppins", fontWeight: "700" }}>
              {renderInlineHTML(s.text)}
            </p>
          );
        }

        // ── Table ──
        if (s.type === "table") {
          return (
            <div key={i} className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full border-collapse text-[14px]" style={{ fontFamily: "poppins" }}>
                <thead>
                  <tr>
                    {(s.headers || []).map((h, hi) => (
                      <th key={hi} className="text-left px-4 py-[10px] font-bold border-b border-gray-200"
                        style={{ background: s.themed ? "#f3edd8" : "#fff", color: "#111" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(s.rows || []).map((row, ri) => (
                    <tr key={ri} style={{ background: s.themed ? (ri % 2 === 0 ? "#faf7ec" : "#f5f0d8") : "#fff" }}>
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-4 py-2 border-b border-gray-100 text-gray-600">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        // ── Paragraph with link ──
        if (s.type === "p_with_link") {
          return (
            <p key={i} className="text-[14px] lg:text-[15px] text-gray-600 leading-relaxed" style={{ fontFamily: "poppins" }}>
              {s.textBefore && <span>{s.textBefore} </span>}
              <a href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: "#CC2200", fontWeight: 600, textDecoration: "underline" }}>{s.linkText}</a>
              {s.textAfter && <span> {s.textAfter}</span>}
            </p>
          );
        }

        // ── Paragraph with bold parts ──
        if (s.type === "p_with_bold") {
          return (
            <p key={i} className="text-[14px] lg:text-[15px] text-gray-600 leading-relaxed" style={{ fontFamily: "poppins" }}>
              {(s.parts || []).map((part, pi) =>
                part.bold
                  ? <strong key={pi} style={{ color: "#111" }}>{part.text}</strong>
                  : <span key={pi}>{part.text}</span>
              )}
            </p>
          );
        }

        // ── Paragraph with link + bold parts ──
        if (s.type === "p_with_link_bold") {
          return (
            <p key={i} className="text-[14px] lg:text-[15px] text-gray-600 leading-relaxed" style={{ fontFamily: "poppins" }}>
              {(s.partsBefore || []).map((part, pi) =>
                part.bold ? <strong key={pi} style={{ color: "#111" }}>{part.text}</strong> : <span key={pi}>{part.text}</span>
              )}
              {" "}
              <a href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: "#CC2200", fontWeight: 600, textDecoration: "underline" }}>{s.linkText}</a>
              {" "}
              {(s.partsAfter || []).map((part, pi) =>
                part.bold ? <strong key={pi} style={{ color: "#111" }}>{part.text}</strong> : <span key={pi}>{part.text}</span>
              )}
            </p>
          );
        }

        // ── Default paragraph ──
        return (
          <p key={i} className="text-[14px] lg:text-[15px] text-gray-600 leading-relaxed" style={{ fontFamily: "poppins", fontWeight: "400" }}>
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
    : [{ type: "p", text: "Content not added yet." }];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [blogId]);

  // TOC now covers ALL heading types, matching the builder
  const toc = useMemo(() => {
    const used = new Map();
    return sections
      .filter((s) => TOC_TYPES.has(s.type) && (s.text || s.linkText))
      .map((s) => {
        const rawText = s.linkText || s.text || "";
        const base = slugify(rawText);
        const count = (used.get(base) || 0) + 1;
        used.set(base, count);
        const id = count === 1 ? base : `${base}-${count}`;
        return { id, text: rawText, level: getHeadingTag(s.type) };
      });
  }, [sections]);

  const [activeId, setActiveId] = useState(toc[0]?.id || "");

  useEffect(() => {
    if (!toc.length) return;
    const headingEls = toc.map((t) => document.getElementById(t.id)).filter(Boolean);
    if (!headingEls.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { root: null, rootMargin: "-25% 0px -65% 0px", threshold: [0.1, 0.5, 1] }
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
        <p className="text-gray-500" style={{ fontFamily: "poppins" }}>Blog not found.</p>
        <button onClick={onBack} className="mt-4 text-black underline text-[14px]" style={{ fontFamily: "poppins" }}>Go back</button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Mobile back button */}
      <div className="lg:hidden px-2 md:px-1 pb-1 pt-3">
        <button onClick={onBack} className="inline-flex items-center rounded-full text-[14px] bg-[#FFD7D7] px-[10px] py-[10px] text-black transition-colors">
          <ChevronLeftIcon />
        </button>
      </div>

      {/* Header */}
      <div className="px-5 md:px-10 lg:px-[80px] md:pt-6 md:pb-4 flex flex-col justify-center text-center items-center">
        <h1 className="max-w-[1200px] font-bold text-[26px] md:text-[34px] lg:text-[50px] text-gray-900 leading-tight text-center" style={{ fontFamily: "unbounded" }}>
          {blog.title}
        </h1>
      </div>

      {/* Main layout */}
      <div className="px-5 md:px-10 lg:px-[80px] md:pt-8 pt-2 pb-1">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 lg:items-start">

          {/* Sidebar TOC — desktop only */}
          {toc.length > 0 && (
            <div className="lg:w-[400px] flex-shrink-0 hidden lg:block mt-4 px-5">
              <button onClick={onBack} className="inline-flex items-center gap-2 rounded text-[14px] font-medium bg-[#FFD7D7] px-[10px] py-[10px] text-black transition-colors mb-6" style={{ fontFamily: "poppins" }}>
                <ChevronLeftIcon /> Back to Thoughts
              </button>
              <TableOfContents items={toc} activeId={activeId} onItemClick={scrollToId} />
            </div>
          )}

          {/* Article */}
          <div className="w-full max-w-[790px] mx-auto lg:mx-0 lg:flex-1">
            <div className="pt-6 mb-6">
              <div className="relative w-full h-[210px] lg:h-[462px] bg-gray-100 overflow-hidden rounded-xl">
                <img src={blog.heroImage || blog.src} alt={blog.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 h-[70px] lg:h-[138px] bg-black/30 backdrop-blur-[21px]" />
                <div className="absolute bottom-0 left-0 right-0 h-[70px] lg:h-[130px] flex flex-col justify-center px-2 py-2 md:px-4 md:py-4 lg:px-20 lg:py-23">
                  <h2 className="text-white font-bold leading-tight line-clamp-3 text-[9px] md:text-[18px] lg:text-[24px] mb-[2px] md:mb-2" style={{ fontFamily: "unbounded" }}>
                    {blog.title}
                  </h2>
                  <p className="text-white/60 text-[9px] md:text-[13px] lg:text-[14px] mt-[2px]" style={{ fontFamily: "poppins" }}>
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
        subheading={blog.cta?.subheading || "Drive faster business growth with innovative solutions."}
      />
    </div>
  );
};

export default SubBlogPage;
