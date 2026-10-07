import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { useLocation, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Car from "./pages/Car";
import CarDetails from "./pages/CarDetails";
import MyBooking from "./pages/MyBooking";
import Footer from "./components/Footer";
import Layout from "../src/pages/Owner/Layout";
import Dashboard from "./pages/Owner/Dashboard";
import AddCar from "./pages/Owner/AddCar";
import ManageCars from "./pages/Owner/ManageCars";
import ManageBookings from "./pages/Owner/ManageBooking";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith("/owner");

  return (
    <>
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car-deatils/:id" element={<CarDetails />} />
        <Route path="/car-details/:id" element={<CarDetails />} />

        <Route path="/cars" element={<Car />} />
        <Route path="/my-bookings" element={<MyBooking />} />
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
          <Route path="manage-car" element={<ManageCars />} />
          <Route path="manage-booking" element={<ManageBookings />} />
        </Route>
      </Routes>

      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
