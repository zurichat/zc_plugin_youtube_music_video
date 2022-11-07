// import { getWorkspaceUser } from "@zuri/utilities";

async function getUserInfo(email: string) {
	try {
		// const info = await getWorkspaceUser(email);
		const info = { email: "", user_name: "" };

		return { email: info.email, name: info.user_name };
	} catch (error) {
		console.log(error.message);
		return { name: "", email };
	}
}
