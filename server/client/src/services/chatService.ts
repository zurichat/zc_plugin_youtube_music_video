import httpService from "./httpService";
import { chatDispatch } from "../store/chatsSlice";
import Chat from "../types/chat";

const endpoint = "/comments";

const getChats = async () => {
  try {
    const result = await httpService.get(endpoint);
    console.log(result);
  } catch (e) {
    console.log(e.message);
  }
};

const addChat = async (chat: Chat) => {
  try {
    await httpService.post(endpoint, chat);
  } catch (error) {
    console.log(error.message);
  }

  chatDispatch.addChat(chat);
  return;
};

const chatService = { addChat, getChats };

export default chatService;
