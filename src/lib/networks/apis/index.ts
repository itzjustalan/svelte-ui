import { PUBLIC_ADMIN_API_URL } from '$env/static/public';
import { log } from '$lib/logger';
import { auth } from '$lib/stores/auth';
import axios, { type AxiosInstance } from 'axios';
import { get } from 'svelte/store';

const defaultApi: AxiosInstance = axios.create({
	baseURL: PUBLIC_ADMIN_API_URL,
	withCredentials: true,
});

defaultApi.defaults.headers.common['Content-Type'] = 'application/json';
defaultApi.interceptors.request.use(
	(config) => {
		// config.headers.Authorization = get(auth)?.jwt.accessToken;
		log.cl_req(config.method ?? '-', config.url ?? '-', config.data);
		return config;
	},
	(error) => {
		log.cl_req(error.config.method ?? '-', error.config.url ?? '-', error.response.data);
	}
);
defaultApi.interceptors.response.use(
	(config) => {
		log.cl_res(
			config.status,
			config.statusText,
			config.config.method ?? '-',
			config.config.url ?? '-',
			config.data
		);
		return config;
	},
	(error) => {
		log.cl_res(
			error.response.status,
			error.response.statusText,
			error.config.method ?? '-',
			error.config.url ?? '-',
			error.response.data
		);
	}
);

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
