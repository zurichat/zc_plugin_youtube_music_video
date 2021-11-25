import { SubscribeToChannel } from "@zuri/utilities";

import songService from "./songService";
import chatService from "./chatService";

import { addedSong, initializedSongs } from "../app/songsSlice";
import { setChats, addedChat } from "../app/chatsSlice";
import store from "../app/store";
import httpService from "./httpService";
import { sanitize } from "../utils/sanitizer";

const dispatch = store.dispatch;

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

	songService.getSongs().then(songs => {
		store.dispatch(initializedSongs(songs.map(sanitize)));
	});
	// chatService.getChats().then(v => console.log({ v }));

	SubscribeToChannel(httpService.room_id, (message: PublishedMessage) => {
		const {
			event,
			data: { data }
		} = message.data;

		console.log({ event, data }, "event");

		if (!data) return null;

		switch (event) {
			case "added_song": {
				if (data.length >= 0) dispatch(initializedSongs(data));
				else dispatch(addedSong(data));
				break;
			}

			case "added_chat": {
				if (data.length >= 0) store.dispatch(setChats(data));
				else store.dispatch(addedChat(data));
				break;
			}

			// case "join_room": {
			// 	break;
			// }

			// case "entered_room": {
			// 	break;
			// }

			// case "sidebar_update": {
			// 	break;
			// }

			default: {
				console.log("default");
			}
		}
	});
};

export default { connect };
