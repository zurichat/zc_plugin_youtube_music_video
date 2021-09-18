import styled from "styled-components";

import store from "../../store";
import { toggleChat } from "../../store/uiSlice";

import chatIcon from "../../media/chat.svg";
import chatClose from "../../media/close.svg";

function ChatHeader() {
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
        onClick={() =>
          store.dispatch({ type: toggleChat.type, payload: { chat: false } })
        }
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  padding: 16px;
  background: hsla(160, 100%, 36%, 1);
  color: white;

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
  }

  .chatHeader__close {
    display: none;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  @media (max-width: 1000px) {
    .chatHeader__close {
      display: inline;
    }
  }
`;

export default ChatHeader;
