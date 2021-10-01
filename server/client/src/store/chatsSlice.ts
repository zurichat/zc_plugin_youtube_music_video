import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from ".";
import Chat from "../types/chat";
import { sanitize } from "../utils/sanitizer";

// import avatar from "../media/chatItem.svg";

const chatsSlice = createSlice({
  name: "chats",

  initialState: [] as Chat[],

  reducers: {
    setChats: (state, { payload }: PayloadAction<Chat[]>) => {
      return payload.map(sanitize);
    },

    addChat: (state, { payload }: PayloadAction<Chat>) => {
      state.push(sanitize(payload));
    },

    removeChat: (state, { payload }: PayloadAction<Chat>) => {
      const { id } = payload;
      const existingChat = state.find((chat) => chat.id === id);
      if (existingChat) return state = state.filter((chat) => chat !== existingChat);
    },

    updateChat: (state, { payload }: PayloadAction<Chat>) => {
      const { id } = payload;
      state.map((chat) => {
        if(chat.id === id){
          chat.notSent = false;
          chat.failed = true;
        }
      });

      //const existingChat = state.find((chat) => chat.id === id);

      /*if (existingChat) {
        //existingChat.message = message;
        //existingChat.time = time;
        existingChat.failed = true;
        existingChat.notSent = false;
      }*/
    },
  },
});

export const { addChat, setChats, updateChat, removeChat } = chatsSlice.actions;

export const chatDispatch = {
  set: (payload: Chat[]) => store.dispatch({ type: setChats.type, payload }),

  addChat: (payload: Chat) => store.dispatch({ type: addChat.type, payload }),

  updateChat: (payload: Chat[]) => store.dispatch({ type: updateChat.type, payload}),

  removeChat: (payload: Chat) => store.dispatch({ type: removeChat.type, payload}),
};

export const chatSelect = {
  allChat: (state: RootState) => state.chats,

  chatById: (state: RootState, id: string) => {
    return state.chats.find((chat) => chat.id === id);
  },
};

export default chatsSlice.reducer;
