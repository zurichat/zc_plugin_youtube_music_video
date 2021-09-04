import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import playlistReducer from '../features/playlistSlice';
import chatReducer from '../features/chatSlice';

export default store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    playlist: playlistReducer,
  },
});
