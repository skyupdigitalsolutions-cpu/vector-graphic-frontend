import React from "react";
import { THOUGHTS } from "../../data/thoughtsData";

const styles = `
  .thoughts-card-hover {
    cursor: pointer;
    transition: transform 0.35s ease, box-shadow 0.35s ease;
  }
  .thoughts-card-hover:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 48px rgba(255, 255, 255, 0.08);
  }
  .thoughts-card-hover:hover .thoughts-img-zoom {
    transform: scale(1.05);
  }
  .thoughts-img-zoom {
    transition: transform 0.45s ease;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .thoughts-card-hover:hover .thoughts-title {
    opacity: 0.75;
  }
  .thoughts-title {
    transition: opacity 0.3s ease;
  }

  .thoughts-section {
    background-color: #000000;
    box-sizing: border-box;
    padding: 60px 80px;
    display: flex;
    flex-direction: column;
    gap: 60px;
  }

  .thoughts-header {
    width: 100%;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .thoughts-heading {
    font-family: 'Ultra', serif;
    font-size: 50px;
    font-weight: 400;
    color: #ffffff;
    line-height: 150%;
    margin: 0;
  }
  .thoughts-browse {
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    color: #ffffff;
    text-decoration: none;
    white-space: nowrap;
    transition: opacity 0.2s;
  }
  .thoughts-browse:hover { opacity: 0.5; }

  .thoughts-cards-row {
    display: flex;
    flex-direction: row;
    gap: 40px;
    width: 100%;
  }

  .thoughts-card {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  .thoughts-img-wrapper {
    width: 100%;
    aspect-ratio: 620 / 430;
    overflow: hidden;
    background-color: #18181b;
    flex-shrink: 0;
  }

  .thoughts-text-block {
    padding-top: 35px;
    display: flex;
    flex-direction: column;
    gap: 0px;
  }
  .thoughts-title {
    font-family: 'Unbounded', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.4;
    margin: 0 0 16px 0;
  }
  .thoughts-desc {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    color: #747476;
    line-height: 1.6;
    margin: 0;
    max-width: 575px;
    height: 72px;
    overflow: hidden;
  }

  @media (max-width: 1023px) {
    .thoughts-section { padding: 48px 40px; gap: 48px; }
    .thoughts-header { height: auto; }
    .thoughts-heading { font-size: 36px; }
    .thoughts-cards-row { gap: 24px; }
    .thoughts-title { font-size: 15px; }
    .thoughts-desc { font-size: 14px; height: auto; max-width: 100%; }
    .thoughts-text-block { padding-top: 24px; }
  }

  @media (max-width: 599px) {
    .thoughts-section { padding: 36px 20px; gap: 60px; }
    .thoughts-header { height: auto; }
    .thoughts-heading { font-size: 24px; font-family: 'Ultra', sans-serif; font-weight: 400; }
    .thoughts-browse { font-size: 14px; color: #FFFFFF; }
    .thoughts-cards-row { flex-direction: column; gap: 30px; }
    .thoughts-card { gap: 30px; }
    .thoughts-img-wrapper { width: 100%; aspect-ratio: 353 / 234; }
    .thoughts-text-block { padding-top: 0; gap: 12px; display: flex; flex-direction: column; }
    .thoughts-title { font-family: 'Unbounded', sans-serif; font-size: 16px; font-weight: 500; line-height: 150%; margin: 0; }
    .thoughts-desc { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 400; line-height: 150%; color: #747476; height: auto; max-width: 100%; margin: 0; }
  }
`;

const ImageCard = ({ id, src, title, description, onBlogClick }) => (
  <div
    className="thoughts-card-hover thoughts-card"
    onClick={() => {
  window.history.pushState({}, "", "/thoughts");
  window.dispatchEvent(new Event("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
  onBlogClick(id);
}}
  >
    <div className="thoughts-img-wrapper">
      <img
        src={src}
        alt={title}
        className="thoughts-img-zoom"
        onError={(e) => (e.target.style.display = "none")}
      />
    </div>
    <div className="thoughts-text-block">
      <h3 className="thoughts-title">{title}</h3>
    </div>
  </div>
);
export default function ThoughtsSection({ onBlogClick }) {
  const featuredBlogs = THOUGHTS.slice(0, 2);

  return (
    <>
      <style>{styles}</style>
      <section className="thoughts-section">
        <div className="thoughts-header">
          <h2 className="thoughts-heading">Thoughts</h2>
          <a href="/thoughts" className="thoughts-browse">
            Browse all ↗
          </a>
        </div>

        <div className="thoughts-cards-row">
          {featuredBlogs.map((blog) => (
            <ImageCard
              key={blog.id}
              id={blog.id}
              src={blog.heroImage || blog.src}
              title={blog.title}
              description={blog.description}
              onBlogClick={onBlogClick}
            />
          ))}
        </div>
      </section>
    </>
  );
}
