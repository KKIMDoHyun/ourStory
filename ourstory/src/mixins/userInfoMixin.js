export default {
	methods: {
		async fetchUserInfo(id) {
			try {
				this.isLoading = true;
				const data = await this.$store.dispatch('FETCH_USERINFO', id);
				this.isLoading = false;
				this.userInfo = data;
			} catch (err) {
				console.log(err);
			}
		},
	},
};
