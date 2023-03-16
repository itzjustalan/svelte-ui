import { PUBLIC_ADMIN_API_URL } from '$env/static/public';
import { log } from '$lib/logger';
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

// defaultApi.interceptors.request.use(config => {
//   return config;
// })
// defaultApi.interceptors.response.use(config => {
//   log.request(config.status, config.request.method, '', 0);
//   return config;
// })

export default defaultApi;