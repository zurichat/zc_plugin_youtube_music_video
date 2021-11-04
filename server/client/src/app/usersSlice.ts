import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const user: User = {
	id: "juztiz5000kdkdkdkdkdkdkd",
	avatar: "https://music.zuri.chat/static/8088dff19013ace2e359.svg",
	name: "Justiz",
	email: ""
};

const usersSlice = createSlice({
	name: "users",

	initialState: {
		currentUser: user,
		isMember: true,
		users: [] as User[]
	},

	reducers: {
		setCurrentUser: (state, { payload }: PayloadAction<User>) => {
			// if (typeof payload !== "string") return state;

			state.currentUser = payload;
		},

		setUsers: (state, { payload }: PayloadAction<User[]>) => {
			state.users = payload;
		},

		addedUser: (state, { payload }: PayloadAction<User>) => {
			const index = state.users.find(user => user.id === payload.id);
			if (!index) state.users.push(payload);
		},

		removedUser: (state, { payload }: PayloadAction<{ id: string }>) => {
			const index = state.users.findIndex(user => user.id === payload.id);
			state.users.splice(index, 1);
		},

		setMembership: (state, { payload }: PayloadAction<boolean>) => {
			state.isMember = payload;
		}
	}
});

export const {
	setCurrentUser,
	addedUser,
	setUsers,
	removedUser,
	setMembership
} = usersSlice.actions;

export const selectCurrentUser = (state: RootState): User =>
	state.users.currentUser;

export const selectUserList = (state: RootState) => state.users.users;

export const selectUserById = (id: string) => (state: RootState) =>
	state.users.users.find(user => user.id === id);

export const selectUserCount = (state: RootState) => state.users.users.length;

export const selectIsMember = (state: RootState) => state.users.isMember;

export const selectAllUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
