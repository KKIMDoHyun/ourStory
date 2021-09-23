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

								<!-- <v-divider class="my-2"></v-divider> -->

								<v-list-item link color="grey lighten-4">
									<v-list-item-content @click="createRoom">
										<v-list-item-title class="text-center">
											방 만들기
										</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
								<CreateRoomDialog
									:createRoomDialog="createRoomDialog"
									@closeDialog="closeCreateRoomDialog"
								></CreateRoomDialog>
								<!-- <v-text-field
									v-model="searchTitle"
									label="방 제목 찾기"
									solo
								></v-text-field>
								<v-text-field
									v-model="searchLeader"
									label="방장 찾기"
									solo
								></v-text-field> -->
							</v-list>
						</v-sheet>
					</v-col>
					<v-col>
						<v-sheet
							min-height="75vh"
							rounded="lg"
							class="overflow-y-auto"
							max-height="400"
						>
							<v-list two-line>
								<v-list-item-group active-class="pink--text">
									<template v-for="(room, index) in rooms">
										<v-list-item :key="index" @click="goRoom(index)">
											<template>
												<v-list-item-content class="ml-10">
													<v-list-item-title
														v-text="room.title"
													></v-list-item-title>

													<div class="text-body-2">
														{{ room.content }}
													</div>
													<div class="text-caption">
														방장: {{ room.leader.email }}
													</div>
												</v-list-item-content>

												<!-- <v-list-item-action>
													<v-list-item-action-text
														v-text="item.action"
													></v-list-item-action-text>

													<v-icon v-if="!active" color="grey lighten-1">
														mdi-star-outline
													</v-icon>

													<v-icon v-else color="yellow darken-3">
														mdi-star
													</v-icon>
												</v-list-item-action> -->
											</template>
										</v-list-item>
									</template>
								</v-list-item-group>
							</v-list>
						</v-sheet>
					</v-col>
				</v-row>
			</v-container>
			<!-- 다이얼로그 -->
			<v-dialog v-model="dialog" persistent max-width="290">
				<v-card>
					<v-card-title class="text-h5"> 방 코드를 입력하세요. </v-card-title>

					<v-col cols="12">
						<v-text-field
							v-model="password"
							type="password"
							label="비밀번호"
							filled
							rounded
							dense
						></v-text-field>
					</v-col>

					<v-card-actions>
						<v-spacer></v-spacer>

						<v-btn color="green darken-1" text @click="dialog = false">
							나가기
						</v-btn>
						<v-btn color="green darken-1" text @click="checkPassword">
							들어가기
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-main>
	</v-app>
</template>

<script>
import CreateRoomDialog from '@/components/dialog/CreateRoomDialog.vue';
export default {
	components: {
		CreateRoomDialog,
	},
	data() {
		return {
			searchTitle: '',
			searchLeader: '',
			dialog: false,
			password: '',
			selectedRoom: null,
			createRoomDialog: false,
		};
	},
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
	methods: {
		createRoom() {
			this.createRoomDialog = true;
		},
		closeCreateRoomDialog(dialog) {
			this.createRoomDialog = dialog;
		},
		goRoom(index) {
			if (this.isLogin) {
				this.dialog = true;
				this.selectedRoom = this.rooms[index];
			} else {
				console.log('로그인하세요');
			}
		},
		checkPassword() {
			if (this.selectedRoom.password === this.password) {
				this.password = '';
				this.$router.push(`room/${this.selectedRoom.id}`);
			}
			this.password = '';
			this.dialog = false;
		},
	},
};
</script>
