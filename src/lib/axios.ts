import axios from 'axios'


export const axiosInstance = axios.create({
    baseURL: 'https://digital-wallet-server-one.vercel.app/api',
  withCredentials:true
  });