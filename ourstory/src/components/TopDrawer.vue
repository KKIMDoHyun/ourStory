<template>
	<v-container>
		<v-navigation-drawer v-model="drawer" absolute temporary class="yellow">
			<v-list-item>
				<v-list-item-avatar>
					<i class="fas fa-user fa-lg"></i>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>이름</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<v-divider></v-divider>

			<v-list dense>
				<v-list-item v-if="isLogin" router :to="{ name: 'main' }" link>
					<v-list-item-icon>
						<v-icon>mdi-home-account</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>Home</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item v-if="!isLogin" router :to="{ name: 'login' }" link>
					<v-list-item-icon>
						<v-icon>mdi-account-key</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>로그인</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item v-if="!isLogin" router :to="{ name: 'signup' }" link>
					<v-list-item-icon>
						<v-icon>mdi-account-plus</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>회원가입</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item v-if="isLogin" router :to="{ name: 'mypage' }" link>
					<v-list-item-icon>
						<v-icon>mdi-account-plus</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>마이페이지</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
			<template v-slot:append v-if="isLogin">
				<div class="pa-2">
					<v-btn block @click="logoutUser"> 로그아웃 </v-btn>
				</div>
			</template>
		</v-navigation-drawer>

		<v-app-bar app color="#FFC400">
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

			<v-toolbar-title>
				<span @click="goMain" style="cursor: pointer"
					>OurStory</span
				></v-toolbar-title
			>
			<v-spacer></v-spacer>
		</v-app-bar>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			drawer: null,
		};
	},
	computed: {
		isLogin() {
			return this.$store.getters.isLogin;
		},
	},
	methods: {
		async logoutUser() {
			await this.$store.dispatch('LOGOUT');
		},
		goMain() {
			this.isLogin
				? this.$router.push('/main').catch(() => {})
				: this.$router.push('/').catch(() => {});
		},
	},
};
</script>

<style></style>
