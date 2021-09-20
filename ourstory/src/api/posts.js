import { posts } from './index';

function fetchPosts() {
	return posts.get('posts');
}

function fetchPost(id) {
	return posts.get(`posts/${id}`);
}

function createPost(postData) {
	return posts.post('posts', postData);
}

function deletePost(id) {
	return posts.delete(`posts/${id}`);
}

function modifyPost(payload) {
	return posts.put(`posts/${payload.postId}`, payload.postData);
}

export { fetchPosts, fetchPost, createPost, deletePost, modifyPost };
