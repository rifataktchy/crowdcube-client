import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.jpg";
import lightModeImage from "../assets/light-mode-image.png"; // Light mode image
import darkModeImage from "../assets/dark-mode-image.png"; // Dark mode image
import "./Navbar.css";
import { AuthContext } from "../components/provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
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
    <div className="bg-[#3c7f39] w-full">
      {/* Navbar container */}
      <div className="navbar sticky top-0 z-10 w-11/12 mx-auto text-white shadow-md">
        <div className="navbar-start">
          {/* Dropdown for mobile view */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {/* Dropdown menu */}
            <ul
              tabIndex={0}
              className="menu bg-green-500 menu-sm dropdown-content rounded-box z-50 mt-3 w-52 p-2 shadow font-bold"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/allcampaigns">All Campaigns</NavLink>
              </li>
              <li>
                <NavLink to="/newcampaign">Add New Campaign</NavLink>
              </li>
              <li>
                <NavLink to="/mycampaigns">My Campaign</NavLink>
              </li>
              <li>
                <NavLink to="/mydonations">My Donation</NavLink>
              </li>
            </ul>
          </div>
          {/* Logo */}
          <Link to="/">
            <img className="h-14 w-14 rounded-full" src={logo} alt="Logo" />
          </Link>
          <button onClick={toggleTheme} className="focus:outline-none">
          <img
            src={isDarkMode ? darkModeImage : lightModeImage}
            alt={isDarkMode ? "Dark Mode" : "Light Mode"}
            className="w-12 h-12 ml-2 rounded-full"
          />
        </button>
        </div>

        {/* Navbar center for larger screens */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-bold text-xl">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/allcampaigns">All Campaigns</NavLink>
            </li>
            <li>
              <NavLink to="/newcampaign">Add New Campaign</NavLink>
            </li>
            <li>
              <NavLink to="/mycampaigns">My Campaign</NavLink>
            </li>
            <li>
              <NavLink to="/mydonations">My Donation</NavLink>
            </li>
          </ul>
        </div>

        {/* Navbar end for user profile and authentication */}
        <div className="navbar-end flex items-center gap-4">
          {/* User Profile */}
          {user && user?.email ? (
            <div className="relative group">
              <img
                className="w-10 h-10 rounded-full mr-4"
                src={user?.photoURL}
                alt="User Profile"
              />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 translate-y-2 bg-gray-700 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {user?.displayName || "User"}
              </div>
            </div>
          ) : (
            <NavLink
              className="p-2 rounded-lg font-bold text-xl hover:bg-green-600"
              to="/auth/register"
            >
              Signup
            </NavLink>
          )}

          {/* Login/Logout Button */}
          {user && user?.email ? (
            <button
              className="font-bold text-xl pr-2 hover:bg-green-600 px-1 py-1 rounded-lg"
              onClick={logOut}
            >
              Signout
            </button>
          ) : (
            <NavLink
              className="p-1 rounded-lg font-bold text-xl hover:bg-green-600"
              to="/auth/login"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>

      {/* Light/Dark Mode Toggle */}
      {/* <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-800 py-4">
        <button onClick={toggleTheme} className="focus:outline-none">
          <img
            src={isDarkMode ? darkModeImage : lightModeImage}
            alt={isDarkMode ? "Dark Mode" : "Light Mode"}
            className="w-16 h-16 rounded-full"
          />
        </button>
      </div> */}
    </div>
  );
};

export default Navbar;