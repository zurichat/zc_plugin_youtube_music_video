import { createSlice } from "@reduxjs/toolkit";
import store, { RootState } from ".";

import LikedSong from "../types/likedSong";
import LikeSong from "../types/likeSong";

const likedSongsSlice = createSlice({
  name: "likedSongs",

  initialState: [] as LikedSong[],

  reducers: {
    toggleLike: (state, { payload }) => {
      const { songId, userId } = payload;
      const songIndex = state.findIndex((liked) => liked.id === songId);

      if (songIndex === -1) {
        state.push({ id: songId, usersId: [userId] }); // first user like
      } else {
        const userIndex = state[songIndex].usersId.findIndex(
          (id) => id === userId
        );

        userIndex === -1
          ? state[songIndex].usersId.push(userId) // add user
          : state[songIndex].usersId.length > 1
          ? state[songIndex].usersId.splice(userIndex, 1) // remove user
          : state.splice(songIndex, 1); // remove object
      }
    },
  },
});

const { toggleLike } = likedSongsSlice.actions;

export const likedSongDisptach = {
  toggleLike: (payload: LikeSong) => {
    store.dispatch({ type: toggleLike.type, payload });
  },
};

export const likedSongSelect = {
  allLikedSongs: (state: RootState) => state.likedSongs,

  likedSongById: (songId: string) => (state: RootState) => {
    return state.likedSongs.find((song) => song.id === songId);
  },

  selectCount:
    ({ songId, userId }: LikeSong) =>
    (state: RootState) => {
      const likedSong = state.likedSongs.find((e) => e.id === songId);
      const count =
        likedSong && likedSong.usersId ? likedSong.usersId.length : 0;
      const liked = likedSong && likedSong.usersId.some((id) => id === userId);

      return { count, liked };
    },
};

export default likedSongsSlice.reducer;
