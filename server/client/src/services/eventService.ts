// @ts-ignore;
import { SubscribeToChannel } from "@zuri/control";

import songService from "./songService";
import chatService from "./chatService";

import { songDispatch } from "../store/songsSlice";
import { chatDispatch } from "../store/chatsSlice";

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

  SubscribeToChannel(
    "613ceb50ceee2ab59d44df2f",
    (message: PublishedMessage) => {
      const {
        event,
        data: { data },
      } = message.data;

      console.log({ event, data });

      switch (event) {
        case "added_song": {
          if (data.length >= 0) songDispatch.initialize(data);
          else songDispatch.addSong(data);
        }

        case "added_chat": {
          if (data.length >= 0) chatDispatch.set(data);
          else chatDispatch.addChat(data);
        }

        case "join_room": {
          console.log({ event, data });
        }

        case "entered_room": {
          console.log({ event, data });
        }

        case "sidebar_update": {
          console.log({ event, data });
        }

        default: {
          console.log({ event, data });
        }
      }
    }
  );
};

export default { connect };
