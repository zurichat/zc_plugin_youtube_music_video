import usersReducer from './usersSlice';
import songsReducer from './songsSlice';
import chatsReducer from './chatsSlice';
import likedSongsReducer from './likedSongsSlice';
import uiReducer from './uiSlice';

const reducer = {
  users: usersReducer,
  chats: chatsReducer,
  songs: songsReducer,
  likedSongs: likedSongsReducer,
  ui: uiReducer,
}

export default reducer