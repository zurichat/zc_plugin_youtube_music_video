import React from "react";
import styled from "styled-components";
// import image from "src/media/user.png";

function ChatItem(props) {
  return (
    <Chat>
      <Items>
        <Img
          src="https://images.unsplash.com/photo-1498462440456-0dba182e775b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3BsYXNofGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt="user avater"
        />
        <NameTime>
          <Describe>
            <Username>Amara</Username>
            <Span>3 minute ago</Span>
          </Describe>
          <P>If you ask me, I would say it is so overrated, but....</P>
        </NameTime>
      </Items>
    </Chat>
  );
}

export default ChatItem;

export const Chat = styled.div`
  width: 347px;
  height: 573px;
  background: #ffffff;
  align-items: flex-start;
  padding: 1rem;
  margin: 4px 0px;
`;

export const Items = styled.div`
  display: flex;
  width: 100%;
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
