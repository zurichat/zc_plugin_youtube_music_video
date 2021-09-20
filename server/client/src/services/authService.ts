// @ts-ignore
// import { GetUserInfo } from "@zuri/zuri-control";

import avatar from "../media/chatItem.svg";

function getCurrentUser() {
  return {
    name: "user",
    id: "userId",
    avatar,
  };
}

const authService = { getCurrentUser };

export default authService;
