import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from "./store";

const slice = createSlice({
	name: "player",

	initialState: {
		playing: false,
		show: false,
		currentSongId: ""
	},

	reducers: {
		changedPlaying: (state, action: PayloadAction<boolean>) => {
			state.playing = action.payload;
		},

		showedPlayer: (state, action: PayloadAction<boolean>) => {
			state.show = action.payload;
		},

		changedCurrentSong: (state, action: PayloadAction<{ id: string }>) => {
			state.currentSongId = action.payload.id;
		}
	}
});

export const { changedPlaying, showedPlayer, changedCurrentSong } =
	slice.actions;

export const getPlayerState = (state: RootState) => state.player;

export const selectCurrentSong = (state: RootState) =>
	state.songs.list.find(s => s.id === state.player.currentSongId);

export default slice.reducer;
