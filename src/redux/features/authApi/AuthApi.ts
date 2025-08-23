  import { baseApi } from "../baseApi";


export const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        login: builder.mutation({
            query: (userInfo) => ({
              url: "/auth/login",
              method: "POST",
              data: userInfo,
            }),
          }),
        register:builder.mutation({
            query:(userInfo)=>({
                url:'/auth/register',
                method:"POST",
              data:userInfo,
            })
        }),
        logout: builder.mutation({
          query: () => ({
            url: "/auth/logout",
            method: "POST",
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
export const {useLoginMutation,useLogoutMutation,useRegisterMutation,useUserInfoQuery} = authApi