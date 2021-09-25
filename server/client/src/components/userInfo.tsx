import { useSelector } from "react-redux";
import { userDispatch, userSelect } from "../store/usersSlice";

function UserInfo() {
  const user = useSelector(userSelect.currentUser);

  const handleSetUser = () => {
    // @ts-ignore
    import("@zuri/zuri-control")
      .then(({ GetUserInfo }) => {
        const { _id: id, first_name: name, ...rest } = GetUserInfo();
        console.log({ id, name, ...rest });
        userDispatch.setCurrentUser({ ...user, id, name });
      })
      .catch((e) => console.log({ e }));
  };

  handleSetUser();

  return (
    <div style={{ position: "fixed", bottom: "20px", display: "none" }}></div>
  );
}

export default UserInfo;
