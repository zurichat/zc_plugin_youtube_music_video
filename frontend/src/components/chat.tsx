import styled from "styled-components";
import { useSelector } from "react-redux";

import ChatHeader from "./common/chatHeader";
import ChatItem from "./common/chatItem";
import ChatInput from "./common/chatInput";

import { selectAllChats } from "../store/chatsSlice";
import { selectChat } from "../store/uiSlice";

function Chat() {
  const chats = useSelector(selectAllChats);
  const showChat = useSelector(selectChat);

  if (!showChat) return null;

  return (
    <Wrapper>
      <ChatHeader />
      <div className="chat-item-group">
        {chats.map((chat, index) => (
          <ChatItem key={index} {...chat} />
        ))}
      </div>
      <ChatInput />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;

  .chat-item-group {
    overflow-y: scroll;
    margin-top: 10px;
    height: 350px;
  }
  .chat-item-group::-webkit-scrollbar {
    width: 3px;
  }
  .chat-item-group::-webkit-scrollbar-thumb {
    background-color: #08ffae;
    width: 3px;
  }

  @media (max-width: 1000px) {
    .chat-item-group {
      max-height: 450px;
    }
  }
`;

export default Chat;
