import AdminAgentMange from "@/page/AdminAgentMange";
import AdminOverview from "@/page/AdminOverview";
import AdminTransactionHistory from "@/page/AdminTransactionHistroy";
import AdminUserManage from "@/page/AdminUserManage";
import ProfileMange from "@/page/ProfileMange";
import type { ISidebarItem } from "@/types";



export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/admin/overview",
        component: AdminOverview
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "Manage User",
        url: "/admin/manage-user",
        component: AdminUserManage
      },
      {
        title:"Manage Agents",
        url:"/admin/manage-agents",
        component:AdminAgentMange
      },

      {
        title:"Mange Transaction",
        url:"/admin/transaction",
        component:AdminTransactionHistory
      },
      {
        title:"Manage Profile",
        url:"/admin/manage-profile",
        component:ProfileMange
      }

    ],
  },
];
