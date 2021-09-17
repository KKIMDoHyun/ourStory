import { rooms } from './index';

function fetchRooms() {
	return rooms.get('rooms');
}

export { fetchRooms };
