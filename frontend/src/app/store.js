import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
// import songReducer from '../features/songSlice';
// import commentReducer from '../features/commentSlice';

export default store = configureStore({
  reducer: {
    user: userReducer,
    song: songReducer,
    comment: commentReducer,
  },
});
