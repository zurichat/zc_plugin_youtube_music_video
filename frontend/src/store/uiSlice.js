import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "UI",
  initialState: {
    isLoading: false,
    congrats: false,
  },
  reducers: {
    loaded: (state, action) => {
      state.isLoading = false;
    },
    congratsToggled: (state, action) => {
      state.congrats = action.payload.congrats;
    },
  },
});

export const { loaded, congratsToggled } = slice.actions;
export default slice.reducer;

