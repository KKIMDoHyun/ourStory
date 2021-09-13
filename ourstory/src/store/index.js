import Vue from 'vue';
import Vuex from 'vuex';
import {
	saveAuthToCookie,
	saveUserToCookie,
	getAuthFromCookie,
	getUserFromCookie,
} from '@/utils/cookies';
import { loginUser } from '@/api/auth';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		email: getUserFromCookie() || '',
		token: getAuthFromCookie() || '',
	},
	getters: {
		isLogin(state) {
			return state.email !== '';
		},
	},
	mutations: {
		setEmail(state, email) {
			state.email = email;
		},
		clearEmail(state) {
			state.email = '';
		},
		setToken(state, token) {
			state.token = token;
		},
	},
	actions: {
		async LOGIN({ commit }, userData) {
			const { data } = await loginUser(userData);
			this.LoginSuccess();
			commit('setToken', data.jwt);
			commit('setEmail', data.user.email);
			saveAuthToCookie(data.jwt);
			saveUserToCookie(data.user.email);
			return data;
		},
	},
});
