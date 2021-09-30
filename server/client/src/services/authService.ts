// @ts-ignore
import { GetUserInfo, GetWorkspaceUser } from "@zuri/control";
import { userDispatch } from "../store/usersSlice";
import User from "../types/user";


async function getUserInfo(email: string) {
  try {
    const info = await GetWorkspaceUser(email);
    
  } catch (error) {
    
  }
}

async function setUserInfo() {
  try {
    const userInfo = await GetUserInfo();

    if (!userInfo) throw Error("User is not logged in.");

    const workspaceUser = await GetWorkspaceUser(userInfo.email);

    const user: User = {
      avatar: workspaceUser.image_url,
      name: workspaceUser.user_name,
      orgId: workspaceUser.org_id,
      id: workspaceUser._id,
    };

    userDispatch.setCurrentUser(user);
  } catch (e) {
    console.log("Info error:", e.message);
  }
}

export default setUserInfo;
