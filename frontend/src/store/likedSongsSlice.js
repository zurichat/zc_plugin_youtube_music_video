import { createSlice } from "@reduxjs/toolkit";
// import LikedSong from '../types/likedSong';

// Note: state: LikedSong[] = [];

const likedSongsSlice = createSlice({
  name: "likedSongs",
  initialState: [],
  reducers: {
    likeSong: (state, { payload }) => {
      const { songId, userId } = payload;
      const index = state.findIndex((liked) => liked.id === songId);

      if (index === -1) state.push({ id: songId, usersId: [userId] });
      else state[index].usersId.push(userId);
    },
    unlikeSong: (state, action) => {
      const { songId, userId } = action.payload;
      const index = state.findIndex((liked) => liked.id === songId);
      state[index].usersId = state[index].usersId.filter((id) => id !== userId);
    },
  },
});

export const { likeSong, unlikeSong } = likedSongsSlice.actions;

export const selectAllLikedSongs = (state) => state.songs;
export const selectLikedSongById = (state, likedSongId) => {
  return state.songs.find((song) => song.id === likedSongId);
};

export default likedSongsSlice.reducer;
