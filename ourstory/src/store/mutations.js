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
	setRooms(state, rooms) {
		state.rooms = rooms;
	},
	setRoomData(state, roomData) {
		state.roomData = roomData;
	},
};
