import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const bookingStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];

const statusStyles = {
  pending: "bg-amber-50 text-amber-700",
  confirmed: "bg-green-50 text-green-700",
  completed: "bg-blue-50 text-blue-700",
  cancelled: "bg-red-50 text-red-700",
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`;
};

const ManageBooking = () => {
  const {
    axios,
    currency,
    fetchOwnerBookings,
    isOwner,
    ownerBookings: bookings,
    setOwnerBookings,
  } = useAppContext();

  useEffect(() => {
    if (isOwner) {
      fetchOwnerBookings();
    }
  }, [fetchOwnerBookings, isOwner]);

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post("/api/bookings/change-status", {
        bookingId,
        status: status.toLowerCase(),
      });
      if (data.success) {
        setOwnerBookings((currentBookings) =>
          currentBookings.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: status.toLowerCase() }
              : booking,
          ),
        );
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <main className="min-w-0 flex-1 bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-950 sm:text-3xl">
            Manage Booking
          </h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Track all customer bookings, approve or cancel requests, and manage
            booking statuses.
          </p>
        </header>

        <section
          aria-label="Customer bookings"
          className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Car
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Date Range
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Payment
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
                {bookings.map((booking) => {
                  const status = booking.status?.toLowerCase() || "pending";

                  return (
                    <tr
                      key={booking._id}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-semibold text-gray-900"
                      >
                        {booking.car
                          ? `${booking.car.brand.trim()} ${booking.car.model}`
                          : "Car unavailable"}
                      </th>
                      <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                        {formatDate(booking.pickupDate)} to{" "}
                        {formatDate(booking.returnDate)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-800">
                        {currency}
                        {booking.price}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700">
                          Offline
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
                            statusStyles[status] || statusStyles.pending
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <label
                          className="sr-only"
                          htmlFor={`booking-${booking._id}`}
                        >
                          Update status for{" "}
                          {booking.car
                            ? `${booking.car.brand.trim()} ${booking.car.model}`
                            : "unavailable car"}
                        </label>
                        <select
                          id={`booking-${booking._id}`}
                          value={
                            bookingStatuses.find(
                              (bookingStatus) =>
                                bookingStatus.toLowerCase() === status,
                            ) || "Pending"
                          }
                          onChange={(event) =>
                            updateBookingStatus(booking._id, event.target.value)
                          }
                          disabled={!booking.car}
                          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                        >
                          {bookingStatuses.map((bookingStatus) => (
                            <option key={bookingStatus} value={bookingStatus}>
                              {bookingStatus}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
                {bookings.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-sm text-gray-500"
                    >
                      No bookings to display.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ManageBooking;
