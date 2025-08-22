import Home from "@/page/Home/Home";
import Main from "@/layout/Main";
import { createBrowserRouter } from "react-router";

import Feature from "@/page/Feature";
import FAQ from "@/page/FAQ";
import Contact from "@/page/Contact";
import About from "@/page/About";
import { Login } from "@/components/login";


const router = createBrowserRouter([
    {
        path:'/',
        Component:Main,
        children:([
            {
                path:'/',
                Component:Home
            },
            {
                path:'/about',
                Component:About
            },
            {
                path:'/feature',
                Component:Feature
            },
            {
                path:'/faq',
                Component:FAQ
            },
            {
                path:'/contact',
                Component:Contact
            }
        ])
       
    },
    {
        path:'/login',
        Component:Login
    }
])

export default router