import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from "./store";
import { sanitize } from "../utils/sanitizer";
import { sortByTime, sortByTitle } from "../utils/song";
import { changedCurrentSong } from "./playerSlice";

const songsSlice = createSlice({
	name: "songs",

	initialState: {
		sortParam: { property: "" } as SortParam,
		list: [] as Song[]
	},

	reducers: {
		initializedSongs: (state, { payload }: PayloadAction<Song[]>) => {
			state.list = payload.map(sanitize);
		},

		addedSong: (state, { payload }: PayloadAction<Song>) => {
			state.list.unshift(sanitize(payload));
		},

		removedSong: (
			state,
			{ payload }: PayloadAction<{ id: string; nextId: string }>
		) => {
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

		sortParamChanged: (state, { payload }: PayloadAction<SortParam>) => {
			state.sortParam = payload;
		}
	}
});

export const {
	addedSong,
	removedSong,
	likedSong,
	initializedSongs,
	sortParamChanged
} = songsSlice.actions;

export const selectSongs = (state: RootState) => {
	const { list, sortParam } = state.songs;

	const { property, order } = sortParam;
	const clonedList: Song[] = JSON.parse(JSON.stringify(list));

	const sorted =
		property === "title"
			? sortByTitle(clonedList, order)
			: property === "time"
			? sortByTime(clonedList, order)
			: clonedList;

	return sorted;
};

export const selectSongById = (songId: string) => (state: RootState) => {
	return state.songs.list.find(song => song.id === songId);
};

export const selectSongByUrl = (url: string) => (state: RootState) => {
	return state.songs.list.find(song => song.url === url);
};

export const selectFirstSong = (state: RootState) => state.songs.list[0];

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

export default songsSlice.reducer;
