import Centrifuge from "centrifuge";
// import SockJS from "sockjs-client";

import songService from "./songService";

const connect = () => {
  // initialize store
  songService.getSongs();

  const centrifuge = new Centrifuge(
    "https://realtime.zuri.chat/connection/sockjs"
  );

  centrifuge.subscribe("zuri-plugin-music", (message) => console.log(message));

  centrifuge.on("connect", (context) => {
    // console.log(context);
  });

  centrifuge.connect();
};

export default { connect };
