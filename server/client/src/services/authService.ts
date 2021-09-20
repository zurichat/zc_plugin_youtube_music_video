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
  axios.post(endpoint, getCurrentUser().id);
}

const authService = { getCurrentUser };

export default authService;
