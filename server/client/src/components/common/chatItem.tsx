import styled from "styled-components";
import Moment from "react-moment";

import Chat from "../../types/chat";

const Time = (time) => {
  var hours = (time.getHours() < 13) ? time.getHours() : time.getHours() - 12;
  if(hours === 0) hours = 12;
  var hour = (hours < 10) ? "0" + hours : hours;
  var minute = (time.getMinutes() < 10) ? "0" + time.getMinutes() : time.getMinutes();
  var format = (time.getHours() < 12) ? "AM" : "PM";
  return hour + ":" + minute + " " + format;
}

function ChatItem({ name, avatar, time, message }: Chat) {
  return (
    <Wrapper>
      <div className="item-avatar">
        <img src={avatar} alt="" />
      </div>
      <div className="item-content">
        <div className="item-name-time">
          <span className="item-name">{name}</span>
          <span className="item-time">
            {Time((new Date(time)))}
          </span>
        </div>
        <div className="item-text">{message}</div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 6px;
  max-height: 646px;
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

  .item-time {
    font-size: 12px;
    font-weight: 400;
    color: #616061;
  }

  .item-name {
    font-size: 15px;
    font-weight: 900;
    margin-right: 10px;
  }

  .item-text {
    line-height: 150%;
  }

  @media (max-width: 1000px) {
    max-height: 488px;
  }
`;

export default ChatItem;
