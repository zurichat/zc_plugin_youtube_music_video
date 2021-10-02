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
      state = state.filter((chat) => chat.id !== payload.id);
    },

    updateChat: (state, { payload }: PayloadAction<Chat>) => {
      const { id } = payload;
      state.map((chat) => {
        if(chat.id === id){
          chat.notSent = false;
          chat.failed = true;
        }
      });
    },

  },
});

export const { addChat, setChats, updateChat, removeChat } = chatsSlice.actions;

export const chatDispatch = {
  set: (payload: Chat[]) => store.dispatch({ type: setChats.type, payload }),

  addChat: (payload: Chat) => store.dispatch({ type: addChat.type, payload }),

  updateChat: (payload: Chat) => store.dispatch({ type: updateChat.type, payload}),

  removeChat: (id: string) =>
store.dispatch({ type: removeChat.type, payload: { id } }),
};

export const chatSelect = {
  allChat: (state: RootState) => state.chats,

  chatById: (id: string) => (state: RootState) => {
    return state.chats.find((chat) => chat.id === id);
  },

  lastChat: (state: RootState) => state.chats[state.chats.length - 1],
};

export default chatsSlice.reducer;
