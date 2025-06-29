import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../Home/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AddService from "../pages/AddService";
import AllServices from "../pages/AllServices";
import ServiceDetails from "../pages/ServiceDrtails";
import PrivateRoute from "./PrivateRoute";
import MyServices from "../pages/MyServices";
import MyReviews from "../pages/MyReviews";
import NotFound from "../pages/NotFound";



const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/add-service",
                element: <PrivateRoute><AddService></AddService></PrivateRoute>
            },
            {
                path: "/services",
                element: <AllServices></AllServices>
            },
            {
                path: "/service/:id",
                element: <ServiceDetails></ServiceDetails>
            },
            {
                path: "/my-services",
                element: <PrivateRoute><MyServices></MyServices></PrivateRoute>
            },
            {
                path: "/my-reviews",
                element: <PrivateRoute><MyReviews></MyReviews></PrivateRoute>
            }
        ]
    },
    {
        path: "*",
        element:<NotFound></NotFound>
    }
]);

export  default router;