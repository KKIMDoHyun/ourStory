<template>
	<v-container>{{ userInfo }}</v-container>
</template>

<script>
export default {
	computed: {
		userInfo() {
			return this.$store.state.userInfo;
		},
	},
	created() {
		console.log(this.$store.state.userInfo);
		console.log(this.$store.state.token);
	},
};
</script>

<style></style>
