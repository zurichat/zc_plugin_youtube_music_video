// @ts-nocheck
import React from "react";
import styled from "styled-components";

import ChatHeader from "./common/chatHeader";
import ChatItem from "./common/chatItem";
import ChatInput from "./common/chatInput";

import getChats from "../mock-data/chats";

function Chat() {
  return (
    <Wrapper>
      <ChatHeader />
      <div className="chat-item-group">
        {getChats().map((chat, index) => (
          <ChatItem key={index} {...chat} />
        ))}
      </div>
      <ChatInput />
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
    width: 3px;
  }
  .chat-item-group::-webkit-scrollbar-thumb {
    background-color: #08ffae;
    width: 3px;
  }
`;

export default Chat;
