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
	addRoom(state, roomData) {
		const rooms = state.rooms;
		rooms.push(roomData);
		state.rooms = rooms;
	},

	setRoomDetail(state, data) {
		state.roomDetail = data;
	},
	setRoomId(state, id) {
		state.roomId = id;
	},

	setPosts(state, posts) {
		state.posts = posts;
	},
	addPost(state, post) {
		state.posts.unshift(post);
	},
	deletePost(state, index) {
		state.posts.splice(index, 1);
	},
	modifyPost(state, payload) {
		state.posts.splice(payload.index, 1, payload.data);
	},

	setAllComments(state, allComments) {
		state.allComments = {};
		for (let comment of allComments) {
			if (state.allComments[comment.postId] == null) {
				state.allComments[comment.postId] = [];
				state.allComments[comment.postId].push(comment);
			} else {
				state.allComments[comment.postId].push(comment);
			}
		}
	},
	addComment(state, comment) {
		if (state.allComments[comment.postId] == null) {
			state.allComments[comment.postId] = [];
			state.allComments[comment.postId].push(comment);
		} else {
			state.allComments[comment.postId].push(comment);
		}
	},
};
