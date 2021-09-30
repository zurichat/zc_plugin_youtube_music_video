// @ts-ignore
import { GetUserInfo, GetWorkspaceUser } from "@zuri/control";

import store from "../store";
import { userDispatch } from "../store/usersSlice";
import User from "../types/user";
import httpService from "./httpService";

const { addToRoom: enterEndpoint, leaveEndpoint } = httpService.endpoints;

function getCurrentUser(): User {
  return JSON.parse(store.getState().users.currentUser);
}

async function addUserToList({ email, id }: { email: string; id: string }) {
  try {
    const { user_name, image_url } = await GetWorkspaceUser(email);
    userDispatch.addUser({ name: user_name, avatar: image_url, email, id });
  } catch (error) {
    console.log("Error:", error.message);
  }
}

function removeUserFromList(id: string) {
  userDispatch.removeUser({ id });
}

async function addUserToRoom() {
  try {
    const { 0: info, token, currentWorkspace } = await GetUserInfo();
    // const { email, _id } = info;

    console.log({ info, token, currentWorkspace });

    const { email, image_url, user_name, _id } = info;

    const user = {
      email,
      id: _id,
      name: user_name,
      avatar: image_url,
    };

    userDispatch.setCurrentUser(user);
    userDispatch.addUser(user);

    return httpService.post(enterEndpoint, { _id, email }).then(
      (r) => r,
      (e) => console.log(e.message)
    );
  } catch (error) {
    console.log("Error: add to room:", error.message);
  }
}

function removeUserFromRoom() {
  const { id } = getCurrentUser();

  return httpService.post(leaveEndpoint, { id }).then(
    (r) => r,
    (e) => e
  );
}

const userService = {
  addUserToRoom,
  addUserToList,
  leaveRoom: removeUserFromRoom,
  getCurrentUser,
};

export default userService;
