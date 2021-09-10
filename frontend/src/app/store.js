import { configureStore } from "@reduxjs/toolkit";
import reducer from "../features/reducer";

export default configureStore({
  reducer,
})
