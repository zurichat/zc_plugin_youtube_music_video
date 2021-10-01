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
  currentSongEndpoint: "current-song",
  deleteSong: "deletesong",
  deleteComment: "deletecomment",
  membersListEndpoint: "user",
};

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  endpoints,
};

export default httpService;
