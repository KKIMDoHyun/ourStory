function saveAuthToCookie(value) {
	document.cookie = `token=${value}`;
}

function saveUserToCookie(value) {
	document.cookie = `email=${value}`;
}

function saveUserInfoToCookie(value) {
	document.cookie = `userInfo=${value}`;
}

function getAuthFromCookie() {
	return document.cookie.replace(
		/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
		'$1',
	);
}

function getUserFromCookie() {
	return document.cookie.replace(
		/(?:(?:^|.*;\s*)email\s*=\s*([^;]*).*$)|^.*$/,
		'$1',
	);
}

function getUserInfoFromCookie() {
	return document.cookie.replace(
		/(?:(?:^|.*;\s*)userInfo\s*=\s*([^;]*).*$)|^.*$/,
		'$1',
	);
}

function deleteCookie(value) {
	document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export {
	saveAuthToCookie,
	saveUserToCookie,
	saveUserInfoToCookie,
	getAuthFromCookie,
	getUserFromCookie,
	getUserInfoFromCookie,
	deleteCookie,
};
