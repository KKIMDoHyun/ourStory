<template>
	<v-dialog v-model="dialog" persistent max-width="600px">
		<v-card>
			<v-card-title>
				<span class="text-h5">방 만들기</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-row>
						<v-col cols="12">
							<v-text-field
								v-model="title"
								label="방 제목*"
								required
							></v-text-field>
						</v-col>
						<v-col cols="12">
							<v-text-field
								v-model="content"
								label="방 설명*"
								hint="방을 잘 나타내도록 간단히 설명해주세요"
								required
							></v-text-field>
						</v-col>
						<v-col cols="12">
							<v-text-field
								v-model="password"
								label="Password*"
								type="password"
								required
							></v-text-field>
						</v-col>
						<v-col cols="12">
							<v-combobox
								v-model="chips"
								chips
								clearable
								label="관심 분야"
								multiple
								prepend-icon="mdi-filter-variant"
								solo
							>
								<template v-slot:selection="{ attrs, item, selected }">
									<v-chip
										v-bind="attrs"
										:input-value="selected"
										close
										@click:close="remove(item)"
									>
										<strong>{{ item }}</strong>
									</v-chip>
								</template>
							</v-combobox>
						</v-col>
					</v-row>
				</v-container>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" text @click="$emit('closeDialog', false)">
					닫기
				</v-btn>
				<v-btn color="blue darken-1" text @click="createRoom"> 확인 </v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: ['createRoomDialog'],
	data() {
		return {
			title: '',
			content: '',
			password: '',
			chips: [],
		};
	},
	computed: {
		dialog() {
			return this.createRoomDialog;
		},
	},
	methods: {
		remove(item) {
			this.chips.splice(this.chips.indexOf(item), 1);
			this.chips = [...this.chips];
		},
		async createRoom() {
			try {
				const roomData = {
					title: this.title,
					content: this.content,
					password: this.password,
				};
				this.clearInput();
				this.$emit('closeDialog', false);
				await this.$store.dispatch('CREATE_ROOM', roomData);
			} catch (err) {
				console.log(err.response);
			}
		},
		clearInput() {
			this.title = '';
			this.content = '';
			this.password = '';
		},
	},
};
</script>

<style></style>
