import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
	return axios.create({
		baseURL: process.env.VUE_APP_API_URL,
	});
}

function createInstanceWithAuth() {
	const instance = axios.create({
		baseURL: process.env.VUE_APP_API_URL,
	});

	return setInterceptors(instance);
}

export const instance = createInstance();
export const rooms = createInstance();
export const detailRooms = createInstanceWithAuth();
export const posts = createInstanceWithAuth();
export const comments = createInstanceWithAuth();
