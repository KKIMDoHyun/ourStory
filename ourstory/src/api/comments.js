import { comments } from './index';

function fetchComments(postId) {
	return comments.get(`comments?postId=${postId}`);
}

function createComment(commentData) {
	return comments.post('comments', commentData);
}

export { fetchComments, createComment };
