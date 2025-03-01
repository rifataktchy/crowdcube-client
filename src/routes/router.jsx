import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../components/Home";
import Login from "../components/Pages/Login";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../components/Pages/Register";
import AddCampaign from "../components/Pages/AddCampaign";
import AllCampaigns from "../components/Pages/AllCampaigns";
import MyCampaigns from "../components/Pages/MyCampaigns";
import UpdateCampaign from "../components/Pages/UpdateCampaign";
import DetailPage from "../components/Pages/DetailPage.jsx";
import MyDonations from "../components/Pages/MyDonation.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import NotFoundRedirect from "../components/NotFoundRedirect.jsx";
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
            path: '/allcampaigns',
            element : <AllCampaigns></AllCampaigns>,
            loader: () => fetch('https://crowdcube-server-eight.vercel.app/campaigns')
        }, 
         {
            path: '/newcampaign',
            element : (<PrivateRoute><AddCampaign></AddCampaign></PrivateRoute>),
        },
        {
            path: '/mycampaigns',
            element : (<PrivateRoute><MyCampaigns></MyCampaigns></PrivateRoute>),
                
        },
        {
            path: '/updatecampaigns/:id',
            element : <UpdateCampaign></UpdateCampaign>,
            loader: ({ params }) => fetch(`https://crowdcube-server-eight.vercel.app/campaigns/${params.id}`)
        },
        {
            path: '/campaign/:id',
            element: (<PrivateRoute><DetailPage /></PrivateRoute>),
            loader: ({ params }) => fetch(`https://crowdcube-server-eight.vercel.app/campaigns/${params.id}`),
        },
        {
            path: '/myDonations',
            element: (<PrivateRoute><MyDonations /></PrivateRoute>),
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
    //     path: "/campaigns/:id",
    //     element: <DetailsPage></DetailsPage>,  
    // },   
    {
        path: '*',
        element : <NotFoundRedirect></NotFoundRedirect>
    },
]
);

export default router;