import authService from "./authService";
import httpService from "./httpService";

const enterEndpoint = "/add_to_room";
const leaveEndpoint = "/exit";

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
