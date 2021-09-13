import Vue from 'vue';
import Vuex from 'vuex';
import {
	saveAuthToCookie,
	saveUserToCookie,
	saveUserInfoToCookie,
	getAuthFromCookie,
	getUserFromCookie,
	getUserInfoFromCookie,
	deleteCookie,
} from '@/utils/cookies';
import { loginUser } from '@/api/auth';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		userInfo: getUserInfoFromCookie() || null,
		email: getUserFromCookie() || '',
		token: getAuthFromCookie() || '',
	},
	getters: {
		isLogin(state) {
			return state.email !== '';
		},
	},
	mutations: {
		loginSuccess(state, payload) {
			state.userInfo = payload;
		},
		setEmail(state, email) {
			state.email = email;
		},
		clearEmail(state) {
			state.email = '';
		},
		logout(state) {
			state.userInfo = null;
		},
		setToken(state, token) {
			state.token = token;
		},
		clearToken(state) {
			state.token = '';
		},
	},
	actions: {
		async LOGIN({ commit }, userData) {
			const { data } = await loginUser(userData);
			commit('setToken', data.jwt);
			commit('setEmail', data.user.email);
			commit('loginSuccess', data.user);
			saveAuthToCookie(data.jwt);
			saveUserToCookie(data.user.email);
			saveUserInfoToCookie(JSON.stringify(data.user));
			router.push({ name: 'main' });
			return data;
		},
		LOGOUT({ commit }) {
			commit('clearEmail');
			commit('clearToken');
			commit('logout');
			deleteCookie('token');
			deleteCookie('email');
			deleteCookie('userInfo');
			router.push({ name: 'login' });
		},
		// getUserInfo({commit}) {

		// }
	},
});
