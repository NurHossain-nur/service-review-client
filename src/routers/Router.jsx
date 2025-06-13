import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../Home/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AddService from "../pages/AddService";
import AllServices from "../pages/AllServices";
import ServiceDetails from "../pages/ServiceDrtails";



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
                element: <AddService></AddService>
            },
            {
                path: "/services",
                element: <AllServices></AllServices>
            },
            {
                path: "/service/:id",
                element: <ServiceDetails></ServiceDetails>
            }
        ]
    }
]);

export  default router;