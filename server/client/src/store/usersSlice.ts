import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from ".";

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

		addUser: (state, { payload }: PayloadAction<User>) => {
			const index = state.users.find(user => user.id === payload.id);
			if (!index) state.users.push(payload);
		},

		removeUser: (state, { payload }: PayloadAction<{ id: string }>) => {
			const index = state.users.findIndex(user => user.id === payload.id);
			state.users.splice(index, 1);
		},

		setMembership: (state, { payload }: PayloadAction<boolean>) => {
			state.isMember = payload;
		}
	}
});

const { setCurrentUser, addUser, setUsers, removeUser, setMembership } =
	usersSlice.actions;

export const userDispatch = {
	setCurrentUser: (payload: User) => {
		store.dispatch({
			type: setCurrentUser.type,
			payload
		});
	},

	addUser: (payload: User) => {
		store.dispatch({ type: addUser.type, payload });
	},

	setUsers: (users: User[]) => {
		store.dispatch({ type: setUsers.type, payload: users });
	},

	removeUser: (payload: { id: string }) => {
		store.dispatch({ type: removeUser.type, payload });
	},

	setMembership: (payload: boolean) =>
		store.dispatch({ type: setMembership.type, payload })
};

export const userSelect = {
	currentUser: (state: RootState): User => state.users.currentUser,

	userList: (state: RootState) => state.users.users,

	userById: (id: string) => (state: RootState) =>
		state.users.users.find(user => user.id === id),

	userCount: (state: RootState) => state.users.users.length,

	isMember: (state: RootState) => state.users.isMember
};

export const selectAllUsers = (state: RootState) => state.users;

export const selectUserById = (state: RootState, userId: string) => {
	return state.users.users.find(user => user.id === userId);
};

export default usersSlice.reducer;
