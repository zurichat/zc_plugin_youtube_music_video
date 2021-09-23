import Centrifuge from "centrifuge";
import SockJS from "sockjs-client";

import songService from "./songService";

const connect = () => {
  // initialize store
  songService.getSongs();

  const centrifuge = new Centrifuge(
    "https://centrifuge.example.com/connection/sockjs",
    {
      sockjs: SockJS,
    }
  );

  centrifuge.subscribe("zuri-plugin-music", {
    publish: function (message) {
      // {type: "add_song", id...}
      console.log(message);
    },
  });

  centrifuge.on("connect", (context) => {
    console.log(context);
  });

  // centrifuge.connect();
};

export default { connect };
