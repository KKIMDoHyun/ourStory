import { rooms } from './index';

function fetchRooms() {
	return rooms.get('rooms');
}

function createRoom() {
	return rooms.post('rooms');
}

export { fetchRooms, createRoom };
