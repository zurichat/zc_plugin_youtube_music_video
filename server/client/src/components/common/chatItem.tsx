import styled from "styled-components";
import Moment from "react-moment";

import Chat from "../../types/chat";
import { useSelector } from "react-redux";
import { userSelect } from "../../store/usersSlice";

function ChatItem({ userId, time, message, name, avatar }: Chat) {
  let user = useSelector(userSelect.userById(userId));

  return (
    <Wrapper>
      <div className="item-avatar">
        <img src={user.avatar || avatar} alt="" />
      </div>
      <div className="item-content">
        <div className="item-name-time">
          <span className="item-name">{user.name || name}</span>
          <span className="item-time">
            <Moment>{new Date(time).toJSON()}</Moment>
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
    overflow-wrap: anywhere;
  }

  @media (max-width: 1000px) {
    max-height: 488px;
  }
`;

export default ChatItem;
