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
							<v-icon color="black" class="ma-1">
								mdi-comment-multiple-outline</v-icon
							>
							{{ commentNumber(post.id) }}
						</v-row>
					</v-list-item>
				</v-card-actions>
				<v-divider></v-divider>
				<v-container>
					<v-row>
						<v-col cols="12">
							<v-text-field
								v-model="commentInput[index]"
								:append-outer-icon="commentInput[index] ? 'mdi-send' : ''"
								filled
								clear-icon="mdi-close-circle"
								clearable
								label="댓글"
								type="text"
								@click:append-outer="submitComment(index, post.id)"
								@click:clear="commentClear(index)"
							></v-text-field>
						</v-col>
					</v-row>
					<small
						class="seeComments"
						@click="commentOpen(index)"
						v-if="!commentToggle[index]"
						>댓글 보기</small
					>
					<small class="seeComments" @click="commentOpen(index)" v-else
						>댓글 숨기기</small
					>
				</v-container>
				<template v-if="commentToggle[index]">
					<template v-for="(comment, i) in commentList(post.id)">
						<v-list-item :key="i">
							<v-list-item-content>
								<v-list-item-title
									v-text="comment.author.email"
								></v-list-item-title>

								<v-list-item-subtitle
									class="text--primary"
									v-text="comment.comment"
								></v-list-item-subtitle>
								<span style="font-size: 13px">{{
									comment.createdAt | formatDate
								}}</span>
							</v-list-item-content>
						</v-list-item>
						<v-divider :key="i + 'r'"></v-divider>
					</template>
				</template>
				<!-- <template v-for="(comment, i) in commentList(post.id)">
					<v-list-item :key="i">
						<v-list-item-content>
							<v-list-item-title
								v-text="comment.author.email"
							></v-list-item-title>

							<v-list-item-subtitle
								class="text--primary"
								v-text="comment.comment"
							></v-list-item-subtitle>
							<span style="font-size: 13px">{{
								comment.createdAt | formatDate
							}}</span>
						</v-list-item-content>
					</v-list-item>
					<v-divider :key="i + 'r'"></v-divider>
				</template> -->
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
			commentInput: [],
			comments: [],
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
		allComments() {
			return this.$store.state.allComments;
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
			// this.showComments(index, postId);
		},
		commentClear(index) {
			const temp = this.commentInput.slice();
			temp[index] = '';
			this.commentInput = temp;
		},
		async submitComment(index, postId) {
			try {
				const commentData = {
					comment: this.commentInput[index],
					postId: postId,
					roomId: this.$route.params.id,
				};
				this.commentClear(index);
				await this.$store.dispatch('CREATE_COMMENT', commentData);
				await this.$store.dispatch('FETCH_ALLCOMMENTS', this.roomId);
				const temp = this.commentToggle.slice();
				temp[index] = true;
				this.commentToggle = temp;
			} catch (err) {
				console.log(err);
			}
		},
		commentNumber(id) {
			if (this.allComments[id] == null) return 0;
			else return this.allComments[id].length;
		},
		commentList(id) {
			if (this.allComments[id] == null) return null;
			else {
				return this.allComments[id];
			}
		},
	},
};
</script>

<style scoped>
.seeComments {
	cursor: pointer;
}
.seeComments:hover {
	text-decoration: underline;
}
</style>
