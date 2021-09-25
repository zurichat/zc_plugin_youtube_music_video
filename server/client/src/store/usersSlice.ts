import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from ".";

import User from "../types/user";

const user: User = { id: "", avatar: "", name: "", token: "" };

const usersSlice = createSlice({
  name: "users",
  initialState: { currentUser: JSON.stringify(user), users: [] as User[] },

  reducers: {
    setCurrentUser: (state, { payload }: PayloadAction<string>) => {
      if (typeof payload !== "string") return state;

      state.currentUser = payload;
    },

    userLogin: (state, { payload }) => {
      state.users.push(payload.user);
    },

    userLogout: (state, { payload }) => {
      const { id } = payload;
      const existingUser = state.users.find((user) => user.id === id);
      if (existingUser) state.users.filter((user) => user.id !== id);
    },

    updateUser: (state, { payload }) => {
      // const { id, userName, photo } = payload;
      // const existingUser = state.find((user) => user.id === id);
      // if (existingUser) {
      //   existingUser.userName = userName;
      //   existingUser.photo = photo;
      // }
    },
  },
});

export const { userLogin, userLogout, updateUser, setCurrentUser } =
  usersSlice.actions;

export const userDispatch = {
  setCurrentUser: (payload: User) => {
    store.dispatch({
      type: setCurrentUser.type,
      payload: JSON.stringify(payload),
    });
  },
};

export const userSelect = {
  currentUser: (state: RootState): User => JSON.parse(state.users.currentUser),
};

export const selectAllUsers = (state: RootState) => state.users;

export const selectUserById = (state: RootState, userId: string) => {
  return state.users.users.find((user) => user.id === userId);
};

export default usersSlice.reducer;
