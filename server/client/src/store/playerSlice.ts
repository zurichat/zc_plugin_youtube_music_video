import { createSlice } from "@reduxjs/toolkit";
import store, { RootState } from ".";
import Song from "../types/song";

interface InitialState {
  playing: boolean;
  show: boolean;
  currentSong: Song;
}

const slice = createSlice({
  name: "player",

  initialState: {
    playing: false,
    show: false,
    currentSong: {},
  } as InitialState,

  reducers: {
    playing: (state, action) => {
      state.playing = action.payload.playing;
    },

    showPlayer: (state, action) => {
      state.show = action.payload.show;
    },

    changeCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
  },
});

export const { playing, showPlayer, changeCurrentSong } = slice.actions;

export const playerAction = {
  dispatchShowPlayer: (payload: boolean) => {
    store.dispatch({ type: showPlayer.type, payload: { show: payload } });
  },

  dispatchPlaying: (payload: boolean) => {
    store.dispatch({ type: playing.type, payload: { playing: payload } });
  },

  changeSong: (payload: Song) => {
    store.dispatch({ type: changeCurrentSong.type, payload });
  },
};

export const getPlayerState = (state: RootState) => state.player;

export const playerSelector = {
  selectCurrentSong: (state: RootState) => state.player.currentSong,
};

export default slice.reducer;
