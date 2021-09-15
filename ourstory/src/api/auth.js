import { instance } from './index';
// 회원가입
function signupUser(userData) {
	return instance.post('auth/local/register', userData);
}

// 로그인
function loginUser(userData) {
	return instance.post('auth/local', userData);
}

// 유저 정보 가져오기
function getUserInfo(id) {
	return instance.get(`users/${id}`);
}

export { signupUser, loginUser, getUserInfo };
