import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookingMessage, setBookingMessage] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  const {
    cars,
    axios,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    token,
    setShowLogin,
    currency,
  } = useAppContext();
  const car = cars.find((item) => item._id === id);
  const today = new Date().toISOString().split("T")[0];
  const pricePerDay = car?.price_per_day ?? car?.pricePerDay;
  const rentalDays =
    pickupDate && returnDate && returnDate > pickupDate
      ? Math.ceil(
          (new Date(`${returnDate}T00:00:00`) -
            new Date(`${pickupDate}T00:00:00`)) /
            (1000 * 60 * 60 * 24),
        )
      : 0;

  const handleBooking = async (event) => {
    event.preventDefault();

    if (!token) {
      setShowLogin(true);
      return;
    }

    if (!pickupDate || !returnDate || returnDate <= pickupDate) {
      toast.error("Select a return date after the pick-up date");
      return;
    }

    setIsBooking(true);
    setBookingMessage("");

    try {
      const { data } = await axios.post("/api/bookings/create", {
        car: id,
        pickupDate,
        returnDate,
      });

      if (!data.success) {
        throw new Error(data.message || "Unable to create booking");
      }

      setBookingMessage(data.message);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsBooking(false);
    }
  };

  return car ? (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="mx-auto mt-10 w-full max-w-7xl px-4 pb-16 sm:px-6 lg:mt-14 lg:px-8"
    >
      <motion.button
        type="button"
        onClick={() => navigate("/cars")}
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.98 }}
        className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-950"
      >
        <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65" />
        Back to all cars
      </motion.button>
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
        <motion.section
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="overflow-hidden rounded-xl bg-gray-100"
          >
            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              className="aspect-16/10 w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-6"
          >
            <h1 className="text-3xl font-semibold text-gray-950 sm:text-4xl">
              {car.brand} {car.model}
            </h1>
            <p className="mt-2 text-sm font-medium uppercase tracking-wider text-primary">
              {car.category} · {car.year}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.28 }}
            className="mt-8 grid grid-cols-2 gap-y-6 border-b border-gray-200 pb-8 sm:grid-cols-4"
          >
            <div>
              <p className="flex items-center gap-2 text-sm text-gray-500">
                <img src={assets.users_icon} alt="" className="h-4 w-4" />
                Seats
              </p>
              <p className="mt-1 font-medium text-gray-900">
                {car.seating_capacity} people
              </p>
            </div>
            <div>
              <p className="flex items-center gap-2 text-sm text-gray-500">
                <img src={assets.fuel_icon} alt="" className="h-4 w-4" />
                Engine
              </p>
              <p className="mt-1 font-medium text-gray-900">{car.fuel_type}</p>
            </div>
            <div>
              <p className="flex items-center gap-2 text-sm text-gray-500">
                <img src={assets.car_icon} alt="" className="h-4 w-4" />
                Transmission
              </p>
              <p className="mt-1 font-medium text-gray-900">
                {car.transmission}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-2 text-sm text-gray-500">
                <img src={assets.car_icon} alt="" className="h-4 w-4" />
                Model no.
              </p>
              <p className="mt-1 font-medium text-gray-900">
                {car.brand} {car.model}
              </p>
            </div>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.32 }}
            className="pt-7"
          >
            <h2 className="text-xl font-semibold text-gray-950">Car details</h2>
            <p className="mt-3 max-w-3xl leading-7 text-gray-600">
              {car.description}
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Located in {car.location}
            </p>
          </motion.section>

          {car.features?.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.38 }}
              className="mt-8 border-t border-gray-200 pt-7"
            >
              <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-950">
                <img src={assets.check_icon} alt="" className="h-5 w-5" />
                Features
              </h2>
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {car.features.map((feature, index) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.06 }}
                    className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-3 text-sm text-gray-700"
                  >
                    <img
                      src={assets.check_icon}
                      alt=""
                      className="h-4 w-4 shrink-0"
                    />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.section>
          )}
        </motion.section>

        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-8"
        >
          <div className="mb-6 flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-gray-950">
              {currency || "$"}
              {pricePerDay}
            </span>
            <span className="text-sm text-gray-500">per day</span>
          </div>

          <form onSubmit={handleBooking} className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Pick-up date
              <input
                type="date"
                required
                min={today}
                value={pickupDate}
                onChange={(event) => {
                  setPickupDate(event.target.value);
                  setReturnDate("");
                  setBookingMessage(null);
                }}
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-3 text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Return date
              <input
                type="date"
                required
                min={pickupDate || today}
                value={returnDate}
                onChange={(event) => {
                  setReturnDate(event.target.value);
                  setBookingMessage(null);
                }}
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-3 text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>

            {rentalDays > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex justify-between border-t border-gray-200 pt-4 text-sm text-gray-600"
              >
                <span>
                  {currency || "$"}
                  {pricePerDay} × {rentalDays}{" "}
                  {rentalDays === 1 ? "day" : "days"}
                </span>
                <span className="font-semibold text-gray-900">
                  {currency || "$"}
                  {pricePerDay * rentalDays}
                </span>
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isBooking}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-lg bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-dull focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {isBooking ? "Booking..." : "Book now"}
            </motion.button>
            <p className="text-center text-sm text-gray-500">
              No credit card details to reserve
            </p>
            {bookingMessage && (
              <p role="status" className="text-sm leading-5 text-gray-600">
                {bookingMessage}
              </p>
            )}
          </form>
        </motion.aside>
      </div>
    </motion.main>
  ) : (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto min-h-[50vh] max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <p className="text-gray-600">Car not found.</p>
      <motion.button
        type="button"
        onClick={() => navigate("/cars")}
        whileHover={{ x: -3 }}
        whileTap={{ scale: 0.98 }}
        className="mt-4 text-sm font-medium text-primary hover:underline"
      >
        Back to all cars
      </motion.button>
    </motion.main>
  );
};

export default CarDetails;
