import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from ".";

const slice = createSlice({
  name: "delete",

  initialState: {
    name: "", // name of logged in user
    url: "", // url of the song
    songId: "", // id of the song
  },

  reducers: {
    updateId(state, action: PayloadAction<string>) {
      state.songId = action.payload;
    },
    updateName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    updateUrl(state, action: PayloadAction<string>) {
      state.url = action.payload;
    },
  },
});

export const { updateId, updateName, updateUrl } = slice.actions;

export const deleteDispatch = {
  updateId: (payload: number) => {
    store.dispatch({ type: updateId.type, payload });
  },
  updateName: (payload: string) => {
    store.dispatch({ type: updateName.type, payload });
  },
  updateUrl: (payload: string) => {
    store.dispatch({ type: updateUrl.type, payload });
  },
};

export const deleteSlice = {
  updateId: (state: RootState) => state.delete.songId,

  updateName: (state: RootState) => state.delete.name,

  updateUrl: (state: RootState) => state.delete.url,
};

export default slice.reducer;
