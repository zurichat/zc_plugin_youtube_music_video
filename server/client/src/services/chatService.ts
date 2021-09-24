import httpService from "./httpService";
import { chatDispatch } from "../store/chatsSlice";
import Chat from "../types/chat";

const { commentEndpoint } = httpService.endpoints;

const getChats = async () => {
  try {
    const result = await httpService.get(commentEndpoint);
    console.log(result);
  } catch (e) {
    console.log(e.message);
  }
};

const addChat = async (chat: Chat) => {
  const newChat = { ...chat };
  delete newChat.id;

  try {
    await httpService.post(commentEndpoint, newChat);
  } catch (error) {
    console.log(error.message);
  }

  chatDispatch.addChat(chat);
  return;
};

const chatService = { addChat, getChats };

export default chatService;
