import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "UI",
  initialState: {
    isLoading: false,
    congrats: false,
    chatMobile: false,
    showChat: false,
  },
  reducers: {
    loaded: (state, action) => {
      state.isLoading = false;
    },
    congratsToggled: (state, action) => {
      state.congrats = action.payload.congrats;
    },
    toggleChat: (state, action) => {
      state.showChat = action.payload.chat;
    },
  },
});

export const { loaded, congratsToggled, toggleChat } = slice.actions;

export const getChatState = (state) => state.ui.showChat;

export default slice.reducer;
