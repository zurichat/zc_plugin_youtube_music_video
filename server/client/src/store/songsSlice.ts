import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from ".";
import LikeSong from "../types/likeSong";

import Song from "../types/song";
import { sanitize } from "../utils/sanitizer";

const songsSlice = createSlice({
  name: "songs",

  initialState: [] as Song[],

  reducers: {
    initialize: (state, { payload }: PayloadAction<Song[]>) => {
      return payload.reverse().map(sanitize);
    },

    addSong: (state, { payload }: PayloadAction<Song>) => {
      state.unshift(sanitize(payload));
    },

    removeSong: (state, { payload }) => {
      state.filter((song) => song.id !== payload.id);
    },

    likeSong: (state, { payload }: PayloadAction<LikeSong>) => {
      const { like, songId, userId } = payload;

      const index = state.findIndex((song) => song.id === songId);

      if (index === -1) return state;

      const song = state[index];

      if (like) song.likedBy.push(userId);
      else song.likedBy = song.likedBy.filter((id) => id !== userId);

      state[index] = song;
    },
  },
});

export const { addSong, removeSong, likeSong, initialize } = songsSlice.actions;

export const songDispatch = {
  addSong: (payload: Song) => {
    store.dispatch({ type: addSong.type, payload });
  },

  initialize: (payload: Song[]) => {
    store.dispatch({ type: initialize.type, payload });
  },

  removeSong: (payload: Song) => {
    store.dispatch({ type: removeSong.type, payload: { id: payload.id } });
  },

  likeSong: (payload: LikeSong) => {
    store.dispatch({ type: likeSong.type, payload });
  },
};

export const songSelect = {
  allSongs: (state: RootState) => state.songs,

  songById: (songId: string) => (state: RootState) => {
    return state.songs.find((song) => song.id === songId);
  },

  songByUrl: (url: string) => (state: RootState) => {
    return state.songs.find((song) => song.url === url);
  },

  firstSong: (state: RootState) => state.songs[0],

  like_count:
    ({ songId, userId }: { songId: string; userId: string }) =>
    (state: RootState) => {
      const song = state.songs.find((song) => song.id === songId);

      if (!song) return { count: 0, liked: false };

      return {
        count: song.likedBy.length,
        liked: song.likedBy.some((id) => id === userId),
      };
    },
};

export default songsSlice.reducer;
