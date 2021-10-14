// @ts-ignore
import { pluginHeader } from "@zuri/plugin-header";
import { uiDispatch } from "../store/uiSlice";
import User from "../types/user";
import icon from "../media/musicRoomIcon.svg";
import httpService from "../services/httpService";

export { pluginHeader };

export const headerConfig = (users: User[]) => {
	return {
		name: "Music Plugin", //Name on header

		icon, //Image on header

		thumbnailUrl: users.filter(user => user.avatar).map(user => user.avatar), //Replace with images of users

		userCount: users.length || 1, //User count on header

		eventTitle: () => {
			uiDispatch.showMemberList(true);
		},

		eventThumbnail: () => {
			console.log("thumbnail clicked");
		},

		hasThumbnail: true //set false if you don't want thumbnail on the header
	};
};

interface AddModalConfig {
	users: User[];
	togglePopup: () => void;
}

export const addModalConfig = (options: AddModalConfig) => {
	const { users, togglePopup } = options;

	return {
		title: "Add users",
		type: "addmodal",
		userList: users.map(user => ({ value: user.id, label: user.name })),
		show: true,

		addMembersEvent: users => {
			// console.warn(users)
			console.log(users);
			try {
				users.forEach(user =>
					httpService.post(httpService.endpoints.adduser, {
						room_id: httpService.room_id,
						member_id: user.value
					})
				);
			} catch (error) {
				console.log(error.message);
			}
		},
		handleClose: function () {
			this.show = false;
			togglePopup();
		}
	};
};
