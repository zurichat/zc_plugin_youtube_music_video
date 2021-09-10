import { createSlice } from '@reduxjs/toolkit';

const initialState = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userLogin: (state, { payload }) => {
      const { id, userName, photo } = payload;
      state.push({ id, userName, photo });
    },
    userLogout: (state, { payload }) => {
      const { id } = payload;
      const existingUser = state.find((user) => user.id === id);
      if (existingUser) state.filter((user) => user.id !== id);
    },
    updateUser: (state, { payload }) => {
      const { id, userName, photo } = payload;
      const existingUser = state.find((user) => user.id === id);
      if (existingUser) {
        existingUser.userName = userName;
        existingUser.photo = photo;
      }
    }
  },
});

export const { userLogin, userLogout, updateUser } = usersSlice.actions;

export const selectAllUsers = (state) => state.users;
export const selectUserById = (state, userId) => {
  return state.users.find((user) => user.id === userId)
};

export default usersSlice.reducer;
