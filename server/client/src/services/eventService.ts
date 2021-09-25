import Centrifuge from "centrifuge";

import songService from "./songService";
import chatService from "./chatService";

import { songDispatch } from "../store/songsSlice";
import { chatDispatch } from "../store/chatsSlice";

const connect = () => {
  // initialize store
  songService.getSongs();
  chatService.getChats();

  const centrifuge = new Centrifuge(
    "wss://realtime.zuri.chat/connection/websocket"
  );

  centrifuge.subscribe("zuri-plugin-music", (message) => {
    const {
      event,
      data: { data },
    } = message.data;

    console.log({ event, data });

    if (event === "added_song" && data.length >= 0) {
      songDispatch.initialize(data);
    } else if (event === "added_chat" && data.length >= 0) {
      chatDispatch.set(data);
    }
  });

  centrifuge.on("connect", (context) => {
    // console.log({ context });
  });

  centrifuge.connect();
};

export default { connect };
