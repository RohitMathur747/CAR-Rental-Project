import React from "react";
import { assets, dummyUserData } from "../../assets/assets";
import { Link } from "react-router-dom";

const NavbarOwner = () => {
  const user = dummyUserData;

  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-3">
      <Link to="/">
        <img src={assets.logo} alt="" className="h-7" />
      </Link>
      <p>Welcome, {user.name || "owner"}</p>
    </div>
  );
};

export default NavbarOwner;
