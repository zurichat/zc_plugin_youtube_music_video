// @ts-ignore
import { pluginHeader } from "@zuri/plugin-header";
import { uiDispatch } from "../store/uiSlice";
import User from "../types/user";
import icon from "../media/musicRoomIcon.svg";

export { pluginHeader };

export const headerConfig = (users: User[]) => {
  return {
    name: "Music Plugin", //Name on header

    icon, //Image on header

    thumbnailUrl: users
      .filter((user) => user.avatar)
      .map((user) => user.avatar), //Replace with images of users

    userCount: users.length, //User count on header

    eventTitle: () => {
      uiDispatch.showMemberList(true);
    },

    eventThumbnail: () => {
      console.log("thumbnail clicked");
    },

    hasThumbnail: true, //set false if you don't want thumbnail on the header
  };
};
