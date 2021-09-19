import { createSlice } from "@reduxjs/toolkit";
import store, { RootState } from ".";

import Song from "../types/song";

const songsSlice = createSlice({
  name: "songs",
  initialState: getMockData(),
  reducers: {
    addSong: (state, { payload }) => {
      state.unshift(payload.song);
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

export const songSelector = {
  selectAllSongs: (state: RootState) => state.songs,

  selectSongById: (songId: string) => (state: RootState) => {
    return state.songs.find((song) => song.id === songId);
  },

  selectFirstSong: (state: RootState) => state.songs[0],
};

export default songsSlice.reducer;

function getMockData() {
  const mock: Song[] = [
    {
      title: "Came to My Rescue - Emmy Rose",
      id: "mC-5AyfwMoI",
      url: "https://youtu.be/mC-5AyfwMoI",
      albumCover: "https://i.ytimg.com/vi/mC-5AyfwMoI/hqdefault.jpg",
      addedBy: "Justiz",
      duration: "--:--",
    },
    {
      title: "When You Were A Child (Live) - Jason Upton",
      id: "rbWBYs_7kCA",
      url: "https://www.youtube.com/watch?v=rbWBYs_7kCA",
      albumCover: "https://i.ytimg.com/vi/rbWBYs_7kCA/hqdefault.jpg",
      addedBy: "Justiz",
      duration: "--:--",
    },
    {
      id: "VFmQEqDLP2k",
      title: "Jason Upton - Freedom Reigns",
      url: "https://youtu.be/VFmQEqDLP2k",
      albumCover: "https://i.ytimg.com/vi/VFmQEqDLP2k/hqdefault.jpg",
      addedBy: "Justiz",
      duration: "--:--",
    },
  ];

  return mock;
}
