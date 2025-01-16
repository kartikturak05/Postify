import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useMyDetails } from "../hooks";
import { MyUser } from "../hooks";



export const Appbar = () => {
  const { user: MyUser } = useMyDetails() || { user: 'U' };

  return (
    <div className="border-b flex justify-between items-center px-10 py-4">
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
        <span onClick={() => console.log("hii button clicked")} className="cursor-pointer text-xl font-bold text-center">
        <Avatar name={MyUser?.name || 'K'}></Avatar>
        </span>
      </div>
    </div>
  );
}
