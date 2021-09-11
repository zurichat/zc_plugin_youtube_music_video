import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    addSong: (state, { payload }) => {
      const { id, title, albumCover, duration, userId, } = payload;
      state.push({ id, title, albumCover, duration, userId, });
    },
    removeSong: (state, { payload }) => {
      const { id } = payload;
      const existingSong = state.find((song) => song.id === id) 
      if (existingSong) state.filter((song) => song.id !== id);
    },
    updateSong: (state, { payload }) => {
      const { id, title, albumCover, duration, } = payload;
      const existingSong = state.find((song) => song.id === id)
      if (existingSong) {
        existingSong.title = title;
        existingSong.duration = duration;
        existingSong.albumCover = albumCover;
      }
    },
  },
});

export const { addSong, removeSong, updateSong} = songsSlice.actions;

export const selectAllSongs = (state) => state.songs;
export const selectSongById = (state, songId) => {
  return state.songs.find((song) => song.id === songId)
};

export default songsSlice.reducer;
