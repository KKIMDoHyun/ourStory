<template>
	<v-app id="inspire">
		<v-main class="grey lighten-3">
			<v-card class="mx-auto mb-8" style="max-width: 750px">
				<form @submit.prevent="submitPost">
					<v-text-field
						filled
						color="deep-purple"
						label="제목을 적어주세요."
						required
						v-model="title"
					></v-text-field>
					<v-textarea
						v-if="this.title !== ''"
						background-color="white"
						filled
						label="당신의 story를 적어주세요."
						auto-grow
						required
						v-model="content"
					></v-textarea>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn> 취소 </v-btn>
						<v-btn
							class="white--text"
							color="deep-purple accent-4"
							depressed
							:disabled="btnOn"
							type="submit"
						>
							올리기
						</v-btn>
					</v-card-actions>
				</form>
			</v-card>
			<v-card
				class="mx-auto mb-9"
				max-width="750px"
				v-for="(room, index) in posts"
				:key="index"
			>
				<v-card-title>
					<span class="text-body-2 font-weight-light">{{
						room.author.email
					}}</span>
				</v-card-title>

				<v-card-text class="text-subtitle-1 font-weight-bold">
					{{ room.title }}
				</v-card-text>
				<v-card-text class="text-subtitle-2 font-weight-bold">
					{{ room.content }}
				</v-card-text>

				<v-card-actions>
					<v-list-item class="grow">
						<v-list-item-content>
							<v-list-item-title>{{
								room.updatedAt | formatDate
							}}</v-list-item-title>
						</v-list-item-content>

						<v-row align="center" justify="end">
							<v-icon class="mr-1"> mdi-heart </v-icon>
							<span class="subheading mr-2">256</span>
							<span class="mr-1">·</span>
							<v-icon class="mr-1"> mdi-share-variant </v-icon>
							<span class="subheading">45</span>
						</v-row>
					</v-list-item>
				</v-card-actions>
			</v-card>
		</v-main>
	</v-app>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			content: '',
		};
	},
	computed: {
		posts() {
			return this.$store.getters.posts;
		},
		btnOn() {
			if (this.title !== '' && this.content !== '') {
				return false;
			} else {
				return true;
			}
		},
	},
	methods: {
		submitPost() {
			console.log('d');
		},
		// async submitPost() {
		// 	try {
		// 		const postData = {
		// 			title: this.title,
		// 			content: this.content,
		// 		};
		// 		await this.$store.dispatch('CREATE_POST', postData);
		// 	} catch (err) {
		// 		console.log(err.response);
		// 	}
		// },
	},
};
</script>

<style></style>
