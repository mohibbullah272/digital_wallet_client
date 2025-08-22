import Home from "@/Home/Home";
import Main from "@/layout/Main";
import { createBrowserRouter } from "react-router";


const router = createBrowserRouter([
    {
        path:'/',
        Component:Main,
        children:([
            {
                path:'/',
                Component:Home
            }
        ])
    }
])

export default router