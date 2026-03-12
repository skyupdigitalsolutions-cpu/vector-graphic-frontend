import { useState } from "react";
import ThoughtsHeading from "../Components/Thoughts/ThoughtsHeading";
import WorkImage from "../Components/WorkImage";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import { SubBlogPage } from "../Components/Thoughts/SubBlogPage";
import CTASection from "../Components/CTASection";

export const Thoughts = () => {
  const [activeBlogId, setActiveBlogId] = useState(null);

  const handleBlogClick = (id) => {
    setActiveBlogId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setActiveBlogId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Sub-blog view ──
  if (activeBlogId !== null) {
    return (
      <>
        <Nav />
        <SubBlogPage blogId={activeBlogId} onBack={handleBack} />
        <Footer />
      </>
    );
  }

  // ── Listing view ──
  return (
    <>
      <Nav />
      <ThoughtsHeading />
      <WorkImage onCardClick={handleBlogClick} />
      <CTASection heading="Explore smart solutions to grow your brand." subheading="Discover smart digital strategies and innovative solutions to grow your brand, reach more customers, and achieve lasting business success."/>
      <Footer />
    </>
  );
};