import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import ChatHeader from "./common/chatHeader";
import ChatItem from "./common/chatItem";
import ChatInput from "./common/chatInput";

import { selectAllChats } from "../store/chatsSlice";
import { selectChat } from "../store/uiSlice";
import { createChat } from "../services/chatService"

function Chat(props) {
  const chats = useSelector(selectAllChats);
  const showChat = useSelector(selectChat);
  const chatCreate = createChat;
  const scroller = useRef(null);

  if (!showChat) return null;

  const scrollToBottom = () =>{
    scroller.current.scrollIntoView(false);
  }

  useEffect(() => {
    scrollToBottom();
  })

  return (
    <Wrapper>
      <ChatHeader />
      <div className="chat-item-group">
        {chats.map((chat, index) => (
          <ChatItem key={index} {...chat} />
        ))}
        <div className="scroller" ref={scroller}></div>
      </div>
      <ChatInput onClick={chatCreate} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 400px;
  background-color: white;

  .chat-item-group {
    overflow-y: scroll;
    margin-top: 10px;
    height: 350px;
  }
  .chat-item-group::-webkit-scrollbar {
    width: 3px;
  }
  .chat-item-group::-webkit-scrollbar-thumb {
    background-color: hsla(160, 100%, 36%, 1);
    width: 3px;
  }

  @media (max-width: 1000px) {
    .chat-item-group {
      max-height: 450px;
    }
  }
`;

export default Chat;
