import store from "../store";
import User from "../types/user";
import httpService from "./httpService";

const { addToRoom: enterEndpoint, leaveEndpoint } = httpService.endpoints;

function getCurrentUser(): User {
  return JSON.parse(store.getState().users.currentUser);
}

async function addToRoom() {
  const { id, orgId } = getCurrentUser();

  return httpService.post(enterEndpoint, { userId: id, orgId }).then(
    (r) => r,
    (e) => e
  );
}

function leaveRoom() {
  const { id } = getCurrentUser();

  return httpService.post(leaveEndpoint, { id }).then(
    (r) => r,
    (e) => e
  );
}

const userService = { addToRoom, leaveRoom, getCurrentUser };

export default userService;
