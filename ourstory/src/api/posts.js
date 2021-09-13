import { posts } from './index';

function fetchPosts() {
	return posts.get('posts');
}

function createPost() {
	return posts.post('posts');
}

export { fetchPosts, createPost };
