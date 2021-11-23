import httpService, { endpoints } from "./httpService";
import { addedChat, failChat, removeChat, sentChat } from "../app/chatsSlice";
import store from "../app/store";
import userService from "./userService";

const { comments: commentEndpoint } = endpoints;

const dispatch = store.dispatch;

const getChats = async () => {
	try {
		const result = await httpService.get(commentEndpoint);
		const data = result.data.data ?? [];
		return data;
	} catch (e) {
		console.log("error", e.message);
		console.log(e.message);
	}
};

const addChat = async (chat: Chat) => {
	const newChat: any = { ...chat };
	delete newChat.id;

	dispatch(addedChat({ ...chat, notSent: true }));

	try {
		const { name, id: userId, avatar } = await userService.getCurrentUser();

		await httpService.post(
			commentEndpoint,
			{ ...newChat, name, userId, avatar },
			{ timeout: 15000 }
		);

		sentChat({ ...chat });

		const { chats } = store.getState();

		chats.slice(0, chats.length - 8).forEach(({ id }) => deleteChat(id));
	} catch (error) {
		console.log("Chat error:", error.message);
		failChat({ ...chat });
	}

	return;
};

const deleteChat = (id: string) => {
	return httpService
		.post(endpoints.deletecomment, { id })
		.then(() => removeChat({ id }))
		.catch(e => console.log(e.message));
};

const chatService = { addChat, getChats, deleteChat };

export default chatService;
