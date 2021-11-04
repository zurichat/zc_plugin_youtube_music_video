import { GetUserInfo, GetWorkspaceUser } from "@zuri/utilities";

async function getUserInfo(email: string) {
  try {
    const info = await GetWorkspaceUser(email);

    return { email: info.email, name: info.user_name };
  } catch (error) {
    console.log(error.message);
    return { name: '', email };
  }
}
