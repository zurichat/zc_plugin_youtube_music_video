// @ts-nocheck

import React from "react";
import styled from "styled-components";

import chatEmoji from "../../media/chatEmoji.svg";
import chatSend from "../../media/chatSend.svg";
import chatGif from "../../media/chatGif.svg";

function ChatInput() {
  return (
    <Wrapper>
      <input
        type="text"
        className="chat-input"
        placeholder="Type a message..."
      />
      <div className="chat-icon-group">
        <img src={chatEmoji} alt="emoji" className="chat-icon" />
        <img src={chatGif} alt="gif" className="chat-icon" />
        <img src={chatSend} alt="send" className="chat-icon" />
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

// .chat-input{
//     height: 48px;
//     width: 347px;
//     left: 778px;
//     top: 418px;
//     border-radius: 0px;
//     position: absolute;
//     padding: 0 12px;
//     font: lato;
//     font-weight: 500;
//     font-style: normal;
//     font-size: 15px;
//     line-height: 18px;
//     border:2px solid #08FFAE;
// }

// ::placeholder{
//     color:#C1C1C1;
//     position: static;
// }

// .chat-input:focus {
//     outline: none;
//     border: 2px solid #08FFAE;
//     font: lato;
//     font-size: 15px;
// }

// .icons1 {
//     color: #08FFAE;
//     width: 22px;
//     left: 66rem;
//     margin-top: 0.6rem;
//     top: 12px;
//     position: absolute;
//     top: 423px;
// }

// .icons2 {
//     color: #08FFAE;
//     width: 22px;
//     left: 68rem;
//     margin-top: 0.6rem;
//     top: 14px;
//     position: absolute;
//     top: 425px;
// }

// .icons3 {
//     color: #08FFAE;
//     width: 22px;
//     left: 70rem;
//     margin-top: 0.6rem;
//     top: 12px;
//     position: absolute;
//     top: 424px;
// }

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
