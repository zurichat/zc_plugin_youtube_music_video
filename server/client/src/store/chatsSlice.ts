import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from ".";
import Chat from "../types/chat";

import avatar from "../media/user-pic.jpg";

const mock: Chat = {
  id: Date.now() + "",
  userId: Date.now() + "",
  name: "Mr._Primal",
  time: 1632221670207,
  message: "Hello there",
  avatar: avatar,
};

const chatsSlice = createSlice({
  name: "chats",

  initialState: [mock],

  reducers: {
    initialize: (state, { payload }: PayloadAction<Chat[]>) => {
      return payload;
    },

    addChat: (state, { payload }: PayloadAction<Chat>) => {
      state.push(payload);
    },

    removeChat: (state, { payload }: PayloadAction<Chat>) => {
      const { id } = payload;
      const existingChat = state.find((chat) => chat.id === id);
      if (existingChat) state.filter((chat) => chat.id !== id);
    },

    updateChat: (state, { payload }: PayloadAction<Chat>) => {
      const { id, message, time = Date.now() } = payload;

      const existingChat = state.find((chat) => chat.id === id);

      if (existingChat) {
        existingChat.message = message;
        existingChat.time = time;
      }
    },
  },
});

export const { addChat, initialize } = chatsSlice.actions;

export const chatDispatch = {
  initialize: (payload: Chat[]) =>
    store.dispatch({ type: initialize.type, payload }),

  addChat: (payload: Chat) => store.dispatch({ type: addChat.type, payload }),
};

export const chatSelect = {
  allChat: (state: RootState) => state.chats,

  chatById: (state: RootState, id: string) => {
    return state.chats.find((chat) => chat.id === id);
  },
};

export default chatsSlice.reducer;
