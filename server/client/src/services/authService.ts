// @ts-ignore
import { GetUserInfo } from "@zuri/zuri-control";
import axios from "axios";
import { uiDispatch } from "../store/uiSlice";

import avatar from "../media/chatItem.svg";
import log from "./logService";

let currentUser = {} as any;

async function signin() {
  const endpoint = "https://api.zuri.chat/auth/login";
  uiDispatch.loading(true);

  try {
    const { data } = await axios.post(endpoint, {
      email: "pid@oxy.com",
      password: "pidoxy.com",
    });

    currentUser = data.data.user;

    log.success("You may proceed.");
  } catch (error) {
    console.log(error);
    log.error("User is not signed in. Please refresh the page");
  }

  uiDispatch.loading(false);
  return;
}

function getCurrentUser() {
  return {
    name: currentUser.first_name,
    id: "userId",
    avatar,
    ...currentUser,
  };
}

async function addToRoom() {
  const endpoint = "http://localhost:8000/music/api/v1/add_to_room";
  const { id } = getCurrentUser();

  // const res = GetUserInfo();
  // console.log(res);

  return axios.post(endpoint, { id }).then(
    (r) => r,
    (e) => e
  );
}

const authService = { signin, getCurrentUser, addToRoom };

export default authService;
