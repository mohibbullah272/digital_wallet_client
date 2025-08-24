import { baseApi } from "../baseApi";


export const agentApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
      agentCashIn: builder.mutation({
            query: (amount) => ({
              url: "/agents/cash-in",
              method: "POST",
              data: amount,
            }),
            invalidatesTags:["BALANCE","HISTORY","Commission"]
          }),
      agentCashOut: builder.mutation({
            query: (amount) => ({
              url: "/agents/cash-out",
              method: "POST",
              data: amount,
            }),
            invalidatesTags:["BALANCE","HISTORY","Commission"]
          }),

        agentCommission: builder.query({
          query: () => ({
            url: "/agents/commissions",
            method: "GET",
          }),
      providesTags:["Commission"]
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

export   const {useAgentCommissionQuery,useAgentInfoQuery,useAgentCashInMutation,useAgentCashOutMutation}= agentApi