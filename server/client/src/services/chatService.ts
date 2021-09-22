import axios from "axios";
import { chatDispatch } from "../store/chatsSlice";
import Chat from "../types/chat";

const endpoint = "http://localhost:8000/music/api/v1/comments";

const getChats = async () => {
  try {
    const result = await axios.get(endpoint);
    console.log(result);
  } catch (e) {
    console.log(e.message);
  }
};

const addChat = async (chat: Chat) => {
  try {
    await axios.post(endpoint, chat);
  } catch (error) {
    console.log(error.message);
  }

  chatDispatch.addChat(chat);
  return;
};

const chatService = { addChat, getChats };

export default chatService;
