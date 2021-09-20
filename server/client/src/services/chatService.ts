import { chatDispatch } from "../store/chatsSlice";
import Chat from "../types/chat";

export const getChat = () => {};

export const createChat = (chat: Chat) => {
  chatDispatch.addChat(chat);
};

const chatObject = { createChat, getChat };

export default chatObject;
