import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: '',
  time: '',
  message: '',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addSong: (state, action) => {
      state.userName = action.payload.userName;
      state.time = action.payload.time;
      state.message = action.payload.message;
    },
  },
});

export const { setUserLoginDetails } = chatSlice.actions;

export const selectChatUser = (state) => state.chat.userName;
export const selectChatTime = (state) => state.chat.time;
export const selectChatMessage = (state) => state.chat.message;

export default chatSlice.reducer;
