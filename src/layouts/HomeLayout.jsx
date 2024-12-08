import { Outlet } from "react-router-dom";

import Footer from "../components/Footer";
import Navbar from "../Navbar/Navbar";




const HomeLayout = () => {
   
    return (
        <div>
        
           <Navbar></Navbar>
           <Outlet></Outlet> 
           <Footer></Footer>
        </div>
    );
};

export default HomeLayout;