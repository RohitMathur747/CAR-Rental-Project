import { useState } from "react";
import { assets, menuLinks } from "../assets/assets.js";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const isHome = location.pathname === "/";

  const navigate = useNavigate();

  return (
    <div
      className={`relative z-50 flex items-center justify-between border-b border-slate-200 
        px-6 py-4 text-slate-600 transition-colors md:px-16 lg:px-24 xl:px-32 
        ${isHome ? "bg-light" : "bg-white"}`}
    >
      <Link to="/" onClick={() => setOpen(false)} aria-label="Go to homepage">
        <img src={assets.logo} alt="Car rental home" className="h-8 w-auto" />
      </Link>

      <div
        className={`absolute right-0 top-full flex w-full flex-col gap-5 border-t 
          border-slate-200 p-6 shadow-lg transition-transform duration-300 sm:static 
          sm:w-auto sm:translate-x-0 sm:flex-row sm:items-center sm:gap-8 sm:border-0 
          sm:p-0 sm:shadow-none ${isHome ? "bg-light" : "bg-white"} 
          ${open ? "translate-x-0" : "translate-x-full sm:translate-x-0"}`}
      >
        {menuLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setOpen(false)}
            className={`relative text-sm font-medium transition-colors hover:text-primary 
              ${location.pathname === link.path ? "text-primary" : "text-slate-600"}`}
          >
            {link.name}
          </Link>
        ))}

        <div
          className="flex w-full items-center gap-2 rounded-full border border-slate-200 
          bg-white px-4 py-2 shadow-sm sm:w-64"
        >
          <input
            type="text"
            aria-label="Search cars"
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none 
              placeholder:text-slate-400"
            placeholder="Search for cars, brands, models..."
          />
          <img src={assets.search_icon} alt="" className="h-4 w-4 shrink-0" />
        </div>

        <div className="flex w-full flex-col gap-3 border-t border-slate-200 pt-4 sm:hidden">
          <button
            className="w-full cursor-pointer text-left text-sm font-medium text-slate-600 hover:text-primary"
            onClick={() => {
              setOpen(false);
              navigate("/owner");
            }}
          >
            Dashboard
          </button>
          <button
            className="w-full cursor-pointer rounded-lg bg-primary px-8 py-2 text-sm text-white transition-all hover:bg-primary-dull"
            onClick={() => {
              setOpen(false);
              setShowLogin(true);
            }}
          >
            Login
          </button>
        </div>
      </div>

      <div className="hidden items-center gap-4 sm:flex">
        <button className="cursor-pointer " onClick={() => navigate("/owner")}>
          Dashboard
        </button>
        <button
          className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
          onClick={() => setShowLogin(true)}
        >
          Login
        </button>
      </div>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="sm:hidden cursor-pointer"
        aria-label="Menu"
        aria-expanded={open}
      >
        <img
          src={open ? assets.close_icon : assets.menu_icon}
          alt="menu"
          className="h-4 w-5"
        />
      </button>
    </div>
  );
};

export default Navbar;
