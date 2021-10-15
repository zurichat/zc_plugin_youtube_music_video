// @ts-ignore
import { pluginHeader } from "@zuri/plugin-header";
import { uiDispatch } from "../store/uiSlice";
import User from "../types/user";
import icon from "../media/musicRoomIcon.svg";
import { toast } from "react-toastify";
import userService from "../services/userService";

export { pluginHeader };

export const headerConfig = (users: User[]) => {
	return {
		name: "Music Plugin", //Name on header

		icon, //Image on header

		thumbnailUrl: users.filter(user => user.avatar).map(user => user.avatar), //Replace with images of users

		userCount: users.length, //User count on header

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

		userList: users.map(user => ({
			value: user.id,
			label: user.name,
			email: user.email
		})),

		show: true,

		addMembersEvent: users => {
			// console.warn(users)
			try {
				users.forEach(user =>
					userService.addMember(user.value, user.email, user.label)
				);

				toast.success("Added successfully");
			} catch (error) {}
		},

		handleClose: function () {
			this.show = false;
			togglePopup();
		}
	};
};
