import { Outlet } from "react-router-dom";

import Footer from "../components/Footer";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";




const HomeLayout = () => {
     // State to manage theme
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check user's previously saved theme or fallback to light mode
    return localStorage.getItem("theme") === "dark";
  });

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply theme to <html> element and save to localStorage
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);
   
    return (
      
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">

   
    
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
   
      <Navbar></Navbar>
           <Outlet></Outlet> 
           <Footer></Footer>
    </div>
    
    );
};

export default HomeLayout;