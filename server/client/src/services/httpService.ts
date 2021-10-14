import axios from "axios";

const org_id = "614679ee1a5607b13c00bcb7";
const room_id = "616714d49f7a790c08d222ee";

// axios.defaults.baseURL = "http://localhost:8000/music/api/v1";
// axios.defaults.baseURL = "https://music.zuri.chat/music/api/v1/";
axios.defaults.baseURL = `https://music.zuri.chat/music/api/v1/org/${org_id}/room/${room_id}/`;

export const endpoints = {
	currentSongEndpoint: "current",
	songEndpoint: "songs",
	deleteSong: "songs/delete",
	songsearch: "songsearch",
	commentEndpoint: "comments",
	deleteComment: "comments/delete",
	updatecomment: "comments/update",
	roomdetail: "roomdetail",
	deleteroom: "deleteroom",
	members: "members",
	adduser: "members/add",
	removeuser: "members/remove",
	userCountEndpoint: "members/count"
};

const httpService = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	room_id,
	endpoints
};

export default httpService;
