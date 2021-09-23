import { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import GiphyPicker from "react-giphy-picker";

import chatEmoji from "../../media/chatEmoji.svg";
import chatSend from "../../media/chatSend.svg";
import chatGif from "../../media/chatGif.svg";

import authService from "../../services/authService";
import chatService from "../../services/chatService";

function ChatInput(props) {
  // states to manage the input text and also the showcasing of the emoji
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [showGiphy, setShowGiphy] = useState(false);
  const handleFocus = props.handleFocus;
  const handleBlur = props.handleBlur;

  // function to display the emoji once clicked and remove once the user select their preferred emoji
  const onEmojiClick = (event, emojiObject) => {
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  // function to display a gif once clicked
  const onGiphyClick = (event, gifObject) => {
    setInputStr((prevInput) => prevInput + gifObject.gif);
    setShowGiphy(false);
  };

  const clearInput = () => {
    setInputStr("");
  };

  const handleSend = () => {
    const { name, _id: userId, avatar } = authService.getCurrentUser();

    chatService.addChat({
      _id: Date.now() + "",
      userId,
      name,
      avatar,
      message: inputStr,
      time: Date.now(),
    });

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
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className="chat-icon-group">
        <img
          src={chatEmoji}
          alt="emoji"
          className="chat-icon"
          onClick={() => setShowPicker((val) => !val)}
        />
        {showPicker && (
          <div className="emoji-picker">
          <Picker pickerStyle={{ width: "20vw", marginLeft:"0rem" }} onEmojiClick={onEmojiClick} />
        </div>
        )}
        <img
          src={chatGif}
          alt="gif"
          className="chat-icon"
          onClick={() => setShowGiphy((val) => !val)}
        />
        {showGiphy && (
          <GiphyPicker
            pickerStyle={{ width: "18vw", marginLeft: "-10rem" }}
            onGiphyClick={onGiphyClick}
          />
        )}
        <img 
        src={chatSend} 
        alt="send" 
        className="chat-icon" 
        onClick={() => {
          if(inputStr !== ""){
          handleSend();
          }
          else return ;
        }}
        /*onKeyDown={() => {
          
        }}*/
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

  .emoji-picker {
    position: absolute;
    top: 5rem;
    right: 2rem;
  }
`;

export default ChatInput;
