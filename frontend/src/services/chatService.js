import { addChat, removeChat, updateChat, } from '../store/chatsSlice';
import chatItem from "../media/chatItem.svg";


export const getChat = () => {

};

export const createChat = (dispatch, message) => {
    const newitem = {
        id: Date.now() + "",
        userId: Date.now() + "",
        name: "Mr._Primal",
        time: 23,
        message: message,
        avatar: chatItem,
    };
    dispatch(addChat(newitem));
};