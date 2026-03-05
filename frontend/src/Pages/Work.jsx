import React from "react";
import WorkHeading from "../Components/Work/WorkHeading";
import WorkImage from "../Components/WorkImage";
import WorkCTA from "../Components/Work/WorkCTA";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Cloudy from "../Components/Work/Cloudy";
const Work = () => {
  return (
    <>
      <Nav />
      <WorkHeading />
      <WorkImage />
      <Cloudy />
      <WorkCTA />
      <Footer />
    </>
  );
};

export default Work;
