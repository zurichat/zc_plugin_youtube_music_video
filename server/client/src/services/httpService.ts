import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8000/music/api/v1";
axios.defaults.baseURL = "https://music.zuri.chat/music/api/v1";

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
};

export default httpService;
