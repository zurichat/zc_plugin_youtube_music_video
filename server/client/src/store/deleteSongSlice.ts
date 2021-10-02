import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from ".";

const slice = createSlice({
  name: "delete",

  initialState: {
    updateId: "", // id of the song
  },

  reducers: {
    updateId(state, action: PayloadAction<string>) {
      state.updateId = action.payload;
    },

  },
});

export const { updateId } = slice.actions;

export const deleteDispatch = {
  updateId: (payload: number) => {
    store.dispatch({ type: updateId.type, payload });
  },

};

export const deleteSlice = {
  updateId: (state: RootState) => state.delete.updateId,
};

export default slice.reducer;
