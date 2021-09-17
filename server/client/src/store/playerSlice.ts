import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

const slice = createSlice({
  name: "player",
  initialState: {
    playing: false,
    show: false,
  },
  reducers: {
    playing: (state, action) => {
      state.playing = action.payload.playing;
    },
    showPlayer: (state, action) => {
      state.show = action.payload.show;
    },
  },
});

export const { playing, showPlayer } = slice.actions;

export const getPlayerState = (state: RootState) => state.player;

export default slice.reducer;
