import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from "./BlogCard";
import { useMyDetails } from "../hooks";

const MobileNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { user: MyUser } = useMyDetails() || { user: "U" };

    const toggleDrawer = () => setIsOpen(!isOpen);

    return (
        <div className='bg-[#384241] text-white cursor-grab fixed w-full z-10 flex items-center justify-between h-16 sm:h-20 pl-10'>
            {/* Toggle Button */}
            <button className='z-[999] relative m-3 cursor-grab' onClick={toggleDrawer}>
                {isOpen ? <X /> : <Menu />}
            </button>

            {/* Logo */}
            <div className="flex items-center">
            <Link to={"/blogs"}>
                <div className='text-2xl font-bold ml-4 sm:ml-8 cursor-pointer' onClick={() => navigate('/blogs')}>
                Postify 
                </div>
            </Link>
            </div>

            {/* AnimatePresence for smooth animation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.3 }}
                        className='fixed left-0 right-0 top-16 overflow-y-auto h-full bg-[#18181A] text-white p-6 cursor-grab'
                    >
                        <div className="flex flex-col items-start space-y-4">
                            {/* New Post */}
                                    <Link to={"/publish"}>
                            <button className="w-full bg-green-700 hover:bg-green-800 px-4 py-2 rounded-md transition">
                                New Post
                            </button>
                            </Link>
                            {/* My Blogs */}
                            <Link to={`/blog/Profile`}>
                            <button onClick={() => navigate('/blog/Profile')} className="w-full bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md transition">
                                My Blogs
                            </button>
                            </Link>
                            {/* Logout */}
                            <div>
                            <button onClick={() => { localStorage.removeItem("token"); navigate("/"); }} className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition">
                                Logout
                            </button>
                            </div>
                        </div>

                        {/* Avatar */}
                        <div className="mt-6 flex justify-start">
                            <Avatar name={MyUser?.name || "K"} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MobileNavbar;
