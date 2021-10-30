import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from "./store";

const slice = createSlice({
	name: "delete",

	initialState: {
		updateId: "" // id of the song
	},

	reducers: {
		updatedSongId(state, action: PayloadAction<string>) {
			state.updateId = action.payload;
		}
	}
});

export const { updatedSongId } = slice.actions;

export const selectUpdateId = (state: RootState) => state.delete.updateId;

export default slice.reducer;
