import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8000/music/api/v1";
axios.defaults.baseURL = "https://music.zuri.chat/music/api/v1/";

export const endpoints = {
  songEndpoint: "songs",
  commentEndpoint: "comments",
  likeEndpoint: "likesong",
  userCountEndpoint: "user-count",
  addToRoom: "add_to_room",
  leaveEndpoint: "exit",
  roomEndpoint: "room",
  deleteSong: "deletesong",
  deleteComment: "deletecomment",
};

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  endpoints,
};

export default httpService;
