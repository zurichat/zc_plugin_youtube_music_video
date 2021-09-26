import { useEffect } from "react";
import { useSelector } from "react-redux";
import { userDispatch, userSelect } from "../store/usersSlice";

function UserInfo() {
  const user = useSelector(userSelect.currentUser);

  useEffect(() => {
    async () => {
      try {
        // @ts-ignore
        const { GetUserInfo } = await import("@zuri/control");

        const info = await GetUserInfo();

        console.log("mz", { info });

        if (!info) return;

        userDispatch.setCurrentUser({
          ...user,
          name: info.first_name,
          orgId: info.Organizations ? info.Organizations[0] : "",
        });
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        display: "none",
        width: "50px",
        height: "50px",
      }}
    >
      Here
    </div>
  );
}

export default UserInfo;
