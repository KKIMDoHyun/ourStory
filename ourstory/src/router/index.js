import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const rejectAuthUser = (to, form, next) => {
	if (store.getters.isLogin === true) {
		alert('이미 로그인을 하셨습니다.');
		next('/main');
	} else {
		next();
	}
};
const onlyAuthUser = (to, form, next) => {
	if (store.getters.isLogin === false) {
		alert('로그인이 필요합니다.');
		next('/');
	} else {
		next();
	}
};

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			redirect: 'login',
			beforeEnter: rejectAuthUser,
		},
		{
			path: '/signup',
			name: 'signup',
			beforeEnter: rejectAuthUser,
			component: () => import('@/views/SignupPage.vue'),
		},
		{
			path: '/login',
			name: 'login',
			beforeEnter: rejectAuthUser,
			component: () => import('@/views/LoginPage.vue'),
		},
		{
			path: '/main',
			name: 'main',
			beforeEnter: onlyAuthUser,
			component: () => import('@/views/MainPage.vue'),
		},
		{
			path: '/mypage',
			name: 'mypage',
			beforeEnter: onlyAuthUser,
			component: () => import('@/views/MyPage.vue'),
		},
	],
});

export default router;
