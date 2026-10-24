import { useCallback, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import { motion } from "motion/react";

const MyBooking = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 3;
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { axios, user, currency } = useAppContext();
  const pageCount = Math.ceil(bookings.length / bookingsPerPage);
  const firstBookingIndex = (currentPage - 1) * bookingsPerPage;
  const visibleBookings = bookings.slice(
    firstBookingIndex,
    firstBookingIndex + bookingsPerPage,
  );

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.slice(0, 10).split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const fetchMyBookings = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/bookings/user");
      if (data.success) {
        setBookings(data.bookings);
        setCurrentPage(1);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  }, [axios]);

  useEffect(() => {
    if (user) {
      fetchMyBookings();
    } else {
      setBookings([]);
      setCurrentPage(1);
    }
  }, [fetchMyBookings, user]);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 border-b border-gray-200 pb-6"
        >
          <h1 className="text-3xl font-semibold text-gray-950 sm:text-4xl">
            My Bookings
          </h1>
          <p className="mt-3 text-gray-600">
            View and manage your car bookings
          </p>
        </motion.header>

        <section aria-label="Your car bookings" className="space-y-5">
          {isLoading ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-8 text-center text-gray-600"
            >
              Loading your bookings...
            </motion.p>
          ) : visibleBookings.length > 0 ? (
            visibleBookings.map((booking, index) => {
              const bookingNumber = firstBookingIndex + index + 1;
              const status = booking.status || "pending";
              const isConfirmed = status.toLowerCase() === "confirmed";

              if (!booking.car) {
                return null;
              }

              return (
                <motion.article
                  key={booking._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="grid overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:grid-cols-[320px_minmax(0,1fr)_200px]"
                >
                  <div className="border-b border-gray-200 p-2.5 lg:border-b-0 lg:border-r">
                    <img
                      src={booking.car.image}
                      alt={`${booking.car.brand} ${booking.car.model}`}
                      className="h-50 w-full rounded-lg object-cover"
                    />
                    <div className="px-2 pb-2 pt-4">
                      <h2 className="text-lg font-semibold text-gray-950">
                        {booking.car.brand} {booking.car.model}
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        {booking.car.category} · {booking.car.year}
                      </p>
                    </div>
                  </div>

                  <div className="min-w-0 p-5 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="font-semibold text-gray-950">
                        # Booking {bookingNumber}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                          isConfirmed
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {status}
                      </span>
                    </div>

                    <div className="mt-5">
                      <p className="text-xs font-semibold uppercase text-gray-500">
                        Rental period
                      </p>
                      <p className="mt-2 flex items-center gap-2 text-sm font-medium text-gray-900">
                        <img
                          src={assets.calendar_icon_colored}
                          alt=""
                          className="h-4 w-4 shrink-0"
                        />
                        {formatDate(booking.pickupDate)}
                        <span className="text-gray-400">to</span>
                        {formatDate(booking.returnDate)}
                      </p>
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase text-gray-500">
                          Pickup location
                        </p>
                        <p className="mt-2 flex items-center gap-2 text-sm text-gray-800">
                          <img
                            src={assets.location_icon}
                            alt=""
                            className="h-4 w-4 shrink-0"
                          />
                          {booking.car.location}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase text-gray-500">
                          Return location
                        </p>
                        <p className="mt-2 flex items-center gap-2 text-sm text-gray-800">
                          <img
                            src={assets.location_icon}
                            alt=""
                            className="h-4 w-4 shrink-0"
                          />
                          {booking.car.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-between gap-4 border-t border-gray-200 bg-gray-50 p-5 lg:flex-col lg:items-start lg:justify-center lg:border-l lg:border-t-0 lg:p-6">
                    <div>
                      <p className="text-sm text-gray-500">Total price</p>
                      <p className="mt-1 text-2xl font-semibold text-gray-950">
                        {currency}
                        {booking.price}
                      </p>
                    </div>
                    <div className="text-right lg:text-left">
                      <p className="text-xs font-semibold uppercase text-gray-500">
                        Booked on
                      </p>
                      <p className="mt-1 text-sm text-gray-800">
                        {formatDate(booking.createdAt)}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-8 text-center text-gray-600"
            >
              No bookings found.
            </motion.p>
          )}
        </section>

        {pageCount > 1 && (
          <motion.nav
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            aria-label="Booking pages"
            className="mt-8 flex items-center justify-center gap-2"
          >
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  aria-current={currentPage === page ? "page" : undefined}
                  className={`h-10 min-w-10 rounded-md px-3 text-sm font-medium ${
                    currentPage === page
                      ? "bg-primary text-white"
                      : "border border-gray-300 text-gray-700 hover:bg-white"
                  }`}
                >
                  {page}
                </button>
              ),
            )}
            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) => Math.min(pageCount, page + 1))
              }
              disabled={currentPage === pageCount}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </motion.nav>
        )}
      </div>
    </main>
  );
};

export default MyBooking;
