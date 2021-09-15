import React from "react";
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
      <div className="item-content"></div>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default ChatItem;

export const Chat = styled.div`
  background: #fff;
  align-items: flex-start;
  padding: 10px;
`;

export const Items = styled.div`
  display: flex;
  /* width: 100%; */
  height: auto;
  justify-content: center;
`;

export const Describe = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

export const Username = styled.h4`
  color: #242424;
  font-family: Lato;
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 19px;
  margin-left: 8px;
  margin-right: 16px;
`;

export const nameTime = styled.div`
  display: flex;
`;

export const Span = styled.span`
  font-family: Lato;
  font-size: 16px;
  line-height: 19px;
  color: #c1c1c1;
`;

export const P = styled.p`
  font-size: 14px;
  line-height: 140%;
  color: #3a3a3a;
  margin: 8px 8px;
`;

export const Img = styled.img`
  width: 45px;
  height: 40px;
  border-radius: 50%;
`;

export const NameTime = styled.div`
  width: 247px;
  height: 71px;
  margin: 0px 8px;
`;
