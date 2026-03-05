import React from "react";
import HH6 from "../Components/Home/HH6";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import OurWork from "../Components/Home/OurWork";
import ThoughtsSection from "../Components/Home/HomeThoughts";
import { HeroCarousel } from "../Components/HeroCaraousel";
import CTASection from "../Components/CTASection";
import A5 from "../Components/About/A5";
import Card from "../Components/Home/Card";
import ServicesSection from "../Components/ServicesSection";

const Home = () => {
  return (
    <>
      <Nav />
      <HeroCarousel />
      <Card />
      <ServicesSection />
      <OurWork />
      <ThoughtsSection />
      <A5 />
      <HH6 />
      <CTASection />
      <Footer />
    </>
  );
};

export default Home;
