import React, { useEffect } from "react";
import NavbarOwner from "./NavbarOwner";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  const { isOwner, navigate } = useAppContext();

  useEffect(() => {
    if (!isOwner) {
      navigate("/");
    }
  }, [isOwner]);

  return (
    <div className="flex flex-col  min-h-screen w-full">
      <NavbarOwner />
      <div className="flex flex-1 w-full">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
