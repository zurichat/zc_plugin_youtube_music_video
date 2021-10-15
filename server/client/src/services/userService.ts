import User from "../types/user";
import httpService from "./httpService";

import {
	GetUserInfo,
	GetWorkspaceUser
	// GetWorkspaceUsers
	// @ts-ignore
} from "@zuri/control";
import { toast } from "react-toastify";

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

async function autoAddMember() {
	try {
		const { id, email, name } = await getCurrentUser();
		addMember(id, email, name);
	} catch (error) {
		console.log(error);
	}
}

function addMember(id: string, email: string, name = "user") {
	return httpService
		.post(httpService.endpoints.adduser, {
			room_id: httpService.room_id,
			member_id: id,
			email: email
		})
		.catch(reason => {
			toast.error(`Could not add ${name}`);
			console.log(reason);
			throw Error(reason.message);
		});
}

async function removeMember(id: string, name = "user") {
	httpService.post(httpService.endpoints.removeuser, {
		memberId: id
	});
}

async function getMembers(workspaceUsers?: User[]): Promise<User[]> {
	try {
		console.time("workspaceUsers");
		const users = workspaceUsers || (await getWorkspaceUsers());
		console.timeEnd("workspaceUsers");

		console.time("users");
		const { data: ids } = await httpService.get(httpService.endpoints.members);
		console.timeEnd("users");

		return users.filter(user => ids.find(id => id === user.id));
	} catch (error) {
		console.log("Users error:", error.message);
		throw Error(error.message);
	}
}

const userService = {
	autoAddMember,
	addMember,
	removeMember,
	getCurrentUser,
	getMembers,
	getWorkspaceUsers
};

export default userService;
