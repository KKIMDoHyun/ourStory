import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import {
	saveAuthToCookie,
	getAuthFromCookie,
	deleteCookie,
	saveIdToCookie,
	getIdFromCookie,
} from '@/utils/cookies';
import { loginUser, getUserInfo } from '@/api/auth';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		userInfo: null,
		id: getIdFromCookie() || '',
		token: getAuthFromCookie() || '',
		loadingStatus: false,
	},
	getters: {
		isLogin(state) {
			return state.id !== '';
		},
	},
	mutations,
	actions: {
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
			const { data } = await getUserInfo(id);
			commit('setUserInfo', data);
			return data;
		},
	},
});
