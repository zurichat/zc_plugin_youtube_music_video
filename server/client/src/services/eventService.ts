import Centrifuge from "centrifuge";

import songService from "./songService";
import chatService from "./chatService";

import { songDispatch } from "../store/songsSlice";
import { chatDispatch } from "../store/chatsSlice";

type PublishedMessage = {
  data: {
    event: "added_song" | "added_chat" | "join_room" | "entered_room";
    data: {
      data: any;
    };
  };
};

const connect = () => {
  // initialize store
  songService.getSongs();
  chatService.getChats();

  const centrifuge = new Centrifuge(
    "wss://realtime.zuri.chat/connection/websocket"
  );

  centrifuge.subscribe("zuri-plugin-music", (message: PublishedMessage) => {
    const {
      event,
      data: { data },
    } = message.data;

    console.log({ event, data });

    switch (event) {
      case "added_song":
        return data.length >= 0
          ? songDispatch.initialize(data)
          : songDispatch.addSong(data);

      case "added_chat":
        return data.length >= 0
          ? chatDispatch.set(data)
          : chatDispatch.addChat(data);

      default: {
        console.log({ event, data });
      }
    }
  });

  centrifuge.connect();
};

export default { connect };
