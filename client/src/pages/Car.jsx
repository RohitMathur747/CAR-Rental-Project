import { useState } from "react";
import { Link } from "react-router-dom";
import CarCard from "../components/CarCard";
import { assets, dummyCarData } from "../assets/assets";

const Car = () => {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState("All categories");

  const availableCars = dummyCarData.filter(
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
        <section className="flex flex-col items-center border-b border-gray-200 pb-8 text-center">
          <h1 className="text-3xl font-semibold text-gray-950 sm:text-4xl">
            Available Cars
          </h1>
          <p className="mt-3 max-w-2xl leading-6 text-gray-600">
            Browse our selection of premium vehicles for your next adventure
          </p>

          <div className="relative mt-7 flex w-full max-w-3xl items-center gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
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
            </div>
            <button
              type="button"
              aria-label="Toggle car filters"
              aria-expanded={showFilters}
              aria-controls="car-filters"
              onClick={() => setShowFilters((visible) => !visible)}
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                showFilters
                  ? "border-primary bg-primary/5"
                  : "border-gray-300 bg-white hover:bg-gray-50"
              }`}
            >
              <img src={assets.filter_icon} alt="" className="h-5 w-5" />
            </button>

            {showFilters && (
              <div
                id="car-filters"
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
              </div>
            )}
          </div>
        </section>

        <section className="pt-8">
          <div className="mb-6 flex items-center justify-between gap-4">
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
          </div>

          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredCars.map((car) => (
                <Link
                  key={car._id}
                  to={`/car-deatils/${car._id}`}
                  className="block h-full rounded-xl transition duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <CarCard car={car} />
                </Link>
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-gray-300 px-5 py-12 text-center text-gray-600">
              No cars match your search. Try another make, model, or feature.
            </p>
          )}
        </section>
      </div>
    </main>
  );
};

export default Car;
