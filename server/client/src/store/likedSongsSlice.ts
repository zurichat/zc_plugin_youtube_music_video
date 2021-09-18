import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

import LikedSong from "../types/likedSong";

const likedSongsSlice = createSlice({
  name: "likedSongs",
  initialState: [] as LikedSong[],
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

export const selectAllLikedSongs = (state: RootState) => state.songs;

export const selectLikedSongById = (state: RootState, likedSongId: string) => {
  return state.songs.find((song) => song.id === likedSongId);
};

export default likedSongsSlice.reducer;
