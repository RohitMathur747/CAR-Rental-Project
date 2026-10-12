import { useState } from "react";
import { assets, dummyCarData } from "../../assets/assets";

const initialCars = dummyCarData.slice(0, 4).map((car) => ({
  ...car,
  id: car._id,
  name: `${car.brand.trim()} ${car.model}`,
  price: car.pricePerDay,
  isAvailable: car.isAvailable ?? car.isAvaliable,
}));

const ManageCars = () => {
  const [cars, setCars] = useState(initialCars);
  const [selectedCar, setSelectedCar] = useState(null);

  const toggleAvailability = (id) => {
    setCars((currentCars) =>
      currentCars.map((car) =>
        car.id === id ? { ...car, isAvailable: !car.isAvailable } : car,
      ),
    );
    setSelectedCar((currentCar) =>
      currentCar?.id === id
        ? { ...currentCar, isAvailable: !currentCar.isAvailable }
        : currentCar,
    );
  };

  const deleteCar = (id) => {
    setCars((currentCars) => currentCars.filter((car) => car.id !== id));
    setSelectedCar((currentCar) => (currentCar?.id === id ? null : currentCar));
  };

  return (
    <main className="min-w-0 flex-1 bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-950 sm:text-3xl">
            Manage Cars
          </h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            View all listed cars, update their details, or remove them from the
            booking platform.
          </p>
        </header>

        <section
          aria-label="Listed cars"
          className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Car
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cars.map((car) => (
                  <tr
                    key={car.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-semibold text-gray-900"
                    >
                      <p className="font-semibold">
                        {car.brand}
                        {car.model}
                      </p>
                      <p className="font-light">
                        {car.seating_capacity} . {car.transmission} .{" "}
                        {car.fuel_type}
                      </p>
                    </th>
                    <td className="px-6 py-4 text-gray-600">{car.category}</td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-800">
                      ${car.price}/day
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => toggleAvailability(car.id)}
                        aria-pressed={car.isAvailable}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                          car.isAvailable
                            ? "bg-green-50 text-green-700 hover:bg-green-100"
                            : "bg-red-50 text-red-700 hover:bg-red-100"
                        }`}
                      >
                        {car.isAvailable ? "Available" : "Not Available"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedCar(car)}
                          aria-label={`View ${car.name}`}
                          title="View car details"
                          className="rounded-lg p-2 transition-colors hover:bg-blue-50"
                        >
                          <img
                            src={assets.eye_icon}
                            alt=""
                            className="h-10 w-10"
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteCar(car.id)}
                          aria-label={`Delete ${car.name}`}
                          title="Delete car"
                          className="rounded-lg p-2 transition-colors hover:bg-red-50"
                        >
                          <img
                            src={assets.delete_icon}
                            alt=""
                            className="h-10 w-10"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {cars.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-sm text-gray-500"
                    >
                      No cars are currently listed.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {selectedCar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4"
          onClick={() => setSelectedCar(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="car-details-title"
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="car-details-title"
                  className="text-xl font-semibold text-gray-950"
                >
                  {selectedCar.name}
                </h2>
                <p className="mt-1 text-sm text-gray-500">Car details</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCar(null)}
                aria-label="Close car details"
                className="rounded-lg px-2 py-1 text-xl leading-none text-gray-500 hover:bg-gray-100"
              >
                &times;
              </button>
            </div>
            <dl className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Category</dt>
                <dd className="font-medium text-gray-900">
                  {selectedCar.category}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Price</dt>
                <dd className="font-medium text-gray-900">
                  ${selectedCar.price}/day
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Status</dt>
                <dd className="font-medium text-gray-900">
                  {selectedCar.isAvailable ? "Available" : "Not Available"}
                </dd>
              </div>
            </dl>
          </section>
        </div>
      )}
    </main>
  );
};

export default ManageCars;
