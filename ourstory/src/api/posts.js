import { posts } from './index';

function fetchPosts() {
	return posts.get('posts');
}

function createPost(postData) {
	return posts.post('posts', postData);
}

function deletePost(id) {
	return posts.delete(`posts/${id}`);
}

export { fetchPosts, createPost, deletePost };
