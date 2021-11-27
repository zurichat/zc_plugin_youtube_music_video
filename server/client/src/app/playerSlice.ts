import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { removedSong } from "./songsSlice";
import { RootState } from "./store";

const slice = createSlice({
	name: "player",

	initialState: {
		playing: false,
		show: false,
		currentSongId: ""
	},

	reducers: {
		changedPlaying: (state, { payload }: PayloadAction<boolean>) => {
			if (typeof payload === "boolean") state.playing = payload;
		},

		showedPlayer: (state, action: PayloadAction<boolean>) => {
			state.show = action.payload;
		},

		changedCurrentSong: (state, action: PayloadAction<{ id: string }>) => {
			state.currentSongId = action.payload.id;
		}
	},

	extraReducers: builder => {
		builder
			.addCase(removedSong, (state, action) => {
				if (state.currentSongId === action.payload.id)
					state.currentSongId = action.payload.nextId;
			})
			.addDefaultCase((state, ation) => {});
	}
});

export const { changedPlaying, showedPlayer, changedCurrentSong } =
	slice.actions;

export const getPlayerState = (state: RootState) => state.player;

export const selectCurrentSong = (state: RootState) =>
	state.songs.list.find(s => s.id === state.player.currentSongId);

export default slice.reducer;
