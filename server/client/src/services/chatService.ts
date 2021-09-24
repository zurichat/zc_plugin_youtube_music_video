import httpService from "./httpService";
import { chatDispatch } from "../store/chatsSlice";
import Chat from "../types/chat";
import { sanitize } from "../utils/sanitizer";

const { commentEndpoint } = httpService.endpoints;

const getChats = async () => {
  try {
    const result = await httpService.get(commentEndpoint);
    const data = result.data.data ?? [];
    chatDispatch.set(data.map(sanitize));
  } catch (e) {
    console.log(e.message);
  }
};

const addChat = async (chat: Chat) => {
  const newChat = sanitize(chat);
  try {
    await httpService.post(commentEndpoint, newChat);
  } catch (error) {
    console.log(error);
  }

  return;
};

const chatService = { addChat, getChats };

export default chatService;
