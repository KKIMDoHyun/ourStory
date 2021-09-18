<template>
	<v-container class="grey lighten-3">
		<v-card>
			<h1>이름: {{ userInfo.username }}</h1>
			<h1>이메일: {{ userInfo.email }}</h1>
			{{ userInfo.rooms }}
		</v-card>
	</v-container>
</template>

<script>
export default {
	computed: {
		userInfo() {
			return this.$store.getters.userInfo;
		},
	},
};
</script>

<style></style>
