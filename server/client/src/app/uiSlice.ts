import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const slice = createSlice({
	name: "ui",

	initialState: {
		isLoading: false,
		showChat: false,
		showPasteUrl: false,
		showModal: false,
		exitModal: false,
		showMemberList: false,
		showDeleteModal: false,
		enterModal: true
	},

	reducers: {
		setLoadeding: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},

		showedChat: (state, action: PayloadAction<boolean>) => {
			state.showChat = action.payload;
		},

		showedPasteUrl: (state, action: PayloadAction<boolean>) => {
			state.showPasteUrl = action.payload;
		},
		showedModal: (state, action: PayloadAction<boolean>) => {
			// state.showModal = action.payload;
			return state;
		},

		exitedModal: (state, action: PayloadAction<boolean>) => {
			state.exitModal = action.payload;
		},

		showedMemberList: (state, action: PayloadAction<boolean>) => {
			state.showMemberList = action.payload;
		},

		showedDeleteModal: (state, action: PayloadAction<boolean>) => {
			state.showDeleteModal = action.payload;
		},

		setEnterModal: (state, { payload }: PayloadAction<boolean>) => {
			state.enterModal = payload;
		}
	}
});

export const {
	setLoadeding,
	showedChat,
	showedPasteUrl,
	showedModal,
	exitedModal,
	showedMemberList,
	showedDeleteModal,
	setEnterModal
} = slice.actions;

export const selectShowChat = (state: RootState) => state.ui.showChat;

export const selectShowPasteUrl = (state: RootState) => state.ui.showPasteUrl;

export const selectLoading = (state: RootState) => state.ui.isLoading;

export const selectShowModal = (state: RootState) => state.ui.showModal;

export const selectShowExitModal = (state: RootState) => state.ui.exitModal;

export const selectShowMemberList = (state: RootState) =>
	state.ui.showMemberList;

export const selectShowDeleteModal = (state: RootState) =>
	state.ui.showDeleteModal;

export const selectEnterModal = (state: RootState) => state.ui.enterModal;

export default slice.reducer;
