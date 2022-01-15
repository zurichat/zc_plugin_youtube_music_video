import httpService from "./httpService";

import { GetUserInfo, GetWorkspaceUser } from "@zuri/utilities";

async function getCurrentUser(): Promise<User> {
	try {
		const {
			user: {
				_id: id,
				email,
				display_name,
				user_name,
				image_url: avatar }
		} = await GetUserInfo();

		// const {
		// 	_id: id,
		// 	email,
		// 	display_name,
		// 	user_name,
		// 	image_url: avatar
		// } = await GetWorkspaceUser(identifier);

		return {
			id,
			email,
			name: user_name || display_name,
			avatar
		};
	} catch (error) {
		throw Error("");
	}
}

async function getWorkspaceUsers(): Promise<User[]> {
	try {
		const {
			data: { data: users }
		} = await httpService.get(
			`https://api.zuri.chat/organizations/${httpService.org_id}/members`
		);

		// const { totalUsers, ...rest } = await GetWorkspaceUsers();
		// const users = [...new Array(totalUsers).keys()].map(index => rest[index]);

		return users.map(data => {
			const {
				_id: id,
				user_name,
				image_url: avatar,
				display_name,
				email
			} = data;

			return {
				id,
				name: display_name || user_name,
				avatar,
				email
			};
		});
	} catch (error) {
		throw Error(error.message);
	}
}

async function addMember(ids?: string[]) {
	try {
		if (!ids) {
			const { id } = await getCurrentUser();
			ids = [id];
		}

		return httpService.post(httpService.endpoints.adduser, {
			room_id: httpService.room_id,
			memberId: ids
		});
	} catch (reason) {
		console.log(reason.message);
		throw Error(reason.message);
	}
}

async function removeMember(id: string, name = "user") {
	httpService.put(httpService.endpoints.removeuser, {
		memberId: id
	});
}

async function getMembers(workspaceUsers?: User[]): Promise<User[]> {
	try {
		const users = workspaceUsers || (await getWorkspaceUsers());

		const { data: ids } = await httpService.get(httpService.endpoints.members);

		const uniqueIds = [...new Set(ids)];

		const currentUser = await getCurrentUser();

		const members = users.filter(user => uniqueIds.find(id => id === user.id));

		// This is temporary and may be removed in the future
		// In some cases, the currentUser is not in the workspace users list.

		const isMember = uniqueIds.some(id => id === currentUser.id);
		const inList = members.some(member => member.id === currentUser.id);

		// Include currentUser in the members list if its a member and not in the list
		return isMember && !inList ? [...members, currentUser] : members;
	} catch (error) {
		console.log("Members error:", error.message);
		throw Error(error.message);
	}
}

async function isMember(): Promise<boolean> {
	try {
		const users = await getMembers();
		const currentUser = await getCurrentUser();
		// console.log({ users, currentUser });
		return users.some(user => user.id === currentUser.id);
	} catch (error) {
		throw Error(error.message);
	}
}

const userService = {
	addMember,
	removeMember,
	getCurrentUser,
	getMembers,
	getWorkspaceUsers,
	isMember
};

export default userService;
