<template>
	<v-app id="inspire">
		<TopHeader></TopHeader>
		<Spinner v-if="isLoading"></Spinner>
		<v-main v-else>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
import TopHeader from '@/components/common/TopHeader.vue';
import userInfoMixin from '@/mixins/userInfoMixin';
import Spinner from '@/components/common/LoadingSpinner.vue';

export default {
	components: {
		TopHeader,
		Spinner,
	},
	data() {
		return {
			isLoading: false,
		};
	},
	mixins: [userInfoMixin],
	async created() {
		await this.fetchUserInfo(this.$store.state.id);
	},
};
</script>
