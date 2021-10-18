// @ts-ignore;
import { SubscribeToChannel } from "@zuri/control";

import songService from "./songService";
import chatService from "./chatService";

import { songDispatch } from "../store/songsSlice";
import { chatDispatch } from "../store/chatsSlice";
import httpService from "./httpService";

type PublishedMessage = {
	data: {
		event:
			| "added_song"
			| "added_chat"
			| "join_room"
			| "entered_room"
			| "sidebar_update";

		data: {
			data: any;
		};
	};
};

const connect = () => {
	// initialize store
	songService.getSongs();
	chatService.getChats();

	SubscribeToChannel(httpService.room_id, (message: PublishedMessage) => {
		const {
			event,
			data: { data }
		} = message.data;

		console.log({ event, data });

		if (!data) return null;

		switch (event) {
			case "added_song": {
				if (data.length >= 0) songDispatch.initialize(data);
				else songDispatch.addSong(data);
				break;
			}

			case "added_chat": {
				if (data.length >= 0) chatDispatch.set(data);
				else chatDispatch.addChat(data);
				break;
			}

			case "join_room": {
				break;
			}

			case "entered_room": {
				break;
			}

			case "sidebar_update": {
				break;
			}

			default: {
			}
		}
	});
};

export default { connect };
