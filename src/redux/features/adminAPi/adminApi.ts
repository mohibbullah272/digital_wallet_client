import { baseApi } from "../baseApi";


export const adminApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
      approveAgent: builder.mutation({
        query: ({ agentId }) => ({
            url: `/admin/agents/approve/${agentId}`,
            method: "PATCH",
          }),
          }),
      suspendAgent: builder.mutation({
        query: ({ agentId }) => ({
            url: `/admin/agents/suspend/${agentId}`,
            method: "PATCH",
          }),
          }),
      blockWallets: builder.mutation({
        query: ({ walletId }) => ({
            url: `/admin/wallets/block/${walletId}`,
            method: "PATCH",
          }),
          }),
    unblockWallets: builder.mutation({
        query: ({ walletId }) => ({
            url: `/admin/wallets/unblock/${walletId}`,
            method: "PATCH",
          }),
          }),

        dashboardInfo: builder.query({
          query: () => ({
            url: "/admin/dashboard",
            method: "GET",
          }),
    
        }),
      getAllTransaction: builder.query({
          query: (params) => ({
            url: "/admin/transaction",
            method: "GET",
            params
          }),
    
        }),
      allUsers: builder.query({
          query: () => ({
            url: "/admin/users",
            method: "GET",
          }),
    
        }),
      allWallets: builder.query({
          query: () => ({
            url: "/admin/wallets",
            method: "GET",
          }),
    
        }),
        ShowAgentInfo: builder.query({
          query: () => ({
            url: "/admin/agents",
            method: "GET",
          }),
    
        }),
    })
})

export   const {useDashboardInfoQuery,useShowAgentInfoQuery,useApproveAgentMutation,useSuspendAgentMutation,useBlockWalletsMutation,useUnblockWalletsMutation,useAllWalletsQuery,useAllUsersQuery,useGetAllTransactionQuery}= adminApi