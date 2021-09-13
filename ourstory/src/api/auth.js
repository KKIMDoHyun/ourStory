import { instance } from './index';
// 회원가입
function signupUser(userData) {
	return instance.post('auth/local/register', userData);
}

// 로그인
function loginUser(userData) {
	return instance.post('auth/local', userData);
}

export { signupUser, loginUser };
