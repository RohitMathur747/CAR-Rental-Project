import { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { delay, motion } from "motion/react";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");

  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } =
    useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams({
      pickupLocation,
      pickupDate,
      returnDate,
    });
    navigate(`/cars?${searchParams.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 py-8"
    >
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl md:text-5xl font-semibold"
      >
        Luxury Cars on Rent
      </motion.h1>
      <motion.form
        initial={{ scale: 0.95, opacity: 0, y: 50 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onSubmit={handleSearch}
        className="mt-6 w-full max-w-5xl rounded-lg bg-white p-3 shadow-md"
      >
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
              value={pickupDate}
              onChange={(event) => setPickupDate(event.target.value)}
              required
            />
          </div>

          <div className="flex min-w-0 flex-col items-start gap-2">
            <label htmlFor="return-Date">Return Date</label>
            <input
              type="date"
              id="return-Date"
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={pickupDate || new Date().toISOString().split("T")[0]}
              value={returnDate}
              onChange={(event) => setReturnDate(event.target.value)}
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </motion.button>

          {/* <button
            type="button"
            className="w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Book Now
          </button> */}
        </div>
      </motion.form>
      <motion.img
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        src={assets.main_car}
        alt="car"
        className="max-h-74 max-w-full object-contain"
      />
    </motion.div>
  );
};

export default Hero;
