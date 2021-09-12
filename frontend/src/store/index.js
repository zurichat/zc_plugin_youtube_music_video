import { configureStore } from "@reduxjs/toolkit";
import chatsReducer from './chatsSlice';
import reducer from "./reducer";

export default configureStore({
  reducer: {
    chats: chatsReducer
  }
})
