import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import { getAuthFromCookie, getIdFromCookie } from '@/utils/cookies';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		userInfo: null,
		id: getIdFromCookie() || '',
		token: getAuthFromCookie() || '',
		rooms: [],
	},
	getters: {
		isLogin(state) {
			return state.id !== '';
		},
		userInfo(state) {
			return state.userInfo;
		},
		rooms(state) {
			return state.rooms;
		},
	},
	mutations,
	actions,
});
