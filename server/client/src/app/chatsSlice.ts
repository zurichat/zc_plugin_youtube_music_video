import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { sanitize } from "../utils/sanitizer";

// import avatar from "../media/chatItem.svg";

const chatsSlice = createSlice({
	name: "chats",

	initialState: [] as Chat[],

	reducers: {
		setChats: (state, { payload }: PayloadAction<Chat[]>) =>
			payload.map(sanitize),

		addedChat: (state, { payload }: PayloadAction<Chat>) => {
			state.push(sanitize(payload));
		},

		removeChat: (state, { payload }: PayloadAction<{ id: string }>) => {
			state = state.filter(chat => chat.id !== payload.id);
		},

		failChat: (state, { payload }: PayloadAction<Chat>) => {
			const { id, message } = payload;
			state.map(chat => {
				if (chat.id === id && chat.message === message) {
					chat.notSent = false;
					chat.failed = true;
				}
			});
		},

		sentChat: (state, { payload }: PayloadAction<Chat>) => {
			const { id, message } = payload;
			state.map(chat => {
				if (chat.id === id && chat.message === message) {
					chat.notSent = false;
					chat.failed = false;
				}
			});
		}
	}
});

export const { addedChat, setChats, failChat, removeChat, sentChat } =
	chatsSlice.actions;

export const selectChats = (state: RootState) => state.chats;

export const selectChatById = (id: string) => (state: RootState) =>
	state.chats.find(chat => chat.id === id);

export const selectLastChat = (state: RootState) =>
	state.chats[state.chats.length - 1];

export default chatsSlice.reducer;
