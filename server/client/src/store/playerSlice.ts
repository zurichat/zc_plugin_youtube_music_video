import { createSlice } from "@reduxjs/toolkit";
import store, { RootState } from ".";

const slice = createSlice({
	name: "player",

	initialState: {
		playing: false,
		show: false,
		currentSongId: ""
	},

	reducers: {
		playing: (state, action) => {
			state.playing = action.payload.playing;
		},

		showPlayer: (state, action) => {
			state.show = action.payload.show;
		},

		changeCurrentSong: (state, action) => {
			state.currentSongId = action.payload;
		}
	}
});

export const { playing, showPlayer, changeCurrentSong } = slice.actions;

export const playerAction = {
	dispatchShowPlayer: (payload: boolean) => {
		store.dispatch({ type: showPlayer.type, payload: { show: payload } });
	},

	dispatchPlaying: (payload: boolean) => {
		store.dispatch({ type: playing.type, payload: { playing: payload } });
	},

	changeSong: (payload: Song) => {
		store.dispatch({ type: changeCurrentSong.type, payload: payload.id });
	}
};

export const getPlayerState = (state: RootState) => state.player;

export const playerSelector = {
	selectCurrentSong: (state: RootState) =>
		state.songs.find(s => s.id === state.player.currentSongId)
};

export default slice.reducer;
