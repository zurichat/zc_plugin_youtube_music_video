// @ts-nocheck
import React from "react";
import styled from "styled-components";

import ChatHeader from "./common/chatHeader";
import ChatItem from "./common/chatItem";

import getChats from "../mock-data/chats";

function Chat() {
  return (
    <Wrapper>
      <ChatHeader />
      <div className="chat-item-group">
        {getChats().map((chat) => (
          <ChatItem {...chat} />
        ))}
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
