import styled from "styled-components";
import Moment from "react-moment";

import Chat from "../../types/chat";
import { useSelector } from "react-redux";
import { userSelect } from "../../store/usersSlice";

function ChatItem({ name, avatar, time, message, userId }: Chat) {
  const user = useSelector(userSelect.userById(userId));

  return (
    <Wrapper>
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

          <span className="item-time">
            <Moment fromNow date={new Date(time).toJSON()} />
          </span>
        </div>

        <div className="item-text">{message}</div>
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
    margin-bottom: 8px;
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
    font-size: 17px;
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
