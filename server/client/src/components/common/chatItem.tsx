import styled from "styled-components";
import Moment from "react-moment";

import Chat from "../../types/chat";
import chatService from "../../services/chatService";
import { chatDispatch } from "../../store/chatsSlice";
import { useSelector } from "react-redux";
import { userSelect } from "../../store/usersSlice";

function ChatItem({onCancel, onResend, id, name, avatar, time, message, userId, notSent = false, failed = false }) {
  const user = useSelector(userSelect.userById(userId));
  const mediaQueryPhone = window.matchMedia("(max-width: 450px)");
  const phone = mediaQueryPhone.matches;

  return (
    <Wrapper
    onClick={phone? onResend(id) : null}
    >
      <div className="item-avatar">
        <img
          src={user?.avatar ?? avatar}
          alt=""
          className="item-avatar-actual"
        />
      </div>

      <div className="item-content">
        <div className="item-name-time">
          <span className="item-name">{user?.name ?? name}</span>
          { notSent &&
          <span className="item-sending">sending...</span>
          }
          {/* failed &&
          <span className="item-failed">mesage not sent</span>
          */}
          { !notSent && 
          <span className="item-time">
            <Moment fromNow date={new Date(time).toJSON()} />
          </span>
          }
        </div>

        <div className="item-text">
          <div>{message}</div>
          {failed && <div className="lower-text">zuri.chat couldn't send this message
          <span id="start" onClick={onResend(id)}>
          Try again
          </span> 
          <span id="line">|</span> 
          <span onClick={onCancel(id)}>
          Cancel
          </span>
          </div>}
          {failed && <div className="lower-text-mobile">Couldn't send. Tap to try again.</div>}
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  max-height: 200px;
  color: hsla(300, 2%, 11%, 1);
  width: 100%;

  .item-avatar {
    align-self: flex-start;
    /* flex-basis: 36px; */
    margin-top: 8px;
    height: 40px;
    width: 40px;
    border-radius: 5px;
    margin-right: 10px;
    padding: 0;
  }

  .item-avatar-actual {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    margin: 0;
  }

  .item-content {
    flex-basis: 100%;
    font-weight: 400;
  }

  .item-name-time {
    margin-bottom: 3px;
  }

  .item-sending {
    font-size: 14px;
  }

  .item-time {
    font-size: 12px;
    font-weight: 500;
    color: #616061;
  }

  .item-name {
    font-size: 15px;
    font-weight: 800;
    margin-right: 10px;
  }

  .item-text {
    line-height: 150%;
    overflow-wrap: anywhere;
  }

  .lower-text {
    margin-left: 10px;
    font-size: 13px;
  }

  .lower-text-mobile {
    display: none;
  }

  #line{
    color: #b2b2b7;
  }

  #start{
    margin-left: 3px;
  }

  .item-text span {
    font-size: 14px;
    color: #2828ab;
  }

  .item-text span:hover {
    text-decoration: underline;
    color: #2929a5;
    cursor: grab;
  }

  @media (max-width: 1000px) {
    max-height: 488px;

    .lower-text {
      display: none;
    }

    .lower-text-mobile {
      display: block;
      color: red;
      font-size: 13px;
    }
  }
`;

export default ChatItem;
