import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Blog } from "./pages/Blog";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Blogs } from "./pages/Blogs";
import { Publish } from "./pages/Publish";
import { Home } from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import { Appbar } from "./components/Appbar";
import { useEffect, useState } from "react";
import MobileNavbar from "./components/MobileNavbar";
import Footer from "./components/Footer";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check screen width
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600); // 600px breakpoint for mobile
    };

    // Initial check on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <>
      <BrowserRouter>
        {isMobile ? <MobileNavbar /> : <Appbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/profile" element={<UserProfile />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
