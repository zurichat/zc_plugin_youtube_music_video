import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8000/music/api/v1";
axios.defaults.baseURL = "https://music.zuri.chat/music/api/v1/";
// axios.defaults.baseURL = "159.65.123.65/music/api/v1/";

const endpoints = {
  songEndpoint: "song/",
  commentEndpoint: "comments/",
  likeEndpoint: "like/",
  userCountEndpoint: "header-user-count/",
  addToRoom: "add_to_room/",
  leaveEndpoint: "exit/",
};

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  endpoints,
};

export default httpService;
