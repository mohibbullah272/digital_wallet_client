import { baseApi } from "../baseApi";


export const userAPi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        login: builder.mutation({
            query: (userInfo) => ({
              url: "/auth/login",
              method: "POST",
              data: userInfo,
            }),
          }),
        updateProfile: builder.mutation({
            query: (userInfo) => ({
              url: "/users/profile",
              method: "PUT",
              data: userInfo,
            }),
            invalidatesTags:["USER"]
          }),


 
        userInfo: builder.query({
          query: () => ({
            url: "/users/profile",
            method: "GET",
          }),
      providesTags:["USER"]
        }),
      
    
    })
})

export   const {useUpdateProfileMutation}= userAPi