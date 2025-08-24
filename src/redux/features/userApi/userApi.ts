import { baseApi } from "../baseApi";


export const userAPi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
    
        updateProfile: builder.mutation({
            query: (userInfo) => ({
              url: "/users/profile",
              method: "PUT",
              data: userInfo,
            }),
            invalidatesTags:["USER"]
          }),
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

        walletInfo: builder.query({
          query: () => ({
            url: "/wallets/me",
            method: "GET",
          }),
      providesTags:["BALANCE"]
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

export   const {useUpdateProfileMutation,useWalletInfoQuery,useUserDepositMoneyMutation,useUserTransactionInfoQuery,useUserWithdrawMoneyMutation}= userAPi