import { assets, dummyCarData, dummyMyBookingsData } from "../../assets/assets";

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const stats = [
    {
      label: "Total Cars",
      value: dummyCarData.length,
      icon: assets.carIconColored,
    },
    {
      label: "Total Bookings",
      value: dummyMyBookingsData.length,
      icon: assets.listIconColored,
    },
    {
      label: "Pending Bookings",
      value: dummyMyBookingsData.filter(
        (booking) => booking.status === "pending",
      ).length,
      icon: assets.cautionIconColored,
    },
    {
      label: "Completed Bookings",
      value: dummyMyBookingsData.filter(
        (booking) => booking.status === "completed",
      ).length,
      icon: assets.check_icon,
    },
  ];

  const recentBookings = dummyMyBookingsData.slice(0, 4);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.slice(0, 10).split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const statusStyles = {
    confirmed: "bg-green-50 text-green-700",
    pending: "bg-amber-50 text-amber-700",
    completed: "bg-blue-50 text-blue-700",
  };

  return (
    <main className="min-w-0 flex-1 bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header>
          <h1 className="text-2xl font-semibold text-gray-950 sm:text-3xl">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Monitor overall platform performance, including total cars,
            bookings, revenue, and recent activities.
          </p>
        </header>

        <section
          aria-label="Platform statistics"
          className="grid w-full grid-cols-4 gap-3 sm:gap-4"
        >
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="flex h-28 min-w-0 items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white p-3 shadow-sm sm:h-32 sm:p-5"
            >
              <div className="min-w-0">
                <p className="text-xs font-medium leading-tight text-gray-500 sm:text-sm">
                  {stat.label}
                </p>
                <p className="mt-2 text-2xl font-semibold text-gray-950 sm:text-3xl">
                  {stat.value}
                </p>
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 sm:h-11 sm:w-11">
                <img
                  src={stat.icon}
                  alt=""
                  className="h-5 w-5 object-contain sm:h-6 sm:w-6"
                />
              </div>
            </article>
          ))}
        </section>

        <section
          aria-label="Recent activity and revenue"
          className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
        >
          <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-gray-950">
              Recent Bookings
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Latest customer bookings
            </p>

            <ul className="mt-5 divide-y divide-gray-100">
              {recentBookings.map((booking) => {
                const status = booking.status?.toLowerCase() || "pending";

                return (
                  <li
                    key={booking._id}
                    className="flex flex-wrap items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gray-50">
                        <img
                          src={assets.calendar_icon_colored}
                          alt=""
                          className="h-5 w-5"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {booking.car.brand} {booking.car.model}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Booked {formatDate(booking.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="ml-14 flex items-center gap-3 sm:ml-0">
                      <p className="text-sm font-semibold text-gray-900">
                        {currency}
                        {booking.price}
                      </p>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                          statusStyles[status] || statusStyles.pending
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <article className="flex min-h-64 min-w-0 flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-gray-950">
              Monthly Revenue
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Revenue for the current month
            </p>
            <div className="mt-8 flex flex-1 items-center justify-center rounded-lg bg-blue-50 px-4 py-8">
              <p className="text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
                {currency}1,060
              </p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
