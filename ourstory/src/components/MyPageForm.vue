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
export default {
	components: {
		Spinner,
	},
	data() {
		return {
			userInfo: '',
			isLoading: false,
		};
	},
	methods: {
		async fetchUserInfo(id) {
			try {
				this.isLoading = true;
				const data = await this.$store.dispatch('getUserInfo', id);
				this.isLoading = false;
				this.userInfo = data;
			} catch (err) {
				console.log(err);
			}
		},
	},
	created() {
		this.fetchUserInfo(this.$store.state.id);
	},
};
</script>

<style></style>
