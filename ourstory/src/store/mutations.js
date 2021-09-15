export default {
	setUserInfo(state, payload) {
		state.userInfo = payload;
	},
	setId(state, id) {
		state.id = id;
	},
	clearId(state) {
		state.id = '';
	},
	logout(state) {
		state.userInfo = null;
	},
	setToken(state, token) {
		state.token = token;
	},
	clearToken(state) {
		state.token = '';
	},
	startSpinner(state) {
		state.loadingStatus = true;
	},
	endSpinner(state) {
		state.loadingStatus = false;
	},
};
