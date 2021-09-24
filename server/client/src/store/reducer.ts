import usersReducer from "./usersSlice";
import songsReducer from "./songsSlice";
import chatsReducer from "./chatsSlice";
import uiReducer from "./uiSlice";
import playerReducer from "./playerSlice";

const reducer = {
  users: usersReducer,
  chats: chatsReducer,
  songs: songsReducer,
  ui: uiReducer,
  player: playerReducer,
};

export default reducer;
