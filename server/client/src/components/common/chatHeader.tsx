import styled from "styled-components";

import store from "../../store";
import { uiDispatch } from "../../store/uiSlice";

import chatIcon from "../../media/chat.svg";
import chatIcon__green from "../../media/chat-green.svg";
import chatClose from "../../media/close.svg";
import chatClose__black from "../../media/close-black.svg";

function ChatHeader() {
  return (
    <Wrapper>
      <div className="chatHeader__left">
        <img src={chatIcon} alt="chat" className="chatHeader__icon" />
        <img src={chatIcon__green} alt="chat" className="chatHeader__icon__green" />
        <div className="chatHeader__title">Chat</div>
      </div>

      <img
        src={chatClose}
        alt="chat"
        className="chatHeader__close"
        onClick={() => uiDispatch.showChat(false)}
      />
      <img
        src={chatClose__black}
        alt="chat"
        className="chatHeader__close__black"
        onClick={() => uiDispatch.showChat(false)}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  padding: 0 16px;
  background: hsla(160, 100%, 36%, 1);
  color: white;

  .chatHeader__left {
    display: flex;
    align-items: center;
    width: 90px;
  }

  .chatHeader__icon {
    width: 20px;
    height: 20px;
  }

  .chatHeader__icon__green {
    display: none;
  }

  .chatHeader__title {
    font-size: 18px;
    font-weight: 700;
    margin-left: 10.25px;
  }

  .chatHeader__close {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .chatHeader__close__black {
    display: none;
  }

  @media (max-width: 1000px) {
    background: white;
    color: #00B87C;
    max-height: 64px;

    .chatHeader__close{
      display: none;
    }

    .chatHeader__close__black{
      display: inline;
      cursor: pointer;
    }

    .chatHeader__icon {
      display: none;
      width: 20px;
      height: 20px;
    }

    .chatHeader__icon__green {
      display: inline;
      width: 20px;
      height: 20px;
    }

  }
`;

export default ChatHeader;
