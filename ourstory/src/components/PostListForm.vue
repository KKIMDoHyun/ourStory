<template>
	<v-app id="inspire">
		<v-main class="grey lighten-3">
			<Spinner v-if="isLoading"></Spinner>
			<v-card
				v-else
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
								@click="deletePost(post.id)"
							>
								<v-icon>mdi-delete</v-icon>
							</v-btn>
						</v-row>
					</v-list-item>
				</v-card-actions>

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
import Spinner from '@/components/common/LoadingSpinner.vue';
export default {
	components: {
		Spinner,
	},
	data() {
		return {
			isLoading: false,
		};
	},
	computed: {
		posts() {
			return this.$store.state.posts;
		},
		userId() {
			return this.$store.state.id;
		},
	},
	methods: {
		async deletePost(id) {
			try {
				this.isLoading = true;
				await this.$store.dispatch('DELETE_POST', id);
				this.isLoading = false;
			} catch (err) {
				console.log(err);
			}
		},
		modifyPost(id) {
			this.$router.push(`/post/modify/${id}`);
		},
		// async modifyPost(id) {
		// 	try {
		// 		this.isLoading = true;
		// 		console.log(id);
		// 		// await this.$store.dispatch('MODIFY_POST', id);
		// 		this.isLoading = false;
		// 	} catch (err) {
		// 		console.log(err);
		// 	}
		// },
		async fetchDetailRoom(id) {
			try {
				this.isLoading = true;
				await this.$store.dispatch('FETCH_DETAILROOM', id);
				await this.$store.dispatch('FETCH_POSTS');
				this.isLoading = false;
			} catch (err) {
				console.log(err);
			}
		},
	},
	async created() {
		await this.fetchDetailRoom(this.$route.params.id);
	},
};
</script>

<style></style>
