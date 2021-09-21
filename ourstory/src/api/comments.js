import { comments } from './index';

function fetchComments() {
	return comments.get('comments');
}

export { fetchComments };
