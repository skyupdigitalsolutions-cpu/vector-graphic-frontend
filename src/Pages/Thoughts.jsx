import { useState } from "react";
import ThoughtsHeading from "../Components/Thoughts/ThoughtsHeading";
import WorkImage from "../Components/WorkImage";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import { SubBlogPage } from "../Components/Thoughts/SubBlogPage";
import CTASection from "../Components/CTASection";
import { useEffect } from "react";

export const Thoughts = () => {
  const [activeBlogId, setActiveBlogId] = useState(null);

 
useEffect(() => {
  const shouldScrollTop = sessionStorage.getItem("scrollToTop");
  if (shouldScrollTop) {
    sessionStorage.removeItem("scrollToTop");
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
  }

  const storedId = sessionStorage.getItem("openBlogId");
  if (storedId) {
    sessionStorage.removeItem("openBlogId");
    setActiveBlogId(Number(storedId));
    return;
  }
  const params = new URLSearchParams(window.location.search);
  const blogId = params.get("blogId");
  if (blogId) setActiveBlogId(Number(blogId));
}, []);

  const handleBlogClick = (id) => {
    setActiveBlogId(id);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleBack = () => {
    setActiveBlogId(null);
    window.scrollTo({ top: 0, behavior: "instant" });
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
      <CTASection heading="Explore smart solutions to grow your brand." subheading="Discover smart digital strategies and innovative solutions to grow your brand, reach more customers, and achieve lasting business success."  backgroundColor="#FFF1F1"/>
      <Footer />
    </>
  );
};
