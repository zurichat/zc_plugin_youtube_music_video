import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from ".";
import Chat from "../types/chat";

import avatar from "../media/chatItem.svg";

const mock: Chat = {
  _id: Date.now() + "",
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
    addChat: (state, { payload }: PayloadAction<Chat>) => {
      state.push(payload);
    },

    removeChat: (state, { payload }: PayloadAction<Chat>) => {
      const { _id } = payload;
      const existingChat = state.find((chat) => chat._id === _id);
      if (existingChat) state.filter((chat) => chat._id !== _id);
    },

    updateChat: (state, { payload }: PayloadAction<Chat>) => {
      const { _id, message, time = Date.now() } = payload;

      const existingChat = state.find((chat) => chat._id === _id);

      if (existingChat) {
        existingChat.message = message;
        existingChat.time = time;
      }
    },
  },
});

export const { addChat } = chatsSlice.actions;

export const chatDispatch = {
  addChat: (payload: Chat) => {
    store.dispatch({ type: addChat.type, payload });
  },
};

export const chatSelect = {
  allChat: (state: RootState) => state.chats,

  chatBy_id: (state: RootState, _id: string) => {
    return state.chats.find((chat) => chat._id === _id);
  },
};

export default chatsSlice.reducer;
