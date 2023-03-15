import { PUBLIC_ADMIN_API_URL } from '$env/static/public';
import axios, { type AxiosInstance } from 'axios';
// export { type AxiosInstance } from 'axios';

const defaultApi: AxiosInstance = axios.create({
  baseURL: PUBLIC_ADMIN_API_URL,
  withCredentials: true,
});

defaultApi.defaults.headers.common['Content-Type'] = 'application/json';
// defaultApi.interceptors.request.use(config => {
//   config.headers.Authorization = '';
//   return config;
// })

// export const refreshAccessTokenFn = async () => {
//   const response = await defaultApi.get('auth/refresh');
//   return response.data;
// };

// defaultApi.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     const errMessage = error.response.data.message as string;
//     if (errMessage.includes('not logged in') && !originalRequest._retry) {
//       originalRequest._retry = true;
//       await refreshAccessTokenFn();
//       return defaultApi(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );

export default defaultApi;