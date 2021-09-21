import { createSlice } from "@reduxjs/toolkit";
import store, { RootState } from ".";
import Chat from "../types/chat";

import avatar from "../media/chatItem.svg";

const chatsSlice = createSlice({
  name: "chats",
  // initialState: getMockChat(),
  initialState: [{
        id: Date.now() + "",
        userId: Date.now() + "",
        name: "Mr. Primal",
        time: 23,
        message: "Hello there",
        avatar: avatar,
  }],

  reducers: {
    addChat: (state, { payload }) => {
      state.push(payload);
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

export const { addChat } = chatsSlice.actions;

export const chatDispatch = {
  addChat: (payload: Chat) => {
    store.dispatch({ type: addChat.type, payload });
  },
};

export const chatSelect = {
  allChat: (state: RootState) => state.chats,

  chatById: (state: RootState, chatId: string) => {
    return state.chats.find((chat) => chat.id === chatId);
  },
};

// function getMockChat() {
//   const chat: Chat = {
//     id: "default",
//     time: Date.now(),
//     userId: "Justiz...",
//     name: "Justiz",
//     avatar,
//     message:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque quidem adipisci veritatis eligendi dolore ratione facilis harum excepturi, ipsum officia qui architecto nobis neque illo aliquid numquam corporis vero sed.",
//   };

//   return [chat];
// }

export default chatsSlice.reducer;
