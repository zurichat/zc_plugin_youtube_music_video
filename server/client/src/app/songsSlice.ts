import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

import { sanitize } from '../utils/sanitizer';

const songsSlice = createSlice({
  name: 'songs',

  initialState: [] as Song[],

  reducers: {
    initializedSongs: (state, { payload }: PayloadAction<Song[]>) => payload.map(sanitize),

    addedSong: (state, { payload }: PayloadAction<Song>) => {
      state.unshift(sanitize(payload));
    },

    removedSong: (state, { payload }: PayloadAction<{ id: string }>) => {
      state = state.filter((song) => song.id !== payload.id);
    },

    likedSong: (state, { payload }: PayloadAction<LikeSong>) => {
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

export const {
  addedSong, removedSong, likedSong, initializedSongs,
} =	songsSlice.actions;

// export const songDispatch = {
// 	addedSong: (payload: Song) => {
// 		store.dispatch({ type: addSong.type, payload });
// 	},

// 	initializedSongs: (payload: Song[]) => {
// 		store.dispatch({ type: initialize.type, payload });
// 	},

// 	removedSong: (id: string) => {
// 		store.dispatch({ type: removeSong.type, payload: { id } });
// 	},

// 	likedSong: (payload: LikeSong) => {
// 		store.dispatch({ type: likeSong.type, payload });
// 	}
// };

export const selectSongs = (state: RootState) => state.songs;

export const selectSongById = (songId: string) => (state: RootState) => state.songs.find((song) => song.id === songId);

export const selectSongByUrl = (url: string) => (state: RootState) => state.songs.find((song) => song.url === url);

export const selectFirstSong = (state: RootState) => state.songs[0];

export const selectLikeCount =	({ songId, userId }: { songId: string; userId: string }) => (state: RootState) => {
	    const song = state.songs.find((song) => song.id === songId);

	    if (!song) return { count: 0, liked: false };

	    return {
	      count: song.likedBy.length,
	      liked: song.likedBy.some((id) => id === userId),
	    };
	  };

export default songsSlice.reducer;
