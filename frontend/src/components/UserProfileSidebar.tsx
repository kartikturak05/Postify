import { motion, AnimatePresence } from "framer-motion";
import { ImBlogger } from "react-icons/im";
import { FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";


const UserProfileSidebar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed right-0 top-24 h-full bg-gray-700 text-white p-4 z-100"
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold">Sidebar</h2>

          <div>
            <Link to={`/blog/Profile`}>
            <div className="mt-4 ml-7 mr-16 cursor-pointer hover:text-gray-400" >
              <ImBlogger className="inline-block text-lg font-bold text-white-600 " />{" "}
              <span
                className="text-lg font-bold text-white-600 ">
                {" "}
                My Blogs
              </span>
              <br />
            </div>
            </Link>
            <div className="mt-4 ml-7 mr-16 cursor-pointer hover:text-gray-400">
              <FaBookmark className="inline-block text-lg font-bold text-white-600 " />{" "}
              <span className="text-lg font-bold text-white-600 ">
                My Drafts
              </span>
              <br />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserProfileSidebar;
