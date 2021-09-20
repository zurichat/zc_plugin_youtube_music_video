import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import ChatHeader from "./common/chatHeader";
import ChatItem from "./common/chatItem";
import ChatInput from "./common/chatInput";

import { chatSelect } from "../store/chatsSlice";
import { uiSelect } from "../store/uiSlice";
import { createChat } from "../services/chatService";

function Chat(props) {
  const chats = useSelector(chatSelect.allChat);
  const showChat = useSelector(uiSelect.showChat);
  const chatCreate = createChat;
  const scroller = useRef(null);

  if (!showChat) return null;

  const scrollToBottom = () =>{
    scroller.current.scrollIntoView(false);
  }

  useEffect(() => {
    scrollToBottom();
  });
  
  function handleFocus() {
    const mediaQuery = window.matchMedia("(max-width: 1000px)");
    const chatItemGroup =
      document.querySelector<HTMLElement>(".chat-item-group");
    const chatWrapper = document.querySelector<HTMLElement>(".chat-wrapper");

    if (mediaQuery.matches) {
      chatItemGroup.style.maxHeight = "200px";
      chatWrapper.style.position = "fixed";
      chatWrapper.style.top = "60px";
    }
  }

  function handleBlur() {
    const mediaQuery = window.matchMedia("(max-width: 1000px)");
    const chatItemGroup =
      document.querySelector<HTMLElement>(".chat-item-group");
    const chatWrapper = document.querySelector<HTMLElement>(".chat-wrapper");

    if (mediaQuery.matches) {
      chatItemGroup.style.maxHeight = "450px";
      chatWrapper.style.position = "fixed";
      chatWrapper.style.top = "70px";
    }
  }

  return (
    <Wrapper className="chat-wrapper">
      <ChatHeader />
      <div className="chat-item-group">
        {chats.map((chat, index) => (
          <ChatItem key={index} {...chat} />
        ))}
        <div className="scroller" ref={scroller}></div>
      </div>
      <ChatInput
        onClick={chatCreate}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
      />
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
