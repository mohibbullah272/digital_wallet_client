import { baseApi } from "../baseApi";


export const adminApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
      agentCashIn: builder.mutation({
            query: (amount) => ({
              url: "/agents/cash-in",
              method: "POST",
              data: amount,
            }),
            invalidatesTags:["BALANCE","HISTORY","Commission"]
          }),
  
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
        
        userTransactionInfo: builder.query({
          query: (params) => ({
            url: "/transactions/me",
            method: "GET",
            params
          }),
          providesTags:["HISTORY"]
        }),
   
      
    
    })
})

export   const {useDashboardInfoQuery,useShowAgentInfoQuery,useApproveAgentMutation,useSuspendAgentMutation,useBlockWalletsMutation,useUnblockWalletsMutation,useAllWalletsQuery,useAllUsersQuery}= adminApi