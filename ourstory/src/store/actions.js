import {
	saveAuthToCookie,
	deleteCookie,
	saveIdToCookie,
} from '@/utils/cookies';
import router from '../router';
import { loginUser, fetchUserInfo } from '@/api/auth';
import { fetchRooms } from '@/api/rooms';

export default {
	async LOGIN({ commit }, userData) {
		const { data } = await loginUser(userData);
		commit('setToken', data.jwt);
		commit('setId', data.user.id);
		commit('setUserInfo', data.user);
		saveAuthToCookie(data.jwt);
		saveIdToCookie(data.user.id);
		router.push({ name: 'main' }).catch(() => {});
		return data;
	},
	LOGOUT({ commit }) {
		commit('clearId');
		commit('clearToken');
		commit('logout');
		deleteCookie('token');
		deleteCookie('id');
		router.push({ name: 'main' }).catch(() => {});
	},
	async FETCH_USERINFO({ commit }, id) {
		const { data } = await fetchUserInfo(id);
		commit('setUserInfo', data);
		return data;
	},
	async FETCH_ROOMS({ commit }) {
		const { data } = await fetchRooms();
		commit('setRooms', data);
		console.log(data);
		return data;
	},
};
