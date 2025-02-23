import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useMyDetails } from "../hooks";
import { ImBlogger } from "react-icons/im";

export const Appbar = () => {
  const { user: MyUser } = useMyDetails() || { user: "U" };

  return (
    <div className="border-b flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-md pl-10 pr-10">
      {/* Left Section - Logo & Search Bar */}
      <div className="flex items-center space-x-6">
        <Link to={"/blogs"} className="text-2xl font-bold hover:text-gray-300 transition">
        Postify 
        </Link>
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-600 bg-gray-800 rounded-full px-4 py-2 text-white w-56 focus:ring focus:ring-green-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Right Section - Buttons & Avatar */}
      <div className="flex items-center space-x-4">
        <Link to={"/"}>
          <button
            onClick={() => localStorage.removeItem("token")}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition"
          >
            Logout
          </button>
        </Link>
        <Link to={"/publish"}>
          <button className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-full transition">
            NEW
          </button>
        </Link>
        <Link to={`/blog/Profile`} className="flex items-center space-x-2 hover:text-gray-400 transition">
          <ImBlogger className="text-lg" />
          <span className="text-lg font-medium">My Blogs</span>
        </Link>
        <span className="cursor-pointer">
          <Avatar name={MyUser?.name || "K"} />
        </span>
      </div>
    </div>
  );
};
