<template>
	<Spinner v-if="isLoading"></Spinner>
	<MainPageForm v-else></MainPageForm>
</template>

<script>
import MainPageForm from '@/components/MainPageForm.vue';
import Spinner from '@/components/common/LoadingSpinner.vue';

export default {
	components: {
		MainPageForm,
		Spinner,
	},
	data() {
		return {
			isLoading: false,
		};
	},
	methods: {
		async fetchUserInfoAndRoom(id) {
			try {
				this.isLoading = true;
				await this.$store.dispatch('FETCH_ROOMS');
				const data = await this.$store.dispatch('FETCH_USERINFO', id);
				this.isLoading = false;
				this.userInfo = data;
			} catch (err) {
				console.log(err);
			}
		},
	},
	async created() {
		await this.fetchUserInfoAndRoom(this.$store.state.id);
	},
};
</script>

<style></style>
