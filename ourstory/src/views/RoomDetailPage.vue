<template>
	<v-app id="inspire">
		<v-main class="grey lighten-3">
			<v-card class="mx-auto mb-4" style="max-width: 750px">
				<form @submit.prevent="submitPost">
					<v-text-field
						filled
						background-color="white"
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
						<v-btn @click="clearInput"> 취소 </v-btn>
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
			<Spinner v-if="isLoading"></Spinner>
			<PostListForm v-else></PostListForm>
		</v-main>
	</v-app>
</template>

<script>
import PostListForm from '@/components/PostListForm.vue';
import Spinner from '@/components/common/LoadingSpinner.vue';

export default {
	components: {
		PostListForm,
		Spinner,
	},
	data() {
		return {
			isLoading: false,
			title: '',
			content: '',
		};
	},
	computed: {
		btnOn() {
			if (this.title !== '' && this.content !== '') {
				return false;
			} else {
				return true;
			}
		},
	},
	methods: {
		async submitPost() {
			try {
				const postData = {
					title: this.title,
					content: this.content,
					room: this.$store.state.roomDetail,
				};
				this.clearInput();
				this.isLoading = true;
				await this.$store.dispatch('CREATE_POST', postData);
				this.isLoading = false;
			} catch (err) {
				console.log(err.response);
			}
		},
		clearInput() {
			this.title = '';
			this.content = '';
		},
	},
};
</script>

<style></style>
