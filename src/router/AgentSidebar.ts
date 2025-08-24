import AgentCashOut from "@/page/AgentCashout";
import AgentOverview from "@/page/AgentOverview";
import AgentSendMoney from "@/page/AgentSendMoney";
import AgentTransactionHistory from "@/page/agentTransactions";
import ProfileMange from "@/page/ProfileMange";
import type { ISidebarItem } from "@/types";



export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/agent/overview",
        component: AgentOverview
      },
    ],
  },
  {
    title: "Wallet Management",
    items: [
      {
        title: "Add Money",
        url: "/agent/add-money",
        component:AgentSendMoney
      },
      {
        title: "CashOut",
        url: "/agent/CashOUt",
        component:AgentCashOut
      },
      {
        title: "Transactions History",
        url: "/agent/history",
        component:AgentTransactionHistory
      },
  

    ],
  },
  {
    title:'Profile Management',
    items:[
      {
        title:'Manage Profile',
        url:'/agent/profile',
        component:ProfileMange
      }
    ]
  }
];
