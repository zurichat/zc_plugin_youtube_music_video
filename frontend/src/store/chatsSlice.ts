import { createSlice } from "@reduxjs/toolkit";
import getChats from "../mock-data/chats";
import { RootState } from ".";

const initialState = getChats();

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addChat: (state, { payload }) => {
      state.push(payload.chat);
    },
    removeChat: (state, { payload }) => {
      const { id } = payload;
      const existingChat = state.find((chat) => chat.id === id);
      if (existingChat) state.filter((chat) => chat.id !== id);
    },
    updateChat: (state, { payload }) => {
      const { id, message, time = Date.now() + "" } = payload;
      const existingChat = state.find((chat) => chat.id === id);
      if (existingChat) {
        existingChat.message = message;
        existingChat.time = time;
      }
    },
  },
});

export const { addChat, removeChat, updateChat } = chatsSlice.actions;

export const selectAllChats = (state: RootState) => state.chats;
export const selectChatById = (state: RootState, chatId: string) => {
  return state.chats.find((chat) => chat.id === chatId);
};

export default chatsSlice.reducer;
