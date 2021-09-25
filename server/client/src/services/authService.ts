import axios from "axios";

import store from "../store";
import { userDispatch } from "../store/usersSlice";
import User from "../types/user";
import avatar from "../media/chatItem.svg";

async function signin() {
  // try {
  //   const { data } = await axios.post("https://api.zuri.chat/auth/login", {
  //     email: "pid@oxy.com",
  //     password: "pidoxy.com",
  //   });

  //   const { first_name: name, id, token } = data.data.user;
  //   userDispatch.setCurrentUser({ name, id, token, avatar });
  // } catch (error) {
  //   console.log(error);
  // }

  return;
}

function getCurrentUser(): User {
  const {
    first_name: name,
    id,
    token,
  } = JSON.parse(store.getState().users.currentUser);

  return {
    name,
    id,
    avatar,
    token,
  };
}

const authService = { signin, getCurrentUser };

export default authService;
