import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useMyDetails } from "../hooks";
import useBlogStore from "../Store";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user: MyUser } = useMyDetails() || { user: "U" };


  const { searchQuery, setSearchQuery } = useBlogStore();

  return (
    <div className="bg-[#384241] text-white fixed w-full z-10 flex items-center justify-between h-16 sm:h-20 px-6 sm:px-10">
      {/* Toggle Button */}
      <button
        className="z-[999] m-3 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Logo */}
      <Link to="/blogs">
        <h1 className="text-2xl font-bold cursor-pointer">Postify</h1>
      </Link>

      {/* AnimatePresence for smooth animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed left-0 top-0 w-3/4 max-w-[300px] h-full bg-[#18181A] shadow-lg text-white p-6 menu-container"
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>

            {/* Navigation Links */}
            <div className="mt-10 flex flex-col space-y-4">

              <div className="w-full">
                <input
                  type="text"
                  placeholder="Search Blog..."
                  className="border border-gray-600 bg-gray-800 rounded-full px-4 py-2 text-white w-full focus:ring focus:ring-green-500 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Link to="/publish">
                <button className="w-full bg-green-700 hover:bg-green-800 px-4 py-2 rounded-md transition">
                  New Post
                </button>
              </Link>

              <Link to="/blog/Profile">
                <button className="w-full bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md transition">
                  My Blogs
                </button>
              </Link>

              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
                className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition"
              >
                Logout
              </button>
            </div>

            {/* Avatar */}
            <div className="mt-6 flex items-center space-x-3">
              <Avatar name={MyUser?.name || "K"} />
              <p className="text-lg font-medium">{MyUser?.name || "User"}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNavbar;
