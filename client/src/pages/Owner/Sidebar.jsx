import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ownerMenuLinks, dummyUserData } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const Sidebar = () => {
  const { user, axios, fetchUser } = useAppContext();
  const location = useLocation();
  const [imagePreview, setImagePreview] = useState("");

  useEffect(
    () => () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    },
    [imagePreview],
  );

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    try {
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await axios.post("/api/owner/update-image", formData);
      if (data.success) {
        await fetchUser();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      setImagePreview("");
    } catch (error) {
      setImagePreview("");
      toast.error(error.response?.data?.message || error.message);
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
            src={imagePreview || user?.image || dummyUserData.image}
            alt={`${user?.name || dummyUserData.name}'s profile`}
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
          {user?.name || dummyUserData.name}
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
