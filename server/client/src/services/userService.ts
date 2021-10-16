import User from "../types/user";
import httpService from "./httpService";

import {
	GetUserInfo,
	GetWorkspaceUser
	// @ts-ignore
} from "@zuri/control";

async function getCurrentUser(): Promise<User> {
	try {
		const {
			0: { email: identifier }
		} = await GetUserInfo();

		const {
			_id: id,
			email,
			display_name,
			user_name,
			image_url: avatar
		} = await GetWorkspaceUser(identifier);

		return {
			id,
			email,
			name: display_name || user_name,
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

		console.log([ids]);

		return httpService.post(httpService.endpoints.adduser, {
			room_id: httpService.room_id,
			memberId: ids
		});
	} catch (reason) {
		console.log(reason);
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
		console.time("workspaceUsers");
		const users = workspaceUsers || (await getWorkspaceUsers());
		console.timeEnd("workspaceUsers");

		const { data: ids } = await httpService.get(httpService.endpoints.members);

		const currentUser = await getCurrentUser();
		const isMember = ids.some(id => id === currentUser.id);

		const members = users.filter(user => ids.find(id => id === user.id));
		return isMember ? [...members, currentUser] : members;
	} catch (error) {
		console.log("Members error:", error);
		throw Error(error.message);
	}
}

async function isMember(): Promise<boolean> {
	try {
		const users = await getMembers();
		const currentUser = await getCurrentUser();
		console.log({ users, currentUser });
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
