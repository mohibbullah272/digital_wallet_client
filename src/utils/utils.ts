
import { adminSidebarItems } from "@/router/AdminSidebar";
import { agentSidebarItems } from "@/router/AgentSidebar";
import { userSidebarItems } from "@/router/UserSidebar";
import type { TRole } from "@/types";

export const role = {
    agent: "agent",
    admin: "admin",
    user: "user",
  };


export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.agent:
      return [...agentSidebarItems];
    case role.admin:
      return [...adminSidebarItems];
    case role.user:
      return [...userSidebarItems];
    default:
      return [];
  }
};