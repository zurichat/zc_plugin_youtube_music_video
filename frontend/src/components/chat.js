// @ts-nocheck
import React from "react";
import styled from "styled-components";

import ChatHeader from "./common/chatHeader";
import ChatItem from "./common/chatItem";
import chatItem from "../media/chatItem.svg";

function Chat() {
  const chat = {
    name: "Amara",
    time: 3,
    message: "If you ask me, I would say it is so overrated, but...",
    avatar: chatItem,
  };

  return (
    <Wrapper>
      <ChatHeader />
      <div className="chat-item-group">
        <ChatItem {...chat} />
        <ChatItem {...chat} />
        <ChatItem {...chat} />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .chat-item-group {
    margin-top: 10px;
  }
`;

export default Chat;
