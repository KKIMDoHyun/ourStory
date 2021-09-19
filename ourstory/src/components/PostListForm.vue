<template>
	<v-app id="inspire">
		<v-main class="grey lighten-3">
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
	computed: {
		posts() {
			return this.$store.state.posts;
		},
	},
};
</script>

<style></style>
