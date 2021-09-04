// @ts-nocheck
import React from "react";
import styled from "styled-components";

import ChatHeader from "./common/chatHeader";
import ChatItem from "./common/chatItem";
<<<<<<< HEAD
import chatItem from "../media/chatItem.svg";

function Chat() {
  const chat = {
    name: "Amara",
    time: 3,
    message: "If you ask me, I would say it is so overrated, but...",
    avatar: chatItem,
  };

=======

import getChats from "../mock-data/chats";

function Chat() {
>>>>>>> 036a84d1db4ffb702b21fea8844d276b0eec9c25
  return (
    <Wrapper>
      <ChatHeader />
      <div className="chat-item-group">
<<<<<<< HEAD
        <ChatItem {...chat} />
        <ChatItem {...chat} />
        <ChatItem {...chat} />
=======
        {getChats().map((chat) => (
          <ChatItem {...chat} />
        ))}
>>>>>>> 036a84d1db4ffb702b21fea8844d276b0eec9c25
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .chat-item-group {
<<<<<<< HEAD
    margin-top: 10px;
=======
    overflow-y: scroll;
    margin-top: 10px;
    max-height: 400px;
  }
  .chat-item-group::-webkit-scrollbar {
    width: 4px;
  }
  .chat-item-group::-webkit-scrollbar-thumb {
    background-color: #08ffae;
>>>>>>> 036a84d1db4ffb702b21fea8844d276b0eec9c25
  }
`;

export default Chat;
