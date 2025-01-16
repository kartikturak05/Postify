import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useMyDetails } from "../hooks";

export const Appbar = ({ onAvatarClick }: { onAvatarClick: () => void }) => {
  const { user: MyUser } = useMyDetails() || { user: "U" };

  return (
    <div className="border-b flex flex-row  justify-between items-center px-4 sm:px-10 py-4">
      {/* Logo and Search */}
      <div className="flex flex-row  justify-between items-center w-full sm:w-auto">
        <Link to={"/blogs"} className="cursor-pointer text-2xl font-bold mb-4 sm:mb-0">
          Medium
        </Link>
        <div className="w-full sm:w-auto sm:ml-10">
          <input
            type="text"
            placeholder="Search..."
            className="border-2 border-gray-500 p-2 text-center rounded-full w-full sm:w-auto"
          />
        </div>
      </div>

      {/* Buttons and Avatar */}
      <div className="flex items-center mt-4 sm:mt-0">
        <Link to={"/"}>
          <button
            onClick={() => {
              localStorage.removeItem("token");
            }}
            type="button"
            className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-4 py-2 sm:px-5 sm:py-2.5 text-center mr-2 sm:mr-4"
          >
            Logout
          </button>
        </Link>
        <Link to={"/publish"}>
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2 sm:px-5 sm:py-2.5 text-center mr-2 sm:mr-4"
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
