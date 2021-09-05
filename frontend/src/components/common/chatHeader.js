// @ts-nocheck

import React from "react";
import styled from "styled-components";

import chatIcon from "../../media/chat.svg";
import chatClose from "../../media/close.svg";

function ChatHeader({ onChat }) {
  return (
    <Wrapper>
      <div className="chatHeader__left">
        <img src={chatIcon} alt="chat" className="chatHeader__icon" />
        <div className="chatHeader__title">Chats</div>
      </div>

      <img
        src={chatClose}
        alt="chat"
        className="chatHeader__close"
        onClick={onChat}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 347px;
  height: 60px;
  padding: 16px;
  background: #fff;

  .chatHeader__left {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90px;
  }

  .chatHeader__icon {
    width: 20px;
    height: 20px;
  }

  .chatHeader__title {
    font-size: 18px;
    font-weight: 500;
    color: #00b87c;
  }

  .chatHeader__close {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;

export default ChatHeader;
