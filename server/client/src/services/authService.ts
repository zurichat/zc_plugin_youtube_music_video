function getCurrentUser() {
  return {
    name: "user",
    id: "userId",
  };
}

const authService = { getCurrentUser };

export default authService;
