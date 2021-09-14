function saveAuthToCookie(value) {
	document.cookie = `token=${value}`;
}

function saveIdToCookie(value) {
	document.cookie = `id=${value}`;
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

function getIdFromCookie() {
	return document.cookie.replace(
		/(?:(?:^|.*;\s*)id\s*=\s*([^;]*).*$)|^.*$/,
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
	saveUserInfoToCookie,
	saveIdToCookie,
	getAuthFromCookie,
	getUserInfoFromCookie,
	getIdFromCookie,
	deleteCookie,
};
