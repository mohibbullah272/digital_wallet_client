import { createApi} from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './axiosBaseQuery'
export const baseApi = createApi({
    reducerPath:"baseApi",
    baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  
  })


//   import { baseApi } from "../baseApi";


// export const authApi = baseApi.injectEndpoints({
//     endpoints:(builder)=>({
//         login: builder.mutation({
//             query: (userInfo) => ({
//               url: "/auth/login",
//               method: "POST",
//               data: userInfo,
//             }),
//           }),
//         register:builder.mutation({
//             query:(userInfo)=>({
//                 url:'/user/register',
//                 method:"POST",
//               data:userInfo,
//             })
//         }),
//         logout: builder.mutation({
//           query: () => ({
//             url: "/auth/logout",
//             method: "POST",
//           }),
//        invalidatesTags:["USER"]
//         }),
//         sendOtp: builder.mutation({
//           query: (userInfo) => ({
//             url: "/otp/send",
//             method: "POST",
//             data: userInfo,
//           }),
//         }),
//         verifyOtp: builder.mutation({
//           query: (userInfo) => ({
//             url: "/otp/verify",
//             method: "POST",
//             data: userInfo,
//           }),
//         }),
//         userInfo: builder.query({
//           query: () => ({
//             url: "/user/me",
//             method: "GET",
//           }),
//       providesTags:["USER"]
//         }),
//     })
// })

// export const {useRegisterMutation,useLoginMutation,useSendOtpMutation,useVerifyOtpMutation,useLogoutMutation,useUserInfoQuery} = authApi