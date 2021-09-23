import httpService from "./httpService";
import { chatDispatch } from "../store/chatsSlice";
import Chat from "../types/chat";

const endpoint = "/comments";

const getChats = async () => {
  try {
    let result = await (await httpService.get(endpoint)).data.data;
    result.splice(0,7);
    for(let i = 0; i < result.length; i++) {
      chatDispatch.addChat(result[i]);
    } 
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
