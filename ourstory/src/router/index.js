import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
// import mixin from '@/mixins/userInfoMixins';
Vue.use(VueRouter);

// const rejectAuthUser = (to, form, next) => {
// 	if (store.getters.isLogin === true) {
// 		alert('이미 로그인을 하셨습니다.');
// 		next('/main');
// 		return;
// 	}
// 	next();
// };
const onlyAuthUser = (to, form, next) => {
	if (store.getters.isLogin === false) {
		alert('로그인이 필요합니다.');
		next('/');
		return;
	}
	next();
};

// const fetchUserInfo = (to, from, next) => {
// 	if (store.getters.isLogin) {
// 		// store.commit('startSpinner');
// 		store.dispatch('FETCH_USERINFO', store.state.id).then(res => {
// 			console.log('res====', res);
// 			store.commit('setUserInfo', res);
// 			console.log(store.state.userInfo);
// 			// store.commit('endSpinner');
// 			next();
// 			return;
// 		});
// 	}
// };

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			redirect: 'main',
			component: () => import('@/views/MainPage.vue'),
		},
		{
			path: '/main',
			name: 'main',
			// beforeEnter: fetchUserInfo,
			component: () => import('@/views/MainPage.vue'),
		},
		{
			path: '/mypage',
			name: 'mypage',
			beforeEnter: onlyAuthUser,
			// beforeEnter: (to, form, next) => {
			// 	if (store.getters.isLogin === false) {
			// 		alert('로그인이 필요합니다.');
			// 		next('/');
			// 		return;
			// 	}
			// 	store.commit('startSpinner');
			// 	store.dispatch('getUserInfo', store.state.id).then(res => {
			// 		store.commit('endSpinner');
			// 		next();
			// 	});
			// },
			component: () => import('@/views/MyPage.vue'),
		},
	],
});

// router.beforeEnter((to, from, next) => {
// 	store.commit('startSpinner');
// });
export default router;
