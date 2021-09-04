// @ts-nocheck

import React from "react";

import chatEmoji from "../../media/chatEmoji.svg";
import chatSend from "../../media/chatSend.svg";
import chatGif from "../../media/chatGif.svg";

import styled from "styled-components";

const InputBar = styled.input`
  height: 48px;
  width: 347px;
  left: 778px;
  top: 418px;
  border-radius: 0px;
  position: absolute;
  padding: 0 12px;
  font: lato;
  font-weight: 500;
  font-style: normal;
  font-size: 15px;
  line-height: 18px;
  border: 2px solid #08ffae;

  ::placeholder {
    color: #c1c1c1;
    position: static;
  }
`;

const Icon = styled.img`
  color: #08ffae;
  width: 22px;
  left: 66rem;
  margin-top: 0.6rem;
  top: 12px;
  position: absolute;
  top: 423px;
`;

const Icon1 = styled.img`
  color: #08ffae;
  width: 22px;
  left: 68rem;
  margin-top: 0.6rem;
  top: 14px;
  position: absolute;
  top: 425px;
`;
const Icon2 = styled.img`
  color: #08ffae;
  width: 22px;
  left: 70rem;
  margin-top: 0.6rem;
  top: 12px;
  position: absolute;
  top: 424px;
`;

function ChatInput() {
  return (
    <div className="input-group">
      <div className="input-box">
        <InputBar
          type="text"
          className="chat-input"
          placeholder="Type a message..."
        />
        <a href="#">
          <Icon src={chatEmoji} alt="" />
        </a>
        <a href="#">
          <Icon1 src={chatGif} alt="" />
        </a>
        <a href="#">
          <Icon2 src={chatSend} alt="" />
        </a>
      </div>
    </div>
  );
}
export default ChatInput;

// HTML & CSS
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Chat Input</title>

//     <style>
//     @import url('https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap');

// </style>
// <script src="https://kit.fontawesome.com/c51a9b31aa.js" crossorigin="anonymous"></script>
// </head>
// <body>

//     <div class="input-group">
//         <div class="input-box">
//           <input type="text" class="chat-input" placeholder="Type a message...">
//         <a href="#"><img src="./Group 1.svg" alt="" class="icons1"></a>
//         <a href="#"><img src="./Group 2.svg" alt="" class="icons2"></a>
//         <a href="#"><img src="./Group 3.svg" alt="" class="icons3"></a>
//         </div>
//       </div>

// </body>
// </html>
