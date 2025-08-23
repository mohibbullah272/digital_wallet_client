import AgentOverview from "@/page/AgentOverview";
import AgentSendMoney from "@/page/AgentSendMoney";
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
        title: "Send Money",
        url: "/agent/send-money",
        component:AgentSendMoney
      },

    ],
  },
];
