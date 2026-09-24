import React from "react";
import Title from "./Title";
import CarCard from "../components/CarCard";
import { assets, dummyCarData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const FeaturedSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-100 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        <Title
          title="Featured Vehicles"
          subTitle="Explore our selection of premium vehicles available for your next adventure"
        />

        <div className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {dummyCarData.slice(0, 6).map((car) => (
            <div
              key={car._id}
              className="h-full transition duration-300 hover:-translate-y-1"
            >
              <CarCard car={car} />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            navigate("/cars");
            window.scrollTo(0, 0);
          }}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-primary-dull focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <span>Explore all Cars</span>
          <img src={assets.arrow_icon} alt="" className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
};

export default FeaturedSection;
