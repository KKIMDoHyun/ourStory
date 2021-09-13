<template>
	<v-app id="inspire">
		<v-navigation-drawer v-model="drawer" absolute temporary>
			<v-list-item>
				<v-list-item-avatar>
					<i class="fas fa-user fa-lg"></i>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>{{ name }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<v-divider></v-divider>

			<v-list dense>
				<v-list-item router :to="{ name: 'main' }" link>
					<v-list-item-icon>
						<v-icon>mdi-home-account</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>Home</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item router :to="{ name: 'login' }" link>
					<v-list-item-icon>
						<v-icon>mdi-account-key</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>로그인</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item router :to="{ name: 'signup' }" link>
					<v-list-item-icon>
						<v-icon>mdi-account-plus</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>회원가입</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar app color="#FFC400">
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

			<v-toolbar-title>OurStory</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-title v-if="isUserLogin">{{
				this.$store.state.email
			}}</v-toolbar-title>
			<v-btn text v-if="isUserLogin" @click="logoutUser">로그아웃</v-btn>
		</v-app-bar>

		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
export default {
	data() {
		return {
			drawer: null,
			name: 'dohyun',
			items: [
				{ title: 'Home', icon: 'mdi-view-dashboard' },
				{ title: 'About', icon: 'mdi-forum' },
			],
		};
	},
	computed: {
		isUserLogin() {
			return this.$store.getters.isLogin;
		},
	},
	methods: {
		logoutUser() {
			this.$store.commit('clearEmail');
			this.$router.push({ name: 'login' });
		},
	},
};
</script>
