import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
