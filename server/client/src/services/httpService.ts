import axios from "axios";

const org_id = "614679ee1a5607b13c00bcb7";
const room_id = "616714d49f7a790c08d222ee";

// axios.defaults.baseURL = "http://localhost:8000/music/api/v1";
// axios.defaults.baseURL = "https://music.zuri.chat/music/api/v1/";
axios.defaults.baseURL = `https://music.zuri.chat/music/api/v1/org/${org_id}/room/${room_id}/`;

export const endpoints = {
	currentSongEndpoint: "currentsong",
	songEndpoint: "songs",
	deleteSong: "songs/deletesong",
	songsearch: "songsearch",
	commentEndpoint: "comments",
	deleteComment: "comments/deletecomment",
	updatecomment: "comments/updatecomment",
	roomdetail: "roomdetail",
	deleteroom: "deleteroom",
	userCountEndpoint: "members/usercount",
	removeuser: "members/removeuser",
	members: "members",
	adduser: "members/adduser"
};

const httpService = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	room_id,
	endpoints
};

export default httpService;
