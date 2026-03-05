import React from "react";
import Nav from "../Components/Nav";
import HeroSection from "../Components/Service/Herosection";
import Imagesection from "../Components/Service/Imagesection";
import ServicesSection from "../Components/ServicesSection";
import WorkProcess from "../Components/Service/WorkProcess";
import ServiceExpertise from "../Components/Service/ServiceExpertise";
import CTASection from "../Components/CTASection";
import Footer from "../Components/Footer";
import { HeroCarousel } from "../Components/HeroCaraousel";

const Services = () => {
  return (
    <>
      <Nav />
      <HeroCarousel />
      <HeroSection />
      <Imagesection />
      <ServicesSection />
      <WorkProcess />
      <ServiceExpertise />
      <CTASection />
      <Footer />
    </>
  );
};

export default Services;
