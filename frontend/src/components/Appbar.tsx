import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useMyDetails } from "../hooks";

export const Appbar = ({ onAvatarClick }: { onAvatarClick: () => void }) => {
  const { user: MyUser } = useMyDetails() || { user: "U" };

  return (
    <div className="border-b flex flex-row  justify-between items-center px-4 sm:px-10 py-4">
      {/* Logo and Search */}
      <div className="flex flex-row  justify-around items-center w-full sm:w-auto">
        <Link to={"/blogs"} className="cursor-pointer text-xl md:text-2xl font-bold mb-4 sm:mb-0">
          Medium
        </Link>
        <div className="w-full sm:w-auto sm:ml-10">
          <input
            type="text"
            placeholder="Search..." 
            className="border-2 border-gray-500 md:p-2 p-1 text-center rounded-full md:w-full w-36 ml-2 mb-2"
          />
        </div>
      </div>

      {/* Buttons and Avatar */}
      <div className="flex items-center md:mt-4 sm:mt-1">
        <Link to={"/"}>
          <button
            onClick={() => {
              localStorage.removeItem("token");
            }}
            type="button"
            className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 md:font-medium  rounded-full text-sm md:px-4 px-2 md:py-2 py-1  text-center mr-2 "
          >
            Logout
          </button>
        </Link>
        <Link to={"/publish"}>
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm  md:px-4 px-2 md:py-2 py-1text-center mr-2 sm:mr-4"
          >
            NEW
          </button>
        </Link>
        <span
          onClick={onAvatarClick}
          className="cursor-pointer text-xl font-bold text-center mb-3"
        >
          <Avatar name={MyUser?.name || "K"} />
        </span>
      </div>
    </div>
  );
};
