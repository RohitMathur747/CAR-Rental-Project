import { useState } from "react";
import { assets } from "../../assets/assets.js";

const fieldClassName =
  "mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-blue-100";

const AddCar = () => {
  const [imageName, setImageName] = useState("");

  const handleImageChange = (event) => {
    setImageName(event.target.files?.[0]?.name || "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main className="min-w-0 flex-1 bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-7">
          <h1 className="text-2xl font-semibold text-gray-950 sm:text-3xl">
            Create a New Car
          </h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Fill in details to list new car for booking, including pricing,
            availability, and car specifications.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8"
        >
          <div>
            <label
              htmlFor="car-image"
              className="flex min-h-24 cursor-pointer items-center gap-5 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-5 py-4 transition hover:border-primary hover:bg-blue-50/50"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                >
                  <path
                    d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 14v5h14v-5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-gray-900">
                  Upload a picture of your car
                </span>
                <span className="mt-1 block truncate text-sm text-gray-500">
                  {imageName || "Choose an image file to upload"}
                </span>
              </span>
            </label>
            <input
              id="car-image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="sr-only"
            />
          </div>

          <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="brand"
                className="text-sm font-medium text-gray-700"
              >
                Brand
              </label>
              <input
                id="brand"
                name="brand"
                type="text"
                placeholder="e.g. Toyota"
                required
                className={fieldClassName}
              />
            </div>
            <div>
              <label
                htmlFor="model"
                className="text-sm font-medium text-gray-700"
              >
                Model
              </label>
              <input
                id="model"
                name="model"
                type="text"
                placeholder="e.g. Corolla"
                required
                className={fieldClassName}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-3">
            <div>
              <label
                htmlFor="year"
                className="text-sm font-medium text-gray-700"
              >
                Year
              </label>
              <input
                id="year"
                name="year"
                type="number"
                min="1886"
                max={new Date().getFullYear() + 1}
                placeholder="e.g. 2024"
                required
                className={fieldClassName}
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="text-sm font-medium text-gray-700"
              >
                Daily Price ($)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g. 75"
                required
                className={fieldClassName}
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <input
                id="category"
                name="category"
                type="text"
                placeholder="e.g. SUV"
                required
                className={fieldClassName}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-3">
            <div>
              <label
                htmlFor="transmission"
                className="text-sm font-medium text-gray-700"
              >
                Transmission
              </label>
              <input
                id="transmission"
                name="transmission"
                type="text"
                placeholder="e.g. Automatic"
                required
                className={fieldClassName}
              />
            </div>
            <div>
              <label
                htmlFor="fuel-type"
                className="text-sm font-medium text-gray-700"
              >
                Fuel Type
              </label>
              <input
                id="fuel-type"
                name="fuelType"
                type="text"
                placeholder="e.g. Hybrid"
                required
                className={fieldClassName}
              />
            </div>
            <div>
              <label
                htmlFor="seating-capacity"
                className="text-sm font-medium text-gray-700"
              >
                Seating Capacity
              </label>
              <input
                id="seating-capacity"
                name="seatingCapacity"
                type="number"
                min="1"
                placeholder="e.g. 5"
                required
                className={fieldClassName}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="location"
              className="text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="Enter your car's location"
              required
              className={fieldClassName}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder="Describe your car"
              required
              className={`${fieldClassName} resize-y`}
            />
          </div>

          <div className="flex justify-start border-t border-gray-100 pt-5">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dull focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <img src={assets.tick_icon} alt="" className="h-4 w-4 shrink-0" />
              List Your Car
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddCar;
