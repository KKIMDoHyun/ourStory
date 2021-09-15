<template>
	<v-app id="inspire">
		<TopHeader></TopHeader>
		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
import TopHeader from '@/components/common/TopHeader.vue';
export default {
	components: {
		TopHeader,
	},
};
</script>
