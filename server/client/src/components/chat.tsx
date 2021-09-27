import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import ChatHeader from "./common/chatHeader";
import ChatItem from "./common/chatItem";
import ChatInput from "./common/chatInput";

import { chatSelect } from "../store/chatsSlice";
import { uiSelect } from "../store/uiSlice";

function Chat(props) {
  const chats = useSelector(chatSelect.allChat);
  const showChat = useSelector(uiSelect.showChat);
  const scroller = useRef(null);

  const scrollToBottom = () => {
    scroller.current.scrollIntoView(false);
  };

  useEffect(() => {
    if(showChat){
    scrollToBottom();
    };
  });

  if (!showChat) return null;
  
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
      <ChatInput handleFocus={handleFocus} handleBlur={handleBlur} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 415px;
  background-color: white;
  margin-left: 8px;
  display: flex;
  flex-direction: column;

  .chat-item-group {
    overflow-y: scroll !important;
    min-height: 321px;
    padding-left: 16px;
    padding-right: 30px;
    margin-top: 24px;
    flex-grow: 1;
  }
  .chat-item-group::-webkit-scrollbar {
    width: 3px;
  }
  .chat-item-group::-webkit-scrollbar-thumb {
    background-color: hsla(160, 100%, 36%, 1);
    width: 3px;
  }

  @media (max-width: 1000px) {
    background-color: transparent;
    width: 350px;
    margin-left: 0px;
    .chat-item-group {
      max-height: 450px;
      margin-top: 2px;
      background-color: white;
    }
  }
`;

export default Chat;
