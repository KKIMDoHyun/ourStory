<template>
	<v-container>
		<v-app-bar app color="#FCE4EC" flat>
			<v-container class="py-0 fill-height">
				<v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>
				<v-toolbar-title>
					<span
						@click="$router.push('/main').catch(() => {})"
						style="cursor: pointer"
						>OurStory</span
					></v-toolbar-title
				>

				<v-spacer></v-spacer>
				<template v-if="!isLogin">
					<v-btn @click="openLoginModal" text>로그인</v-btn>
					<LoginModal></LoginModal>
					<SignupModal></SignupModal>
				</template>
				<template v-else>
					<v-btn @click="$router.push('/mypage').catch(() => {})" text
						>마이페이지</v-btn
					>
					<v-btn @click="logoutUser" text>로그아웃</v-btn>
				</template>
			</v-container>
		</v-app-bar>
	</v-container>
</template>

<script>
import LoginModal from '@/components/LoginModal.vue';
import SignupModal from '@/components/SignupModal.vue';
import EventBus from '@/utils/bus';
export default {
	components: {
		LoginModal,
		SignupModal,
	},
	computed: {
		isLogin() {
			return this.$store.getters.isLogin;
		},
	},
	methods: {
		openLoginModal() {
			EventBus.$emit('openLoginModal', true);
		},
		async logoutUser() {
			await this.$store.dispatch('LOGOUT');
		},
	},
};
</script>
