import {
	saveAuthToCookie,
	deleteCookie,
	saveIdToCookie,
} from '@/utils/cookies';
import router from '../router';
import { loginUser, fetchUserInfo } from '@/api/auth';
import { fetchRooms } from '@/api/rooms';
import { createRoom, fetchDetailRoom } from '@/api/detailRooms';
import { createPost, fetchPosts } from '@/api/posts';
import store from '.';

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
		commit('addRoomData', data);
		return data;
	},
	async FETCH_DETAILROOM({ commit }, id) {
		const { data } = await fetchDetailRoom(id);
		commit('setRoomDetail', data);
		commit('setRoomId', data.id);
	},
	async FETCH_POSTS({ commit }) {
		const { data } = await fetchPosts();
		const posts = [];
		for (let post of data) {
			if (post.room.id === store.state.roomId) {
				posts.unshift(post);
			}
		}
		commit('setPosts', posts);
	},
	async CREATE_POST({ commit }, postData) {
		const { data } = await createPost(postData);
		console.log(data);
		console.log(commit);
	},
};
