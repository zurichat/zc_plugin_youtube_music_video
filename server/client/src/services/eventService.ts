import Centrifuge from "centrifuge";
// import SockJS from "sockjs-client";

import songService from "./songService";
import chatService from "./chatService";

const connect = () => {
  // initialize store
  songService.getSongs();
  chatService.getChats();

  const centrifuge = new Centrifuge(
    "wss://realtime.zuri.chat/connection/websocket"
  );

  centrifuge.subscribe("zuri-plugin-music", (message) => console.log(message));

  centrifuge.on("connect", (context) => {
    // console.log(context);
  });

  centrifuge.connect();
};

export default { connect };
