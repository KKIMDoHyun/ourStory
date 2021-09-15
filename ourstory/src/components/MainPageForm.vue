<template>
	<v-app id="inspire">
		<Spinner v-if="isLoading"></Spinner>
		<v-main v-else class="grey lighten-3">
			<v-container>
				<v-row>
					<v-col cols="2" v-if="isLogin">
						<v-sheet rounded="lg">
							<v-list color="transparent">
								<v-list-item
									v-for="(room, index) in userInfo.joined"
									:key="index"
									link
								>
									<v-list-item-content>
										<v-list-item-title class="text-center">
											{{ room.title }}
											<small
												><i
													v-if="room.leader === userId"
													class="fas fa-crown"
												></i
											></small>
										</v-list-item-title>
									</v-list-item-content>
								</v-list-item>

								<v-divider class="my-2"></v-divider>

								<v-list-item link color="grey lighten-4">
									<v-list-item-content>
										<v-list-item-title> Refresh </v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-list>
						</v-sheet>
					</v-col>
					<v-col>
						<v-sheet min-height="70vh" rounded="lg">
							<!--  -->
						</v-sheet>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
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
	computed: {
		userId() {
			return this.$store.state.id;
		},
		isLogin() {
			return this.$store.getters.isLogin;
		},
	},
	async created() {
		if (this.isLogin) {
			await this.fetchUserInfo(this.$store.state.id);
			console.log('dddd', this.userInfo);
		}
	},
};
</script>
