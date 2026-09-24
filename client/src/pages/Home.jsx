import React from "react";
import Hero from "../components/Hero.jsx";
import CarCard from "../components/CarCard.jsx";
import { dummyCarData } from "../assets/assets.js";
import FeaturedSection from "../components/FeaturedSection.jsx";
import Banner from "../components/Banner.jsx";
import Testimonial from "../components/Testimonial.jsx";
import NewsLetter from "../components/NewsLetter.jsx";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedSection />
      <Banner />
      <Testimonial />
      <NewsLetter />
    </>
  );
};

export default Home;
