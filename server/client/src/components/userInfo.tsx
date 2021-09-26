import { useSelector } from "react-redux";
import { userDispatch, userSelect } from "../store/usersSlice";

function UserInfo() {
  const user = useSelector(userSelect.currentUser);

  const handleSetUser = () => {
    // @ts-ignore
    import("@zuri/zuri-control")
      .then(({ GetUserInfo }) => {
        const { first_name: name, Organizations } = GetUserInfo();
        userDispatch.setCurrentUser({ ...user, name, orgId: Organizations[0] });
      })
      .catch(console.log);
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
