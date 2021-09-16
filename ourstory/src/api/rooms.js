import { rooms } from './index';

function fetchRooms() {
	return rooms.get('rooms');
}

function createRoom() {
	return rooms.post('rooms');
}

function fetchDetailRoom(id) {
	return rooms.get(`rooms/${id}`);
}
export { fetchRooms, createRoom, fetchDetailRoom };
