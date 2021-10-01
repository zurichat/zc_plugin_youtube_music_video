import styled from "styled-components";
import Moment from "react-moment";

import Chat from "../../types/chat";
import chatService from "../../services/chatService";
import { chatDispatch } from "../../store/chatsSlice";

const Time = (time) => {
  var hours = (time.getHours() < 13) ? time.getHours() : time.getHours() - 12;
  if(hours === 0) hours = 12;
  var hour = (hours < 10) ? "0" + hours : hours;
  var minute = (time.getMinutes() < 10) ? "0" + time.getMinutes() : time.getMinutes();
  var format = (time.getHours() < 12) ? "AM" : "PM";
  return hour + ":" + minute + " " + format;
}

function ChatItem({ name, avatar, time, message, userId,notSent = false, failed = false}: Chat) {
  const resend = () => {
    const newChat = {
      id: "test", // this will be taken care of by db
      userId : userId,
      name: name,
      avatar: avatar,
      message: message,
      time: Date.now(),
    };
    chatDispatch.removeChat(newChat);
    chatService.addChat(newChat);
  };

  return (
    <Wrapper 
    onClick={() => {if(failed) resend();}}
    >
      <div className="item-avatar">
        <img src={avatar} alt="" />
      </div>
      <div className="item-content">
        <div className="item-name-time">
          <span className="item-name">{name}</span>
          { notSent &&
          <span className="item-time/status">sending...</span>
          }
          { failed &&
          <span className="item-failed">mesage not sent</span>
          }
          { !notSent && !failed &&
          <span className="item-time/status">
            {Time((new Date(time)))}
          </span>
          }
        </div>
        <div className="item-text">{message}</div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 6px;
  max-height: 200px;
  color: hsla(300, 2%, 11%, 1);

  .item-avatar {
    flex-basis: 36px;
    height: 36px;
    border-radius: 4px;
    margin-right: 10px;
  }

  .item-content {
    flex-basis: 100%;
    font-weight: 400;
  }

  .item-name-time {
    margin-bottom: 6px;
  }

  .item-time/status {
    font-size: 12px;
    font-weight: 400;
    color: #616061;
  }

  .item-failed {
    font-size: 12px;
    font-weight: 400;
    color: red;
  }

  .item-name {
    font-size: 15px;
    font-weight: 900;
    margin-right: 10px;
  }

  .item-text {
    line-height: 150%;
    overflow-wrap: anywhere;
  }

  @media (max-width: 1000px) {
    max-height: 488px;
  }
`;

export default ChatItem;
