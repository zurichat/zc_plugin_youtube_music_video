import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from ".";

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
		loaded: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},

		showChat: (state, action) => {
			state.showChat = action.payload;
		},

		showPasteUrl: (state, action) => {
			state.showPasteUrl = action.payload;
		},
		showModal: (state, action) => {
			// state.showModal = action.payload;
			return state;
		},

		exitedModal: (state, action) => {
			state.exitModal = action.payload;
		},

		showMemberList: (state, action) => {
			state.showMemberList = action.payload;
		},

		showDeleteModal: (state, action) => {
			state.showDeleteModal = action.payload;
		},

		setEnterModal: (state, { payload }: PayloadAction<boolean>) => {
			state.enterModal = payload;
		}
	}
});

const {
	loaded,
	showChat,
	showPasteUrl,
	showModal,
	exitedModal,
	showMemberList,
	showDeleteModal,
	setEnterModal
} = slice.actions;

export const uiDispatch = {
	showPasteUrl: (payload: boolean) => {
		store.dispatch({ type: showPasteUrl.type, payload });
	},

	showChat: (payload: boolean) =>
		store.dispatch({ type: showChat.type, payload }),

	loading: (payload: boolean) => store.dispatch({ type: loaded.type, payload }),

	showModal: (payload: boolean) =>
		store.dispatch({ type: showModal.type, payload }),

	showExitModal: (payload: boolean) =>
		store.dispatch({ type: exitedModal.type, payload }),

	showMemberList: (payload: boolean) =>
		store.dispatch({ type: showMemberList.type, payload }),

	showDeleteModal: (payload: boolean) =>
		store.dispatch({ type: showDeleteModal.type, payload }),

	setEnterModal: (payload: boolean) =>
		store.dispatch({ type: setEnterModal.type, payload })
};

export const uiSelect = {
	showChat: (state: RootState) => state.ui.showChat,

	showPasteUrl: (state: RootState) => state.ui.showPasteUrl,

	isLoading: (state: RootState) => state.ui.isLoading,

	showModal: (state: RootState) => state.ui.showModal,

	showExitModal: (state: RootState) => state.ui.exitModal,

	showMemberList: (state: RootState) => state.ui.showMemberList,

	showDeleteModal: (state: RootState) => state.ui.showDeleteModal,

	enterModal: (state: RootState) => state.ui.enterModal
};

export default slice.reducer;
