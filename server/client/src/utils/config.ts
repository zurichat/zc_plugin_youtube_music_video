// @ts-ignore
import { pluginHeader } from "@zuri/plugin-header";
import { uiDispatch } from "../store/uiSlice";
import User from "../types/user";
import icon from "../media/musicRoomIcon.svg";

export { pluginHeader };

export const headerConfig = (users: User[]) => {
  const thumbnailUrls = users.filter((user) => user.avatar);

  return {
    name: "Music Plugin", //Name on header

    icon, //Image on header

    thumbnailUrl: thumbnailUrls, //Replace with images of users

    userCount: users.length, //User count on header

    eventTitle: () => {
      uiDispatch.showMemberList(true);
    },

    eventThumbnail: () => {
      console.log("thumbnail clicked");
    },

    hasThumbnail: thumbnailUrls.length > 0, //set false if you don't want thumbnail on the header
  };
};
