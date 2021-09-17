import {
	saveAuthToCookie,
	deleteCookie,
	saveIdToCookie,
} from '@/utils/cookies';
import router from '../router';
import { loginUser, fetchUserInfo } from '@/api/auth';
import { fetchRooms } from '@/api/rooms';
import { createRoom, fetchDetailRoom } from '@/api/detailRooms';
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
		return data;
	},
	async CREATE_ROOM({ commit }, roomData) {
		const { data } = await createRoom(roomData);
		commit('setRoomData', roomData);
		return data;
	},
	async FETCH_DETAILROOM({ commit }, id) {
		const { data } = await fetchDetailRoom(id);
		commit('setRoomData', data);
	},
};
