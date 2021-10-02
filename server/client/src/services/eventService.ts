// @ts-ignore;
import { SubscribeToChannel } from "@zuri/control";

import songService from "./songService";
import chatService from "./chatService";
import userService from "./userService";

import { songDispatch } from "../store/songsSlice";
import { chatDispatch } from "../store/chatsSlice";
import { userDispatch } from "../store/usersSlice";

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
  userService.addUserToRoom();
  userService.removeUserFromRoom();

  SubscribeToChannel(
    "613ceb50ceee2ab59d44df2f",
    (message: PublishedMessage) => {
      const {
        event,
        data: { data },
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
          console.log({ event, data });
          break;
        }

        case "entered_room": {
          if (data.length >= 0) userDispatch.setCurrentUser(data);
          else userDispatch.addUser(data);
          break;
        }

        case "sidebar_update": {
          console.log({ event, data });
          break;
        }

        default: {
          console.log({ event, data });
        }
      }
    }
  );
};

export default { connect };
