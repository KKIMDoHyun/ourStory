<template>
	<div>{{ roomData }}</div>
</template>

<script>
export default {
	computed: {
		roomData() {
			return this.$store.state.roomData;
		},
	},
	// data() {
	// 	return {
	// 		roomData: null,
	// 	};
	// },
	// async created() {
	// 	try {
	// 		const data = await this.$store.dispatch(
	// 			'FETCH_DETAILROOM',
	// 			this.$route.params.id,
	// 		);
	// 		this.roomData = data;
	// 	} catch (err) {
	// 		console.log(err.response);
	// 	}
	// },
};
</script>

<style></style>
