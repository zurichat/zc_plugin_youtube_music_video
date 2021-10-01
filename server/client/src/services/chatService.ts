import httpService from "./httpService";
import { chatDispatch } from "../store/chatsSlice";
import Chat from "../types/chat";

const { commentEndpoint } = httpService.endpoints;

const getChats = async () => {
  try {
    const result = await httpService.get(commentEndpoint);
    const data = result.data.data ?? [];
    chatDispatch.set(data);
  } catch (e) {
    console.log(e.message);
  }
};

const addChat = async (chat: Chat) => {
  const newChat: any = { ...chat };
  delete newChat._id;

  chatDispatch.addChat({ ...newChat, notSent: true});

  try {
    await httpService.post(commentEndpoint, newChat);
  } catch (error) {
    console.log(error);
    chatDispatch.updateChat(newChat);
  }

  return;
};

const chatService = { addChat, getChats };

export default chatService;
