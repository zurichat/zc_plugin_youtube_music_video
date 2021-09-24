import authService from "./authService";
import httpService from "./httpService";

const { addToRoom: enterEndpoint, leaveEndpoint } = httpService.endpoints;

async function addToRoom() {
  const { id } = authService.getCurrentUser();

  return httpService.post(enterEndpoint, { id }).then(
    (r) => r,
    (e) => e
  );
}

function leaveRoom() {
  const { id } = authService.getCurrentUser();

  return httpService.post(leaveEndpoint, { id }).then(
    (r) => r,
    (e) => e
  );
}

const userService = { addToRoom, leaveRoom };

export default userService;
