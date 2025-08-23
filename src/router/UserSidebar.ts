import UserOverview from "@/page/UserOverview";
import UserSendMoney from "@/page/UserSendMoney";
import type { ISidebarItem } from "@/types";



export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "overview",
        url: "/user/overview",
        component:UserOverview,
      },
    ],
  },
  {
    title: "Wallet Management",
    items: [
      {
        title: "Send Money",
        url: "/user/send-money",
        component: UserSendMoney,
      },

    ],
  },
];
