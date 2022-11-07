// @ts-ignore
// import { PluginHeader } from "@zuri/zuri-ui";
import icon from "../media/musicRoomIcon.svg";
import userService from "../services/userService";

// export { PluginHeader };

export const headerConfig = (members: User[], cb) => {
	return {
		name: "Music Plugin", //Name on header
		icon, //Image on header
		userCount: members.length, //User count on header
		thumbnailUrl: members.filter(user => user.avatar).map(user => user.avatar), //Replace with images of users
		hasThumbnail: true, //set false if you don't want thumbnail on the header

		roomInfo: {
			membersList: members.map(user => ({ _id: user.id, email: user.email })),

			addmembersevent: values => {
				// values: {value: string, label: string}[]
				userService.addMember(values.map(value => value.value)).then(cb);
			},

			removememberevent: id => {
				userService.removeMember(id).then(cb);
			}
		}
	};
};
