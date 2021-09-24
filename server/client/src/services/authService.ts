import axios from "axios";
import { uiDispatch } from "../store/uiSlice";
import User from "../types/user";
// @ts-ignore
import { GetUserInfo } from "@zuri/zuri-control";

import avatar from "../media/chatItem.svg";

let currentUser = {} as any;

async function signin() {
  uiDispatch.loading(true);

  try {
    const { data } = await axios.post("https://api.zuri.chat/auth/login", {
      email: "pid@oxy.com",
      password: "pidoxy.com",
    });

    currentUser = data.data.user;
  } catch (error) {
    console.log(error);
  }

  uiDispatch.loading(false);
  return;
}

function getCurrentUser(): User {
  return {
    name: currentUser.first_name,
    id: "userId",
    avatar,
    ...currentUser,
  };
}

const authService = { signin, getCurrentUser };

export default authService;
