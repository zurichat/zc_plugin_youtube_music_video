import React from "react";
// @ts-ignore
import { GetUserInfo } from "@zuri/zuri-control";

interface Props {}

function UserInfo(props: Props) {
  const {} = props;

  const handleSetUser = () => {
    const info = GetUserInfo();
    console.log({ info });
  };

  handleSetUser();

  return <div></div>;
}

export default UserInfo;
