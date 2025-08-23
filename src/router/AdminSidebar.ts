import AdminOverview from "@/page/AdminOverview";
import AdminUserManage from "@/page/AdminUserManage";
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
    title: "Wallet Management",
    items: [
      {
        title: "Add Tour Type",
        url: "/admin/manage-user",
        component: AdminUserManage
      },

    ],
  },
];
