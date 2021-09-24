import axios from "axios";
import { uiDispatch } from "../store/uiSlice";
import User from "../types/user";

import avatar from "../media/chatItem.svg";

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