import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link to={"/blogs"} className="cursor-pointer text-2xl font-bold">
        Medium
      </Link>
      <div>
        <Link to={'/'}>
          <button onClick={()=>{
            localStorage.removeItem("token");
          }} type="button" className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mr-4" >
            Logout
          </button>
        </Link>
        <Link to={'/publish'}>
          <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mr-4">
            NEW
          </button>
        </Link>
        <Avatar name="kartik"></Avatar>
      </div>
    </div>
  );
}
