import { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { useDispatch } from "react-redux";

import chatEmoji from "../../media/chatEmoji.svg";
import chatSend from "../../media/chatSend.svg";
import chatGif from "../../media/chatGif.svg";

import Chat from "../../types/chat";

import { getUUID } from "../../utils/idGenerator";

import authService from "../../services/authService";
import chatService from "../../services/chatService";

function ChatInput(props) {
  // states to manage the input text and also the showcasing of the emoji
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const dispatch = useDispatch();

  // function to display the emoji once clicked and remove once the user select their preferred emoji
  const onEmojiClick = (event, emojiObject) => {
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  const clearInput = () => {
    setInputStr("");
  };

  const handleSend = () => {
    const { name, avatar, id: userId } = authService.getCurrentUser();

    const chat: Chat = {
      message: inputStr,
      name,
      avatar,
      userId,
      id: getUUID(),
      time: Date.now(),
    };

    chatService.createChat(chat);
    clearInput();
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
        <img
          src={chatEmoji}
          alt="emoji"
          className="chat-icon"
          onClick={() => setShowPicker((val) => !val)}
        />
        {showPicker && (
          <Picker
            pickerStyle={{ width: "18vw", marginLeft: "-10rem" }}
            onEmojiClick={onEmojiClick}
          />
        )}
        <img src={chatGif} alt="gif" className="chat-icon" />
        <img
          src={chatSend}
          alt="send"
          className="chat-icon"
          onClick={handleSend}
        />
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
