import ProfileMange from "@/page/ProfileMange";
import UserDeposit from "@/page/UserDeposit";
import UserOverview from "@/page/UserOverview";
import UserSendMoney from "@/page/UserSendMoney";
import UserTransactionHistory from "@/page/UserTransactionHistory";
import UserWithdraw from "@/page/UserWithdraw";
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
      {
        title: "Deposit",
        url: "/user/deposit",
        component: UserDeposit,
      },
      {
        title: "Transaction history",
        url: "/user/transaction",
        component: UserTransactionHistory,
      },
      {
        title: "Withdraw",
        url: "/user/withdraw",
        component: UserWithdraw,
      },

    ],
  },
  {
    title:"Mange Profile",
    items:[
      {
        title:"Mange Profile",
        url:'/user/profile',
        component:ProfileMange
      }
    ]
  }
];
