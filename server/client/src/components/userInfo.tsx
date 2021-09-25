import { useEffect } from "react";
import { useSelector } from "react-redux";
import { userDispatch, userSelect } from "../store/usersSlice";

function UserInfo() {
  const handleSetUser = () => {
    // @ts-ignore
    import("@zuri/zuri-control")
      .then(({ GetUserInfo }) => {
        const info = GetUserInfo();
        console.log(info);
      })
      .catch();
  };

  handleSetUser();

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