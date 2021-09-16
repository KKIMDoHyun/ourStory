<template>
	<v-app id="inspire">
		<v-main class="grey lighten-3">
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
							{{ rooms }}
						</v-sheet>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
export default {
	computed: {
		userId() {
			return this.$store.state.id;
		},
		isLogin() {
			return this.$store.getters.isLogin;
		},
		userInfo() {
			return this.$store.getters.userInfo;
		},
		rooms() {
			return this.$store.getters.rooms;
		},
	},
	async created() {
		try {
			await this.$store.dispatch('FETCH_ROOMS');
			console.log(this.$store.state.rooms);
		} catch (err) {
			console.log(err);
		}
		// console.log(this.$store.state.rooms);
	},
};
</script>
