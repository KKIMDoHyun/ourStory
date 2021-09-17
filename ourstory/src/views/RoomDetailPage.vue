<template>
	<Spinner v-if="isLoading"></Spinner>
	<RoomDetailForm v-else></RoomDetailForm>
</template>

<script>
import RoomDetailForm from '@/components/RoomDetailForm.vue';
import Spinner from '@/components/common/LoadingSpinner.vue';

export default {
	components: {
		RoomDetailForm,
		Spinner,
	},
	data() {
		return {
			isLoading: false,
		};
	},
	methods: {
		async fetchDetailRoom(id) {
			try {
				this.isLoading = true;
				await this.$store.dispatch('FETCH_DETAILROOM', id);
				console.log(this.$store.state.roomData);
				this.isLoading = false;
			} catch (err) {
				console.log(err);
			}
		},
	},
	async created() {
		await this.fetchDetailRoom(this.$route.params.id);
	},
};
</script>

<style></style>
