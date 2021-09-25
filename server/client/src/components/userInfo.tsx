function UserInfo() {
  const handleSetUser = () => {
    // @ts-ignore
    import("@zuri/zuri-control")
      .then(({ GetUserInfo }) => {
        const { _id: id, first_name: name } = GetUserInfo();
        console.log({ id, name });
      })
      .catch((e) => console.log({ e }));
  };

  handleSetUser();

  return (
    <div style={{ position: "fixed", bottom: "20px", display: "none" }}></div>
  );
}

export default UserInfo;
