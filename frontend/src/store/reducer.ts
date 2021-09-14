import usersReducer from "./usersSlice";
import songsReducer from "./songsSlice";
import chatsReducer from "./chatsSlice";
import likedSongsReducer from "./likedSongsSlice";
import uiReducer from "./uiSlice";
import playerReducer from "./playerSlice";

const reducer = {
  users: usersReducer,
  chats: chatsReducer,
  songs: songsReducer,
  likedSongs: likedSongsReducer,
  ui: uiReducer,
  player: playerReducer,
};

export default reducer;
