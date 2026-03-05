import React from "react";

const allImages = [
  {
    id: 1,
    src: "/images/Frame.png",
    title: "Are you ready for the 2D Barcode Revolution?",
    description:
      "Our Design process creates specialized layouts that blend perfectly with your branded product parameters.",
  },
  {
    id: 2,
    src: "/images/Frame.png",
    title: "The Future of Smart Packaging Is Here",
    description:
      "Discover how intelligent packaging solutions are transforming the way brands connect with consumers.",
  },
];

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

  /* ── SECTION LAYOUT ── */
  .thoughts-section {
    background-color: #000000;
    box-sizing: border-box;

    /* Desktop */
    padding: 60px 80px;
    display: flex;
    flex-direction: column;
    gap: 60px;
  }

  /* ── HEADER ROW ── */
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

  /* ── CARDS ROW — Desktop: horizontal ── */
  .thoughts-cards-row {
    display: flex;
    flex-direction: row;
    gap: 40px;
    width: 100%;
  }

  /* ── SINGLE CARD ── */
  .thoughts-card {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  /* Desktop image */
  .thoughts-img-wrapper {
    width: 100%;
    aspect-ratio: 620 / 430;
    overflow: hidden;
    background-color: #18181b;
    flex-shrink: 0;
  }

  /* Desktop text block */
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

  /* ══════════════════════════════════════════
     TABLET  (600px – 1023px)
  ══════════════════════════════════════════ */
  @media (max-width: 1023px) {
    .thoughts-section {
      padding: 48px 40px;
      gap: 48px;
    }
    .thoughts-header {
      height: auto;
    }
    .thoughts-heading {
      font-size: 36px;
    }
    /* Still horizontal but tighter */
    .thoughts-cards-row {
      gap: 24px;
    }
    .thoughts-title {
      font-size: 15px;
    }
    .thoughts-desc {
      font-size: 14px;
      height: auto;
      max-width: 100%;
    }
    .thoughts-text-block {
      padding-top: 24px;
    }
  }

  /* ══════════════════════════════════════════
     MOBILE  (< 600px)  — exact Figma values
     Container: 393px, pad 36px T/B, 20px L/R
     Cards stacked vertically, gap 60px
     Each card: vertical, gap 30px (image → text)
     Image: 353×234px (full width minus 2×20px)
     Text gap (title→desc): 12px
     Title: Unbounded 500 16px 150%
     Desc:  Poppins   400 14px 150% #747476
  ══════════════════════════════════════════ */
  @media (max-width: 599px) {
    .thoughts-section {
      padding: 36px 20px;
      gap: 60px;           /* gap between cards */
    }
    .thoughts-header {
      height: auto;
    }
    .thoughts-heading {
      font-size: 24px;     
      font-family: 'Ultra', sans-serif;
      font-weight: 400;
    }
    .thoughts-browse {
      font-size: 14px;
      color:#FFFFFF;
    }

    /* Stack cards vertically */
    .thoughts-cards-row {
      flex-direction: column;
      gap: 30px;           /* Figma: gap between card items = 40px */
    }

    /* Card internal: gap 30px between image and text block */
    .thoughts-card {
      gap: 30px;
    }

    /* Image: full width × 234px height (353×234 in Figma) */
    .thoughts-img-wrapper {
      width: 100%;
      aspect-ratio: 353 / 234;  /* Figma exact ratio */
    }

    /* Text block: gap 12px between title and description */
    .thoughts-text-block {
      padding-top: 0;      /* gap handled by card's gap: 30px */
      gap: 12px;
      display: flex;
      flex-direction: column;
    }

    /* Title: Unbounded 500 16px 150% */
    .thoughts-title {
      font-family: 'Unbounded', sans-serif;
      font-size: 16px;
      font-weight: 500;
      line-height: 150%;
      margin: 0;
    }

    /* Description: Poppins 400 14px 150% */
    .thoughts-desc {
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      font-weight: 400;
      line-height: 150%;
      color: #747476;
      height: auto;
      max-width: 100%;
      margin: 0;
    }
  }
`;

const ImageCard = ({ src, title, description }) => (
  <div className="thoughts-card-hover thoughts-card">
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
      <p className="thoughts-desc">{description}</p>
    </div>
  </div>
);

export default function ThoughtsSection() {
  return (
    <>
      <style>{styles}</style>
      <section className="thoughts-section">
        {/* Header */}
        <div className="thoughts-header">
          <h2 className="thoughts-heading">Thoughts</h2>
          <a href="/thoughts" className="thoughts-browse">
            Browse all ↗
          </a>
        </div>

        {/* Cards */}
        <div className="thoughts-cards-row">
          {allImages.map((img) => (
            <ImageCard key={img.id} {...img} />
          ))}
        </div>
      </section>
    </>
  );
}
