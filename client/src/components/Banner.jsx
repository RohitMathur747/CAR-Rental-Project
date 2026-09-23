import React from "react";
import { assets } from "../assets/assets";

const Banner = () => {
  return (
    <section className="bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between overflow-hidden rounded-2xl bg-slate-900 px-6 py-10 shadow-xl sm:px-10 lg:flex-row lg:px-16 lg:py-12">
        <div className="max-w-xl text-center text-white lg:text-left">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            Partner with carRental
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Do You Own a Luxury Car?
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300">
            Monetize your vehicle effortlessly by listing it on carRental.
          </p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            We take care of insurance, driver verification, and secure payments
            so you can earn passive income stress-free.
          </p>
          <button
            type="button"
            className="mt-7 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-md transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            List Your Car
          </button>
        </div>
        <div className="mt-10 flex w-full justify-center lg:mt-0 lg:w-2/5 lg:justify-end">
          <img
            src={assets.banner_car_image}
            alt="Luxury car"
            className="h-auto max-h-52 w-full max-w-md object-contain drop-shadow-2xl sm:max-h-64"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
