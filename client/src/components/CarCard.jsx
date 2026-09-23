import { assets } from "../assets/assets";

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="h-full w-full object-cover"
        />
        {(car.isAvailable || car.isAvaliable) && (
          <p className="absolute left-4 top-4 rounded-full bg-primary/90 px-2.5 py-1 text-xs text-white">
            Available Now
          </p>
        )}

        <div className="absolute bottom-4 left-4 rounded-md bg-black/70 px-3 py-2 text-white">
          <span className="text-lg font-semibold">
            {currency}
            {car.pricePerDay}
          </span>
          <span className="text-sm text-white/80"> / day</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {car.brand} {car.model}
            </h3>
            <p className="text-sm text-gray-500">
              {car.category} · {car.year}
            </p>
          </div>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-x-3 gap-y-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <img src={assets.users_icon} alt="" className="h-4 w-4" />
            <span>{car.seating_capacity} Seats</span>
          </div>

          <div className="flex items-center gap-2">
            <img src={assets.fuel_icon} alt="" className="h-4 w-4" />
            <span>{car.fuel_type}</span>
          </div>

          <div className="flex items-center gap-2">
            <img src={assets.car_icon} alt="" className="h-4 w-4" />
            <span>{car.transmission}</span>
          </div>

          <div className="flex items-center gap-2">
            <img src={assets.location_icon} alt="" className="h-4 w-4" />
            <span>{car.location}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CarCard;
