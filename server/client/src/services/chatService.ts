import httpService from "./httpService";
import { chatDispatch } from "../store/chatsSlice";
import Chat from "../types/chat";

const { commentEndpoint } = httpService.endpoints;

//A function for interchanging between id and _id as object key name
const sanitizer = (chat) => {
  let newChat = chat;
  
  //condition for checking which key is used in object argument(id/_id)
  if(chat.id){
    newChat._id = chat.id;
    delete newChat.id;
  } 
  else {
    newChat.id = chat._id;
    delete newChat._id;
  }

  //Function returns sanitized object
  return newChat;
};

const getChats = async () => {
  try {
    let result = await (await httpService.get(commentEndpoint)).data.data;
    result.splice(0,14);
    for(let i = 0; i < result.length; i++) {
      result[i] = sanitizer(result[i]);
      chatDispatch.addChat(result[i]);
    } 
  } catch (e) {
    console.log(e.message);
  }
};

const addChat = async (chat: Chat) => {
  const newChat = sanitizer(chat);
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
