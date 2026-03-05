import React from "react";
import ThoughtsHeading from "../Components/Thoughts/ThoughtsHeading";
import WorkImage from "../Components/WorkImage";
import WorkCTA from "../Components/Work/WorkCTA";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";

export const Thoughts = () => {
  return (
    <>
      <Nav />
      <ThoughtsHeading />
      <WorkImage />
      <WorkCTA />
      <Footer />
    </>
  );
};
