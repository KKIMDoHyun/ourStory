<template>
	<v-container>
		<Spinner v-if="isLoading"></Spinner>
		<div>
			{{ userInfo }}
		</div>
	</v-container>
</template>

<script>
import Spinner from '@/components/common/LoadingSpinner.vue';
import userInfoMixin from '@/mixins/userInfoMixin';
export default {
	components: {
		Spinner,
	},
	mixins: [userInfoMixin],
	data() {
		return {
			userInfo: '',
			isLoading: false,
		};
	},
	async created() {
		await this.fetchUserInfo(this.$store.state.id);
	},
};
</script>

<style></style>
