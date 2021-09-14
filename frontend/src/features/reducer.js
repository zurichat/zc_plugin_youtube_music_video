import usersReducer from "./usersSlice";
import songsReducer from "./songsSlice";
import chatsReducer from "./chatsSlice";
import likedSongsReducer from "./likedSongsSlice";
import uiReducer from "./uiSlice";

export default {
  users: usersReducer,
  chats: chatsReducer,
  songs: songsReducer,
  likedSongs: likedSongsReducer,
  ui: uiReducer,
};
