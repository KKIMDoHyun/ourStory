<template>
	<v-container>
		<div>
			{{ userInfo }}
		</div>
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
