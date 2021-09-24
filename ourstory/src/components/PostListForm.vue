<template>
	<v-app id="inspire">
		<v-main class="grey lighten-3">
			<v-card
				class="mx-auto mb-9"
				max-width="750px"
				v-for="(post, index) in posts"
				:key="index"
			>
				<v-card-actions>
					<v-list-item class="grow">
						<v-list-item-content>
							<v-list-item-title class="text-h6 font-weight-light">{{
								post.title
							}}</v-list-item-title>
						</v-list-item-content>

						<v-row align="center" justify="end">
							<v-btn
								v-if="post.author.id === userId"
								class="ma-1"
								text
								icon
								color="black"
								@click="modifyPost(post.id)"
							>
								<v-icon>mdi-pencil-plus</v-icon>
							</v-btn>

							<v-btn
								v-if="post.author.id === userId"
								class="ma-1"
								text
								icon
								color="black"
								@click="deleteDialogOpen(index)"
							>
								<v-icon>mdi-delete</v-icon>
							</v-btn>
						</v-row>
					</v-list-item>
				</v-card-actions>

				<v-dialog v-model="deleteDialog[index]" persistent max-width="290">
					<v-card>
						<v-card-title class="text-h5"> 삭제 확인</v-card-title>
						<v-card-text>정말 게시글을 삭제하시겠습니까?</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								color="green darken-1"
								text
								@click="deleteDialogOpen(index)"
							>
								Disagree
							</v-btn>
							<v-btn
								color="green darken-1"
								text
								@click="deletePost(index, post.id)"
							>
								Agree
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>

				<v-card-actions>
					<v-card-text class="text-h5 font-weight-bold">
						{{ post.content }}
					</v-card-text>
				</v-card-actions>

				<v-card-actions>
					<v-list-item class="grow">
						<v-list-item-avatar color="grey darken-3">
							<v-img
								class="elevation-6"
								alt=""
								src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
							></v-img>
						</v-list-item-avatar>

						<v-list-item-content>
							<v-list-item-title>{{ post.author.email }}</v-list-item-title>
							<v-list-item-title class="text-body-2">{{
								post.updatedAt | formatDate
							}}</v-list-item-title>
						</v-list-item-content>

						<v-row align="center" justify="end">
							<v-btn
								class="ma-1"
								text
								icon
								color="black"
								@click="commentOpen(index)"
							>
								<v-icon>mdi-comment-multiple-outline</v-icon>
							</v-btn>
						</v-row>
					</v-list-item>
				</v-card-actions>
				<v-divider></v-divider>
				<v-card-actions v-if="commentToggle[index]">
					<v-text-field
						filled
						label="댓글을 입력하세요."
						v-model="comment[index]"
						clearable
					></v-text-field>
					<v-btn
						:disabled="comment[index] === ''"
						@click="submitComment(index, post.id)"
						>달기</v-btn
					>
				</v-card-actions>
				<v-btn
					sm
					text
					v-if="commentToggle[index]"
					@click="showComments(popst.id)"
					>댓글 보기</v-btn
				>
			</v-card>
		</v-main>
	</v-app>
</template>

<script>
export default {
	data() {
		return {
			commentToggle: [],
			deleteDialog: [],
			comment: [],
		};
	},
	computed: {
		posts() {
			return this.$store.state.posts;
		},
		userId() {
			return this.$store.state.id;
		},
		roomId() {
			return this.$route.params.id;
		},
	},
	methods: {
		deleteDialogOpen(index) {
			const temp = this.deleteDialog.slice();
			temp[index] = !temp[index];
			this.deleteDialog = temp;
		},
		async deletePost(index, id) {
			try {
				this.deleteDialogOpen(index);
				await this.$store.dispatch('DELETE_POST', id);
			} catch (err) {
				console.log(err);
			}
		},
		modifyPost(id) {
			this.$router.push(`/post/modify/${id}`);
		},
		commentOpen(index) {
			const temp = this.commentToggle.slice();
			temp[index] = !temp[index];
			this.commentToggle = temp;
		},
		commentClear(index) {
			const temp = this.comment.slice();
			temp[index] = '';
			this.comment = temp;
		},
		async submitComment(index, postId) {
			try {
				const commentData = {
					comment: this.comment[index],
					postId: postId,
					roomId: this.$route.params.id,
				};
				await this.$store.dispatch('CREATE_COMMENT', commentData);
				this.commentClear(index);
				console.log(this.$store.state.comments);
			} catch (err) {
				console.log(err);
			}
		},
		async showComments(postId) {
			try {
				await this.$store.dispatch('FETCH_COMMENTS', postId);
			} catch (err) {
				console.log(err);
			}
		},
	},
};
</script>

<style></style>
