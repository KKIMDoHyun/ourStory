<template>
	<v-container>{{ userInfo }}</v-container>
</template>

<script>
import axios from 'axios';
export default {
	data() {
		return {
			userInfo: '',
		};
	},
	created() {
		axios
			.get(`http://localhost:1337/users/${this.$store.state.id}`)
			.then(res => {
				this.userInfo = res;
			})
			.catch(err => console.log(err));
	},
};
</script>

<style></style>
