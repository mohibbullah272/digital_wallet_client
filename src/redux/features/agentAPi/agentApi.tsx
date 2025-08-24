import { baseApi } from "../baseApi";


export const agentApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
    
   
        userDepositMoney: builder.mutation({
            query: (amount) => ({
              url: "/wallets/deposit",
              method: "POST",
              data: amount,
            }),
            invalidatesTags:["BALANCE","HISTORY"]
          }),
        userWithdrawMoney: builder.mutation({
            query: (amount) => ({
              url: "/wallets/withdraw",
              method: "POST",
              data: amount,
            }),
            invalidatesTags:["BALANCE","HISTORY"]
          }),
      agentCashIn: builder.mutation({
            query: (amount) => ({
              url: "/agents/cash-in",
              method: "POST",
              data: amount,
            }),
            invalidatesTags:["BALANCE","HISTORY"]
          }),
      agentCashOut: builder.mutation({
            query: (amount) => ({
              url: "/agents/cash-out",
              method: "POST",
              data: amount,
            }),
            invalidatesTags:["BALANCE","HISTORY"]
          }),

        walletInfo: builder.query({
          query: () => ({
            url: "/wallets/me",
            method: "GET",
          }),
      providesTags:["BALANCE"]
        }),
        agentInfo: builder.query({
          query: () => ({
            url: "/agents/profile",
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

export   const {useAgentInfoQuery,useAgentCashInMutation,useAgentCashOutMutation}= agentApi