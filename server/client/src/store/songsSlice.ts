import { createSlice } from "@reduxjs/toolkit";
import store, { RootState } from ".";

import getSongs from "../mock-data/songs";
import Song from "../types/song";

const initialState = getSongs();

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    addSong: (state, { payload }) => {
      state.push(payload.song);
    },

    removeSong: (state, { payload }) => {
      state.filter((song) => song.id !== payload.id);
    },

    updateSong: (state, { payload }) => {
      const { id, title, albumCover, duration } = payload;
      const existingSong = state.find((song) => song.id === id);
      if (existingSong) {
        existingSong.title = title;
        existingSong.duration = duration;
        existingSong.albumCover = albumCover;
      }
    },
  },
});

export const { addSong, removeSong, updateSong } = songsSlice.actions;

export const songAction = {
  dispatchAddSong: (payload: Song) => {
    store.dispatch({ type: addSong.type, payload: { song: payload } });
  },

  dispatchRemoveSong: (payload: Song) => {
    store.dispatch({ type: removeSong.type, payload: { id: payload.id } });
  },

  dispatchUpdateSong: (payload: Song) => {
    store.dispatch({ type: updateSong.type, payload });
  },
};

export const selectAllSongs = (state: RootState) => state.songs;

export const selectSongById = (state: RootState, songId: string) => {
  return state.songs.find((song) => song.id === songId);
};

export default songsSlice.reducer;
