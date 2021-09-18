import React, {useState} from "react";
import styled from "styled-components";

// import the emoji-react-picker package
import Picker from "emoji-picker-react";
import chatEmoji from "../../media/chatEmoji.svg";
import chatSend from "../../media/chatSend.svg";
import chatGif from "../../media/chatGif.svg";

function ChatInput() {

  // states to manage the input text and also the showcasing of the emoji
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  // function to display the emoji once clicked and remove once the user select their preferred emoji
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
        <img src={chatEmoji} alt="emoji" className="chat-icon" onClick={() => setShowPicker((val) => !val)} />
        {showPicker && (
          <Picker pickerStyle={{ width: "18vw", marginLeft:"-10rem" }} onEmojiClick={onEmojiClick} />
        )}
        <img src={chatGif} alt="gif" className="chat-icon" />
        <img src={chatSend} alt="send" className="chat-icon" />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
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
