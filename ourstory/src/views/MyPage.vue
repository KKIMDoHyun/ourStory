<template>
	<Spinner v-if="isLoading"></Spinner>
	<MyPageForm v-else></MyPageForm>
</template>

<script>
import MyPageForm from '@/components/MyPageForm.vue';
import Spinner from '@/components/common/LoadingSpinner.vue';

export default {
	components: {
		MyPageForm,
		Spinner,
	},
	data() {
		return {
			isLoading: false,
		};
	},
	methods: {
		async fetchUserInfo(id) {
			try {
				this.isLoading = true;
				await this.$store.dispatch('FETCH_USERINFO', id);
				this.isLoading = false;
			} catch (err) {
				console.log(err);
			}
		},
	},
	async created() {
		await this.fetchUserInfo(this.$store.state.id);
		console.log(this.$store.state.userInfo);
	},
};
</script>

<style></style>
