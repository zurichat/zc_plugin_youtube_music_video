import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

import User from "../types/user";

const usersSlice = createSlice({
  name: "users",
  initialState: [] as User[],
  reducers: {
    userLogin: (state, { payload }) => {
      state.push(payload.user);
    },
    userLogout: (state, { payload }) => {
      const { id } = payload;
      const existingUser = state.find((user) => user.id === id);
      if (existingUser) state.filter((user) => user.id !== id);
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

export const { userLogin, userLogout, updateUser } = usersSlice.actions;

export const selectAllUsers = (state: RootState) => state.users;
export const selectUserById = (state: RootState, userId: string) => {
  return state.users.find((user) => user.id === userId);
};

export default usersSlice.reducer;
