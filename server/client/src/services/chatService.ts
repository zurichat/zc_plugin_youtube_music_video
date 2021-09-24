import httpService from "./httpService";
import { chatDispatch } from "../store/chatsSlice";
import Chat from "../types/chat";
import { sanitize } from "../utils/sanitizer";

const { commentEndpoint } = httpService.endpoints;

const getChats = async () => {
  try {
    const { data } = await httpService.get(commentEndpoint);
    chatDispatch.set(data.data.map(sanitize));
  } catch (e) {
    console.log(e.message);
  }
};

const addChat = async (chat: Chat) => {
  const newChat = sanitize(chat);
  try {
    await httpService.post(commentEndpoint, newChat);
  } catch (error) {
    console.log(error.message);
  }

  // chatDispatch.addChat(chat);
  return;
};

const chatService = { addChat, getChats };

export default chatService;
