<template>
	<v-app id="inspire">
		<TopDrawer></TopDrawer>
		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
import TopDrawer from '@/components/TopDrawer.vue';
export default {
	components: {
		TopDrawer,
	},
};
</script>
