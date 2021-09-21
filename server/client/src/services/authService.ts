// @ts-ignore
import { GetUserInfo } from "@zuri/zuri-control";
import axios from "axios";

import avatar from "../media/chatItem.svg";

function getCurrentUser() {
  console.log(GetUserInfo());
  return {
    name: "user",
    id: "userId",
    avatar,
  };
}

function addToRoom() {
  const endpoint = "http://localhost:8000/music/api/v1/add_to_room";

  return axios.post(endpoint, { userId: getCurrentUser().id }).then(
    (r) => r,
    (e) => e
  );
}

const authService = { getCurrentUser, addToRoom };

export default authService;
