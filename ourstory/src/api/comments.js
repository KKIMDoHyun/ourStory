import { comments } from './index';

function fetchComments(postId) {
	return comments.get(`comments?postId=${postId}`);
}

function fetchAllComments(roomId) {
	return comments.get(`comments?roomId=${roomId}`);
}

function createComment(commentData) {
	console.log(commentData);
	return comments.post('comments', commentData);
}

export { fetchComments, fetchAllComments, createComment };
