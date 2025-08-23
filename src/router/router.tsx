import Home from "@/page/Home/Home";
import Main from "@/layout/Main";
import { createBrowserRouter, Navigate } from 'react-router';

import Feature from "@/page/Feature";
import FAQ from "@/page/FAQ";
import Contact from "@/page/Contact";
import About from "@/page/About";
import { Login } from "@/components/login";
import { Signup } from "@/components/SignUp";
import DashboardLayout from "@/layout/DashboardLayout";
import { role } from "@/utils/utils";
import type { TRole } from "@/types";
import { withAuth } from "@/utils/withAuth";
import { generateRoutes } from "@/utils/generateRoutes";
import { adminSidebarItems } from "./AdminSidebar";
import { userSidebarItems } from "./UserSidebar";
import { agentSidebarItems } from "./AgentSidebar";


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
        Component: withAuth(DashboardLayout, role.admin as TRole),
        path: "/admin",
        children: [
          { index: true, element: <Navigate to="/admin/overview" /> },
          ...generateRoutes(adminSidebarItems),
        ],
      },
      {
        Component: withAuth(DashboardLayout, role.user as TRole),
        path: "/user",
        children: [
          { index: true, element: <Navigate to="/user/overview" /> },
          ...generateRoutes(userSidebarItems),
        ],
      },
      {
        Component: withAuth(DashboardLayout, role.agent as TRole),
        path: "/agent",
        children: [
          { index: true, element: <Navigate to="/agent/overview" /> },
          ...generateRoutes(agentSidebarItems),
        ],
      },
    {
        path:'/login',
        Component:Login
    },
    {
        path:'/signup',
        Component:Signup
    },
    {
        path:'/dashboard',
        Component:DashboardLayout
    }
    
])

export default router