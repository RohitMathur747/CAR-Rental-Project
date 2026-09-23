import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-semibold">
        Luxury Cars on Rent
      </h1>
      <form className="mt-6 w-full max-w-5xl rounded-lg bg-white p-3 shadow-md">
        <div
          className="grid w-full gap-3 rounded-2xl border border-slate-200
         bg-white p-3 shadow-sm sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_auto_auto] lg:items-end"
        >
          <div className="flex min-w-0 w-full flex-col gap-2">
            <select
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            >
              <option value="">Pickup Location</option>
              {cityList.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <p className="px-1 text-sm text-gray-500">
              {pickupLocation || "Please Select Location"}
            </p>
          </div>

          <div className="flex min-w-0 flex-col items-start gap-2">
            <label htmlFor="pickup-Date">Pickup Date</label>
            <input
              type="date"
              id="pickup-Date"
              className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          <div className="flex min-w-0 flex-col items-start gap-2">
            <label htmlFor="return-Date">Return Date</label>
            <input
              type="date"
              id="return-Date"
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>

          {/* <button
            type="button"
            className="w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Book Now
          </button> */}
        </div>
      </form>
      <img
        src={assets.main_car}
        alt="car"
        className="max-h-74 max-w-full object-contain"
      />
    </div>
  );
};

export default Hero;
