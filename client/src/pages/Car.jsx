import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CarCard from "../components/CarCard";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import { motion } from "motion/react";

const Car = () => {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState("All categories");

  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");
  const hasSearchData = Boolean(pickupLocation && pickupDate && returnDate);

  const { cars, axios } = useAppContext();
  const [searchAvailableCars, setSearchAvailableCars] = useState([]);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

  useEffect(() => {
    if (!hasSearchData) {
      setSearchAvailableCars([]);
      setIsCheckingAvailability(false);
      return;
    }

    let isCurrentRequest = true;
    setIsCheckingAvailability(true);

    const checkAvailability = async () => {
      try {
        const { data } = await axios.post("/api/bookings/check-availability", {
          location: pickupLocation,
          pickupDate,
          returnDate,
        });

        if (!data.success) {
          throw new Error(data.message || "Unable to check car availability");
        }

        if (isCurrentRequest) {
          setSearchAvailableCars(data.availableCars);
        }
      } catch (error) {
        if (isCurrentRequest) {
          setSearchAvailableCars([]);
          toast.error(error.response?.data?.message || error.message);
        }
      } finally {
        if (isCurrentRequest) {
          setIsCheckingAvailability(false);
        }
      }
    };

    checkAvailability();

    return () => {
      isCurrentRequest = false;
    };
  }, [axios, hasSearchData, pickupDate, pickupLocation, returnDate]);

  const availableCars = (hasSearchData ? searchAvailableCars : cars).filter(
    (car) => car.isAvailable || car.isAvaliable,
  );
  const categories = [...new Set(availableCars.map((car) => car.category))];
  const normalizedSearch = search.trim().toLowerCase();
  const filteredCars = availableCars.filter((car) => {
    const searchableDetails = [
      car.brand,
      car.model,
      car.category,
      car.year,
      car.fuel_type,
      car.transmission,
      car.description,
      ...(car.features || []),
    ]
      .join(" ")
      .toLowerCase();

    return (
      (category === "All categories" || car.category === category) &&
      searchableDetails.includes(normalizedSearch)
    );
  });

  return (
    <main className="min-h-screen w-full bg-gray-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center border-b border-gray-200 pb-8 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-3xl font-semibold text-gray-950 sm:text-4xl"
          >
            Available Cars
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="mt-3 max-w-2xl leading-6 text-gray-600"
          >
            Browse our selection of premium vehicles for your next adventure
          </motion.p>

          <div className="relative mt-7 flex w-full max-w-3xl items-center gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
            >
              <img
                src={assets.search_icon}
                alt=""
                className="h-5 w-5 shrink-0"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by make, model or feature"
                aria-label="Search cars by make, model or feature"
                className="w-full min-w-0 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />
            </motion.div>
            <motion.button
              type="button"
              aria-label="Toggle car filters"
              aria-expanded={showFilters}
              aria-controls="car-filters"
              onClick={() => setShowFilters((visible) => !visible)}
              whileTap={{ scale: 0.96 }}
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                showFilters
                  ? "border-primary bg-primary/5"
                  : "border-gray-300 bg-white hover:bg-gray-50"
              }`}
            >
              <img src={assets.filter_icon} alt="" className="h-5 w-5" />
            </motion.button>

            {showFilters && (
              <motion.div
                id="car-filters"
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-14 z-10 w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
              >
                <label
                  htmlFor="car-category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="car-category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option>All categories</option>
                  {categories.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </motion.div>
            )}
          </div>
        </motion.section>

        <section className="pt-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mb-6 flex items-center justify-between gap-4"
          >
            <h2 className="text-sm font-semibold text-gray-950">
              Showing {filteredCars.length}{" "}
              {filteredCars.length === 1 ? "car" : "cars"}
            </h2>
            {(search || category !== "All categories") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All categories");
                }}
                className="text-sm font-medium text-primary hover:underline"
              >
                Clear filters
              </button>
            )}
          </motion.div>

          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredCars.map((car, index) => (
                <motion.div
                  key={car._id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                >
                  <Link
                    to={`/car-deatils/${car._id}`}
                    className="block h-full rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <CarCard car={car} />
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="rounded-lg border border-dashed border-gray-300 px-5 py-12 text-center text-gray-600"
            >
              {isCheckingAvailability
                ? "Checking car availability..."
                : "No cars match your search. Try another make, model, or feature."}
            </motion.p>
          )}
        </section>
      </div>
    </main>
  );
};

export default Car;
