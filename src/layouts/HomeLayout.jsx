import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import lightModeImage from "../assets/light-mode-image.png"; // Light mode image
import darkModeImage from "../assets/dark-mode-image.png"; // Dark mode image

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
    <div className="min-h-screen w-full flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>

      {/* Toggle Area */}
      <div className="fixed top-4 right-4 z-20 flex flex-col items-center">
  {/* Clickable Image */}
  {/* <button
    onClick={toggleTheme} // Click handler for the image
    className="focus:outline-none"
  >
    <img
      src={isDarkMode ? darkModeImage : lightModeImage}
      alt={isDarkMode ? "Dark Mode" : "Light Mode"}
      className="w-16 h-16 rounded-full mb-2"
    />
  </button> */}

  {/* Button */}
  {/* <button
    onClick={toggleTheme}
    className="px-10 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
  >
    {isDarkMode ? "Light Mode" : "Dark Mode"}
  </button> */}
</div>


      {/* Main Content */}
      <div className="flex-grow overflow-hidden">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomeLayout;


