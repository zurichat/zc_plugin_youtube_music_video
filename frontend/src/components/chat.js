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
    overflow-y: scroll;
    margin-top: 10px;
    max-height: 400px;
  }
  .chat-item-group::-webkit-scrollbar {
    width: 4px;
  }
  .chat-item-group::-webkit-scrollbar-thumb {
    background-color: #08ffae;
  }
`;

export default Chat;
