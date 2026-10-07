import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { dummyUserData, ownerMenuLinks } from "../../assets/assets";

const Sidebar = () => {
  const location = useLocation();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white px-5 py-8">
      <div className="mb-9 flex flex-col items-center text-center">
        <label
          htmlFor="owner-profile-image"
          className="group relative mb-3 h-20 w-20 cursor-pointer overflow-hidden rounded-full border-2 border-gray-200"
        >
          <img
            src={imageUrl || dummyUserData.image}
            alt={`${dummyUserData.name}'s profile`}
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
            Change photo
          </span>
          <input
            id="owner-profile-image"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleImageChange}
          />
        </label>
        <p className="text-sm font-semibold text-gray-800">
          {dummyUserData.name}
        </p>
        <p className="mt-1 text-xs text-gray-500">Owner</p>
      </div>

      <nav aria-label="Owner navigation" className="flex flex-col gap-2">
        {ownerMenuLinks.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/owner" &&
              location.pathname.startsWith(`${item.path}/`));

          return (
            <Link
              key={item.path}
              to={item.path}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm 
                font-medium transition-colors ${
                  isActive
                    ? "bg-light-blue text-primary"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
            >
              <img
                src={isActive ? item.coloredIcon : item.icon}
                alt=""
                className="h-5 w-5"
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
