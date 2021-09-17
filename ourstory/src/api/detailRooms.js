import { detailRooms } from './index';

function createRoom(roomData) {
	return detailRooms.post('rooms', roomData);
}

function fetchDetailRoom(id) {
	return detailRooms.get(`rooms/${id}`);
}

export { createRoom, fetchDetailRoom };
