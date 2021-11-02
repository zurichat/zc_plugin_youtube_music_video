// @ts-ignore
import { GetUserInfo, GetWorkspaceUser } from "@zuri/control";

async function getUserInfo(email: string) {
	try {
		const info = await GetWorkspaceUser(email);

		return { email: info.email, name: info.user_name };
	} catch (error) {
		console.log(error.message);
		return { name: "", email };
	}
}
