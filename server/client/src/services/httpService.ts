import axios from "axios";

const org_id = localStorage.getItem("currentWorkspace") || "61695d8bb2cc8a9af4833d46";
const room_id = sessionStorage.getItem("currentRoom") || "6169d8b54bfde011fe582e65";

// axios.defaults.baseURL = "http://localhost:8000/music/api/v1";
// axios.defaults.baseURL = "https://music.zuri.chat/music/api/v1/";
axios.defaults.baseURL = `https://music.zuri.chat/music/api/v1/org/${org_id}/room/${room_id}/`;

export const endpoints = {
	// Songs endpoints
	songs: "songs",
	currentsong: "songs/current",
	deletesong: "songs/delete",
	songsearch: "songsearch",
	likesong: "songs/like",

	// Comments endpoints
	comments: "comments",
	deletecomment: "comments/delete",
	updatecomment: "comments/update",

	// Room endpoints
	roomdetail: "roomdetail",
	deleteroom: "deleteroom",

	// Members endpoins
	members: "members",
	adduser: "members/add",
	removeuser: "members/remove",
	usercount: "members/count"
};

const httpService = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	room_id,
	org_id,
	endpoints
};

export default httpService;
