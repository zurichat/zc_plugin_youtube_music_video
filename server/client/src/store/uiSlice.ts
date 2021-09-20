import { createSlice } from "@reduxjs/toolkit";
import store, { RootState } from ".";

const slice = createSlice({
  name: "UI",

  initialState: {
    isLoading: false,
    congrats: false,
    showChat: false,
    addSong: false,
    showModal: true,
    showExitModal: false,
  },

  reducers: {
    loaded: (state, action) => {
      state.isLoading = action.payload;
    },

    congratsToggled: (state, action) => {
      state.congrats = action.payload;
    },

    showChat: (state, action) => {
      state.showChat = action.payload;
    },

    showPasteUrl: (state, action) => {
      state.addSong = action.payload;
    },
    showModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

const { loaded, showChat, showPasteUrl, showModal } = slice.actions;

export const uiDispatch = {
  showPasteUrl: (payload: boolean) => {
    store.dispatch({ type: showPasteUrl.type, payload });
  },

  showChat: (payload: boolean) =>
    store.dispatch({ type: showChat.type, payload }),

  loading: (payload: boolean) => store.dispatch({ type: loaded.type, payload }),
  showModal: (payload: boolean) => store.dispatch({ type: showModal.type, payload }),
};

export const uiSelect = {
  showChat: (state: RootState) => state.ui.showChat,

  showPasteUrl: (state: RootState) => state.ui.addSong,

  isLoading: (state: RootState) => state.ui.isLoading,
  showModal: (state: RootState) => state.ui.showModal,
};

export default slice.reducer;
