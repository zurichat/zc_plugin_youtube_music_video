import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

import { sanitize } from "../utils/sanitizer";

const songsSlice = createSlice({
	name: "songs",

	initialState: {
		searchQuery: "",
		list: [] as Song[]
	},

	reducers: {
		initializedSongs: (state, { payload }: PayloadAction<Song[]>) => {
			state.list = payload.map(sanitize);
		},

		addedSong: (state, { payload }: PayloadAction<Song>) => {
			state.list.unshift(sanitize(payload));
		},

		removedSong: (state, { payload }: PayloadAction<{ id: string }>) => {
			state.list = state.list.filter(song => song.id !== payload.id);
		},

		likedSong: (state, { payload }: PayloadAction<LikeSong>) => {
			const { like, songId, userId } = payload;

			const index = state.list.findIndex(song => song.id === songId);

			if (index === -1) return state;

			const song = state.list[index];

			if (like) song.likedBy.push(userId);
			else song.likedBy = song.likedBy.filter(id => id !== userId);

			state.list[index] = song;
		},

		queryChanged: (state, { payload }: PayloadAction<string>) => {
			state.searchQuery = payload;
		}
	}
});

export const { addedSong, removedSong, likedSong, initializedSongs } =
	songsSlice.actions;

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

export const selectSongs = (state: RootState) => state.songs.list;

export const selectSongById = (songId: string) => (state: RootState) => {
	return state.songs.list.find(song => song.id === songId);
};

export const selectSongByUrl = (url: string) => (state: RootState) => {
	return state.songs.list.find(song => song.url === url);
};

export const selectFirstSong = (state: RootState) => state.songs[0];

export const selectLikeCount =
	({ songId, userId }: { songId: string; userId: string }) =>
	(state: RootState) => {
		const song = state.songs.list.find(song => song.id === songId);

		if (!song) return { count: 0, liked: false };

		return {
			count: song.likedBy.length,
			liked: song.likedBy.some(id => id === userId)
		};
	};

export const selectSearchQuery = (state: RootState) => state.songs.searchQuery;

export default songsSlice.reducer;
