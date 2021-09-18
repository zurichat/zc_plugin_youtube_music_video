import styled from "styled-components";

interface Props {
  name: string;
  avatar: string;
  time: number;
  message: string;
}

function ChatItem({ name, avatar, time, message }: Props) {
  return (
    <Wrapper>
      <div className="item-avatar">
        <img src={avatar} alt="user avatar" />
      </div>
      <div className="item-content">
        <div className="item-name-time">
          <span className="item-name">{name}</span>
          <span className="item-time">{time} AM</span>
        </div>
        <div className="item-text">{message}</div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  padding: 10px;
  color: hsla(300, 2%, 11%, 1);

  .item-avatar {
    flex-basis: 50px;
    height: 50px;
    border-radius: 6px;
    background-color: #bebebe;
    margin-right: 10px;
  }

  .item-content {
    flex-basis: 100%;
  }

  .item-name-time {
    margin-bottom: 6px;
  }

  .item-name {
    font-size: 18px;
    font-weight: 700;
    margin-right: 10px;
  }
`;

export default ChatItem;
