import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addChat: (state, { payload }) => {
      const { id, userId, time = new Date().getTime(), message } = payload;
      state.push({ id, userId, time, message })
    },
    removeChat: (state, { payload }) => {
      const { id } = payload;
      const existingChat = state.find((chat) => chat.id === id) 
      if (existingChat) state.filter((chat) => chat.id !== id);
    },
    updateChat: (state, { payload }) => {
      const { id, message, time = new Date().getTime() } = payload;
      const existingChat = state.find((chat) => chat.id === id);
      if (existingChat) {
        existingChat.message = message;
        existingChat.time = time;
      }
    },
  },
});

export const { addChat, removeChat, updateChat, } = chatsSlice.actions;

export const selectAllChats = (state) => state.chats;
export const selectChatById = (state, chatId) => {
  return state.chats.find((chat) => chat.id === chatId)
};

export default chatsSlice.reducer;
