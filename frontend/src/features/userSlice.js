import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  photo: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoginDetails: (state, action) => {
      state.name = action.payload.name;
      state.photo = action.payload.photo;
    },
  },
});

export const { setUserLoginDetails } = userSlice.actions;

export const selectUserName = (state) => state.user.name;
export const selectUserPhoto = (state) => state.user.photo;

export default userSlice.reducer;
