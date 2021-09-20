<template>
	<v-app id="inspire">
		<v-main class="grey lighten-3">
			<h1 v-if="!isModify" style="text-align: center">게시글 수정 페이지</h1>
			<h1 v-if="isModify" style="text-align: center">게시글 수정 중...</h1>

			<v-card class="mx-auto mb-4 mt-4" style="max-width: 750px">
				<form @submit.prevent="modifyPost">
					<v-text-field
						filled
						background-color="white"
						color="deep-purple"
						required
						v-model="title"
					></v-text-field>
					<v-textarea
						background-color="white"
						filled
						auto-grow
						required
						v-model="content"
					></v-textarea>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn @click="cancleModify"> 취소 </v-btn>
						<v-btn
							class="white--text"
							color="deep-purple accent-4"
							depressed
							type="submit"
						>
							수정하기
						</v-btn>
					</v-card-actions>
				</form>
			</v-card>
		</v-main>
	</v-app>
</template>

<script>
import { fetchPost } from '@/api/posts';
export default {
	data() {
		return {
			title: '',
			content: '',
			isModify: false,
		};
	},
	computed: {
		postId() {
			return this.$route.params.id;
		},
	},
	async created() {
		const { data } = await fetchPost(this.postId);
		this.title = data.title;
		this.content = data.content;
	},
	methods: {
		async modifyPost() {
			try {
				this.isModify = true;
				const postData = {
					title: this.title,
					content: this.content,
				};
				const postId = this.postId;
				await this.$store.dispatch('MODIFY_POST', { postId, postData });
				this.isModify = false;
				this.$router.push({
					name: 'room',
					params: { id: this.$store.state.roomId },
				});
			} catch (err) {
				console.log(err);
			}
		},
		cancleModify() {
			this.$router.go(-1);
		},
	},
};
</script>

<style></style>
