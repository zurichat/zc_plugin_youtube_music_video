import { addChat, removeChat, updateChat, } from '../store/chatsSlice';

let lastID = 0;

export const getChat = () => {

};

export const createChat = async (dispatch, payload) => {
    const chatItem = {
        id: ++lastID,
        userID: ++lastID * 10,
        time: null,
        message: payload.message
    };

    dispatch(addChat(chatItem));
}