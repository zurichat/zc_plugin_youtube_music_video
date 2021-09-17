// @ts-nocheck

import React, { useState } from "react";
import styled from "styled-components";

import chatEmoji from "../../media/chatEmoji.svg";
import chatSend from "../../media/chatSend.svg";
import chatGif from "../../media/chatGif.svg";
import { useDispatch } from 'react-redux'

function ChatInput(props) {
  //const [message, setMessage] = useState();
  const dispatch = useDispatch();
 /* const handleMessage = (event) => {
    setMessage(event.target.value);
  }*/

  return (
    <Wrapper>
      <input
        type="text"
        className="chat-input"
        placeholder="Type a message..."
        //onBlur={handleMessage}
      />
      <div className="chat-icon-group">
        <img src={chatEmoji} alt="emoji" className="chat-icon" />
        <img src={chatGif} alt="gif" className="chat-icon" />
        <img src={chatSend}
          alt="send"
          className="chat-icon"
          onClick={event => props.onClick(dispatch, message)}
        />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid #08ffae;
  background-color: #fff;
  padding: 0 12px;
  z-index: 111;

  .chat-input {
    flex-grow: 1;
    height: 48px;
    border-radius: 0px;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    border: none;
    outline: none;
  }

  .chat-icon-group {
    flex-basis: 90px;
    display: flex;
    justify-content: space-between;
  }

  .chat-icon {
    color: #08ffae;
    width: 27px;
    cursor: pointer;
  }
`;

export default ChatInput;
