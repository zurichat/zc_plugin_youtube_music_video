// @ts-nocheck

import React, { useState } from "react";
import styled from "styled-components";

// emoji picker library
import Picker from "emoji-picker-react";

import chatEmoji from "../../media/chatEmoji.svg";
import chatSend from "../../media/chatSend.svg";
import chatGif from "../../media/chatGif.svg";

function ChatInput() {

    //State for the input section and showing the emojis 
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
    
  };

  return (
    <Wrapper>
      <input
        type="text"
        className="chat-input"
        placeholder="Type a message..."
        value={inputStr}
        onChange={(e) => setInputStr(e.target.value)}
      />
      <div className="chat-icon-group">
        <img src={chatEmoji} alt="emoji" className="chat-icon" onClick={() => setShowPicker((val) => !val)}/>
        <img src={chatGif} alt="gif" className="chat-icon" />
        <img src={chatSend} alt="send" className="chat-icon" />
        {showPicker && (
          <Picker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} />
        )}
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
