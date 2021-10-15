// @ts-ignore
import { pluginHeader } from "@zuri/plugin-header";
import { uiDispatch } from "../store/uiSlice";
import User from "../types/user";
import icon from "../media/musicRoomIcon.svg";
import store from "../store";

export { pluginHeader };

export const headerConfig = (users: User[]) => {
	const userList = users.map(user => ({ _id: user.id, email: user.email }));

	console.log(users);

	return {
		name: "Music Plugin", //Name on header

		icon, //Image on header

		thumbnailUrl: users.filter(user => user.avatar).map(user => user.avatar), //Replace with images of users
		hasThumbnail: true, //set false if you don't want thumbnail on the header

		userCount: users.length, //User count on header

		roomInfo: {
			membersList: [],

			addmembersevent: values => {
				console.log(values, "adding");
			},

			removememberevent: id => {
				console.log(id, "removing");
			}
		}
	};
};
