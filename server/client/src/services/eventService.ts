import Centrifuge from "centrifuge";
import SockJS from "sockjs-client";

const connect = () => {
  const centrifuge = new Centrifuge(
    "https://centrifuge.example.com/connection/sockjs",
    {
      sockjs: SockJS,
    }
  );

  centrifuge.subscribe("zuri-plugin-music", (message) => {
    publish: (message) => {};
  });

  centrifuge.on("connect", (context) => {
    console.log(context);
  });

  centrifuge.connect();
};

export default { connect };
