import Vue from 'vue';
import Vuex from 'vuex';
import {
	saveAuthToCookie,
	saveUserInfoToCookie,
	getAuthFromCookie,
	getUserInfoFromCookie,
	deleteCookie,
	saveIdToCookie,
	getIdFromCookie,
} from '@/utils/cookies';
import { loginUser } from '@/api/auth';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		userInfo: getUserInfoFromCookie() || null,
		id: getIdFromCookie() || '',
		token: getAuthFromCookie() || '',
	},
	getters: {
		isLogin(state) {
			return state.id !== '';
		},
	},
	mutations: {
		loginSuccess(state, payload) {
			state.userInfo = payload;
		},
		setId(state, id) {
			state.id = id;
		},
		clearId(state) {
			state.id = '';
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
			commit('setId', data.user.id);
			commit('loginSuccess', data.user);
			saveAuthToCookie(data.jwt);
			saveIdToCookie(data.user.id);
			saveUserInfoToCookie(JSON.stringify(data.user));
			router.push({ name: 'main' }).catch(() => {});
			return data;
		},
		LOGOUT({ commit }) {
			commit('clearId');
			commit('clearToken');
			commit('logout');
			deleteCookie('token');
			deleteCookie('id');
			deleteCookie('userInfo');
			router.push({ name: 'login' }).catch(() => {});
		},
	},
});
