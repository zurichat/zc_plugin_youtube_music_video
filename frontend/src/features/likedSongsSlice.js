import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const likedSongsSlice = createSlice({
  name: 'likedSongs',
  initialState,
  reducers: {
    likeSong: (state, { payload }) => {
      const { id, userId } = payload;
      const checkIfIdExists = state.find((like) => like.id === id)
      if (checkIfIdExists) {
        getId['userIds'].push(userId)
      }
      else if (checkIfIdExists === undefined) {
        state.push({ id })
        const getId = state.find((like) => like.id === id);
        getId['userIds'] = [];
        if (getId) {
          getId['userIds'].push(userId)
        }
      }
    },
    unlikeSong: (state, action) => {
      const { id, userId } = action.payload;
      const findSongId = state.find((songId) => songId === id);
      state[findSongId]['userIds'].filter((user) => user !== userId)
    },
  },
});

export const { likeSong, unlikeSong, } = likedSongsSlice.actions;

export const selectAllLikedSongs = (state) => state.songs;
export const selectLikedSongById = (state, likedSongId) => {
  return state.songs.find((song) => song.id === likedSongId);
};

export default likedSongsSlice.reducer;
