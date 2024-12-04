import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../components/Home";
import Login from "../components/Pages/Login";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../components/Pages/Register";
// import Home from "../components/Home/Home";
// import HowtoHelp from "../components/HowtoHelp/HowtoHelp";
// import DonationCampaigns from "../components/DonationCampaigns/DonationCampaigns";
// import CampaignCard from "../components/CampaignCard/CampaignCard";
// import AuthLayout from "../layouts/AuthLayout";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import ProductDetails from "../pages/ProductDetails";
// import PrivateRoute from "./privateRoute";
// import Dashboard from "../pages/Dashboard";
// import NotFoundRedirect from "../components/NotFoundRedirect";
// import ForgotPassword from "../components/ForgotPassword";
// import UpdateProfile from "../components/UpdateProfile";

const router = createBrowserRouter([
    {
        path: '/',
        element : <HomeLayout></HomeLayout>,
        children: [
            {
                 path: '/',
                element : <Home></Home>
         }, 
         {
            path: 'auth',
            element : <AuthLayout></AuthLayout>,
            children: [
                {
                    path: '/auth/login',
                    element : <Login></Login>
                }, 
                {
                    path: '/auth/register',
                    element : <Register></Register>
                } ,
                // {
                //     path: "/auth/forgot-password",
                //     element: <ForgotPassword />,
                // },
                   
            ],
        },   
        ],
    },
    // {
    //     path: "/products/:id",
    //     element: (<PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>),  
    //     loader: () => fetch('../allcampaigns.json'),
    // },
    // {
    //     path: '*',
    //     element : <NotFoundRedirect></NotFoundRedirect>
    // },
]
);

export default router;