import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";



const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <h2>Home</h2>
            }
        ]
    }
]);

export  default router;