import { Outlet } from "react-router-dom";

import Footer from "../components/Footer";
import Navbar from "../Navbar/Navbar";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../context/ThemeContext";



const HomeLayout = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div>
         <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome to Dark/Light Mode App</h1>
        <ThemeToggle /> {/* Use ThemeToggle to switch themes */}
      </header>
           <Navbar></Navbar>
           <Outlet></Outlet> 
           <Footer></Footer>
        </div>
    );
};

export default HomeLayout;