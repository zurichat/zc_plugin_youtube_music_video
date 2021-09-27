import { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import GiphyPicker from "react-giphy-picker";
// import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

import chatEmoji from "../../media/chatEmoji.svg";
import chatSend from "../../media/chatSend.svg";
import chatGif from "../../media/chatGif.svg";
import bold from "../../media/bold.svg";

import chatService from "../../services/chatService";
import { useSelector } from "react-redux";
import { userSelect } from "../../store/usersSlice";

function ChatInput(props) {
  // states to manage the input text and also the showcasing of the emoji
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [showGiphy, setShowGiphy] = useState(false);
  const handleFocus = props.handleFocus;
  // const handleBlur = props.handleBlur;
  const currentUser = useSelector(userSelect.currentUser);

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
    const { name, id: userId, avatar } = currentUser;

    chatService.addChat({
      id: "", // this will be taken care of by db
      userId,
      name,
      avatar,
      message: inputStr,
      time: Date.now(),
    });

    clearInput();
  };

  return (
    // <Wrapper onClick={handleFocus}>
    //   <input
    //     type="text"
    //     className="chat-input"
    //     placeholder="Type a message..."
    //     value={inputStr}
    //     onChange={(e) => setInputStr(e.target.value)}
    //   />

    //   <div className="chat-icon-group">
    //     <img
    //       src={chatEmoji}
    //       alt="emoji"
    //       className="chat-icon"
    //       onClick={() => setShowPicker((val) => !val)}
    //     />
    //     {showPicker && (
    //       <div className="emoji-picker">
    //         <Picker
    //           pickerStyle={{ width: "20vw", marginLeft: "0rem" }}
    //           onEmojiClick={onEmojiClick}
    //         />
    //       </div>
    //     )}
    //     <img
    //       src={chatGif}
    //       alt="gif"
    //       className="chat-icon"
    //       onClick={() => setShowGiphy((val) => !val)}
    //     />
    //     {showGiphy && (
    //       <GiphyPicker
    //         pickerStyle={{ width: "18vw", marginLeft: "-10rem" }}
    //         onGiphyClick={onGiphyClick}
    //       />
    //     )}
    //     <img
    //       src={chatSend}
    //       alt="send"
    //       className="chat-icon"
    //       onClick={() => {
    //         if (inputStr !== "") {
    //           handleSend();
    //         } else return;
    //       }}
    //       /*onKeyDown={() => {

    //     }}*/
    //     />
    //   </div>
    // </Wrapper>
    <ChatInputStyled onClick={handleFocus}>
      <input
        type="text"
        value={inputStr}
        onKeyPress={(e) => (e.key === "Enter" ? handleSend() : undefined)}
        onChange={(e) => setInputStr(e.target.value)}
        placeholder="Send a message to John"
      />
      <div className="tags">
        <button>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.7768 5.40774C12.9331 5.47557 13.026 5.63832 13.0048 5.80737L12.4347 10.3682H17.6162C17.7651 10.3682 17.9006 10.4543 17.9637 10.5892C18.0269 10.724 18.0064 10.8833 17.911 10.9976L11.6708 18.4859C11.5617 18.6168 11.3794 18.6601 11.2232 18.5923C11.0669 18.5244 10.974 18.3617 10.9952 18.1926L11.5653 13.6318H6.38378C6.23487 13.6318 6.0994 13.5457 6.03624 13.4108C5.97308 13.276 5.99362 13.1168 6.08896 13.0024L12.3292 5.51409C12.4383 5.38321 12.6206 5.3399 12.7768 5.40774ZM7.20315 12.8643H12C12.1101 12.8643 12.2148 12.9115 12.2877 12.9941C12.3605 13.0766 12.3945 13.1864 12.3808 13.2957L11.9191 16.989L16.7968 11.1357H12C11.8899 11.1357 11.7851 11.0885 11.7123 11.0059C11.6394 10.9234 11.6055 10.8136 11.6192 10.7044L12.0808 7.01105L7.20315 12.8643Z"
              fill="#616061"
            />
          </svg>
        </button>
        <button>
          <svg
            width="2"
            height="18"
            viewBox="0 0 2 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1V17" stroke="#B0AFB0" strokeLinecap="round" />
          </svg>
        </button>
        <button>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.37988 2.33317C2.37988 2.03671 2.62021 1.79639 2.91666 1.79639H7.58333C9.16845 1.79639 10.4534 3.08138 10.4534 4.6665C10.4534 6.25162 9.16845 7.53661 7.58333 7.53661H2.91666C2.62021 7.53661 2.37988 7.29629 2.37988 6.99983V2.33317ZM3.45344 2.86995V6.46305H7.58333C8.57554 6.46305 9.37988 5.65871 9.37988 4.6665C9.37988 3.67429 8.57554 2.86995 7.58333 2.86995H3.45344Z"
              fill="#616061"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.37988 7.00016C2.37988 6.7037 2.62021 6.46338 2.91666 6.46338H8.16666C9.75178 6.46338 11.0368 7.74837 11.0368 9.33349C11.0368 10.9186 9.75178 12.2036 8.16666 12.2036H2.91666C2.62021 12.2036 2.37988 11.9633 2.37988 11.6668V7.00016ZM3.45344 7.53694V11.13H8.16666C9.15887 11.13 9.96322 10.3257 9.96322 9.33349C9.96322 8.34128 9.15887 7.53694 8.16666 7.53694H3.45344Z"
              fill="#616061"
            />
          </svg>
        </button>
        <button>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.29651 2.33317C5.29651 2.03671 5.53683 1.79639 5.83329 1.79639H11.0833C11.3797 1.79639 11.6201 2.03671 11.6201 2.33317C11.6201 2.62962 11.3797 2.86995 11.0833 2.86995H5.83329C5.53683 2.86995 5.29651 2.62962 5.29651 2.33317Z"
              fill="#616061"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.37976 11.6667C2.37976 11.3702 2.62009 11.1299 2.91654 11.1299H8.16654C8.463 11.1299 8.70332 11.3702 8.70332 11.6667C8.70332 11.9631 8.463 12.2034 8.16654 12.2034H2.91654C2.62009 12.2034 2.37976 11.9631 2.37976 11.6667Z"
              fill="#616061"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.93829 1.83071C9.21587 1.9348 9.35651 2.24421 9.25242 2.52179L5.75242 11.8551C5.64833 12.1327 5.33892 12.2733 5.06134 12.1692C4.78376 12.0652 4.64312 11.7557 4.74721 11.4782L8.24721 2.14484C8.35131 1.86726 8.66071 1.72662 8.93829 1.83071Z"
              fill="#616061"
            />
          </svg>
        </button>
        <button>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.44913 2.12448C9.96586 0.60639 12.3768 0.6281 13.8678 2.17327C15.3589 3.71844 15.3798 6.21688 13.9149 7.78867L13.9077 7.79645L11.9489 9.82621C11.9489 9.82623 11.9489 9.82618 11.9489 9.82621C11.156 10.6481 10.0576 11.0728 8.93895 10.9898C7.82026 10.9067 6.79153 10.3243 6.11974 9.39358C5.92098 9.11822 5.97526 8.72802 6.24098 8.52205C6.50669 8.31608 6.88322 8.37233 7.08198 8.64769C7.54493 9.28907 8.25386 9.69045 9.02479 9.74767C9.79571 9.80489 10.5526 9.51229 11.099 8.94583L13.054 6.91986C14.0601 5.83647 14.0445 4.11742 13.0181 3.05381C11.9916 1.98999 10.3323 1.97405 9.2869 3.01721L8.16709 4.17092C7.93177 4.41336 7.55136 4.41221 7.3174 4.16835C7.08345 3.92449 7.08456 3.53026 7.31988 3.28782L8.44913 2.12448Z"
              fill="#616061"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.0512 6.17371C4.8441 5.35177 5.9424 4.92722 7.06105 5.01025C8.17974 5.09327 9.20847 5.67572 9.88026 6.60642C10.079 6.88178 10.0247 7.27197 9.75902 7.47794C9.49331 7.68391 9.11678 7.62766 8.91802 7.3523C8.45507 6.71093 7.74614 6.30954 6.97521 6.25233C6.20429 6.19511 5.44739 6.4877 4.90097 7.05417L2.94597 9.08012C1.93993 10.1635 1.9555 11.8826 2.98186 12.9462C4.00822 14.0098 5.66706 14.0259 6.7125 12.9834L7.82514 11.8303C8.05977 11.5872 8.44019 11.5872 8.67483 11.8303C8.90946 12.0735 8.90946 12.4677 8.67483 12.7109L7.55093 13.8756C6.0342 15.3936 3.62322 15.3719 2.13217 13.8267C0.641128 12.2815 0.620178 9.7831 2.08509 8.21132L2.09234 8.20354L4.0512 6.17371C4.05117 6.17374 4.05122 6.17369 4.0512 6.17371Z"
              fill="#616061"
            />
          </svg>
        </button>
        <button>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.55688 8.75023C8.55688 8.48016 8.77582 8.26123 9.04589 8.26123H17.2457C17.5157 8.26123 17.7347 8.48016 17.7347 8.75023C17.7347 9.0203 17.5157 9.23924 17.2457 9.23924H9.04589C8.77582 9.23924 8.55688 9.0203 8.55688 8.75023Z"
              fill="#616061"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.55688 12.5002C8.55688 12.2302 8.77582 12.0112 9.04589 12.0112H17.2457C17.5157 12.0112 17.7347 12.2302 17.7347 12.5002C17.7347 12.7703 17.5157 12.9892 17.2457 12.9892H9.04589C8.77582 12.9892 8.55688 12.7703 8.55688 12.5002Z"
              fill="#616061"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.55688 16.2502C8.55688 15.9802 8.77582 15.7612 9.04589 15.7612H17.2457C17.5157 15.7612 17.7347 15.9802 17.7347 16.2502C17.7347 16.5203 17.5157 16.7392 17.2457 16.7392H9.04589C8.77582 16.7392 8.55688 16.5203 8.55688 16.2502Z"
              fill="#616061"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.01196 8.75023C7.01196 8.48016 6.79303 8.26123 6.52296 8.26123H5.89221C5.62214 8.26123 5.40321 8.48016 5.40321 8.75023C5.40321 9.0203 5.62214 9.23924 5.89221 9.23924H6.52296C6.79303 9.23924 7.01196 9.0203 7.01196 8.75023Z"
              fill="#616061"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.01196 12.5002C7.01196 12.2302 6.79303 12.0112 6.52296 12.0112H5.89221C5.62214 12.0112 5.40321 12.2302 5.40321 12.5002C5.40321 12.7703 5.62214 12.9892 5.89221 12.9892H6.52296C6.79303 12.9892 7.01196 12.7703 7.01196 12.5002Z"
              fill="#616061"
            />
            <path
              d="M6.52295 16.25H5.8922"
              stroke="#616061"
              strokeWidth="0.978006"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button className="btn-test">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.7734 12.0737C14.7734 13.6194 13.5317 14.8724 12.0001 14.8724C10.4685 14.8724 9.22686 13.6194 9.22686 12.0737C9.22686 10.528 10.4685 9.27497 12.0001 9.27497C13.5317 9.27497 14.7734 10.528 14.7734 12.0737ZM14.7734 12.0737L14.7734 12.7734C14.7734 13.9326 15.7047 14.8724 16.8534 14.8724C18.0021 14.8724 18.9333 13.9326 18.9333 12.7734V12.0737C18.9331 8.82222 16.7134 5.99937 13.5758 5.26043C10.4383 4.52149 7.20973 6.06121 5.78343 8.97672C4.35713 11.8922 5.10897 15.4151 7.59809 17.4796C10.0872 19.5441 13.6576 19.606 16.2155 17.6292"
              stroke="#616061"
              strokeWidth="0.941892"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button onClick={() => setShowPicker((val) => !val)}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.8125 9.6875C8.06114 9.6875 8.2996 9.58873 8.47541 9.41291C8.65123 9.2371 8.75 8.99864 8.75 8.75C8.75 8.50136 8.65123 8.2629 8.47541 8.08709C8.2996 7.91127 8.06114 7.8125 7.8125 7.8125C7.56386 7.8125 7.3254 7.91127 7.14959 8.08709C6.97377 8.2629 6.875 8.50136 6.875 8.75C6.875 8.99864 6.97377 9.2371 7.14959 9.41291C7.3254 9.58873 7.56386 9.6875 7.8125 9.6875Z"
              fill="#616061"
            />
            <path
              d="M7.67011 12.0838C7.61561 12.0218 7.54937 11.9712 7.4752 11.9349C7.40103 11.8986 7.3204 11.8774 7.23799 11.8725C7.15557 11.8675 7.07299 11.879 6.99503 11.9061C6.91706 11.9333 6.84524 11.9756 6.78373 12.0307C6.72222 12.0858 6.67223 12.1525 6.63664 12.227C6.60106 12.3015 6.58059 12.3823 6.57642 12.4648C6.57225 12.5472 6.58446 12.6297 6.61234 12.7074C6.64022 12.7851 6.68322 12.8565 6.73886 12.9175C7.14899 13.3767 7.65157 13.7439 8.21362 13.995C8.77567 14.2462 9.38449 14.3757 10.0001 14.375C10.6157 14.3757 11.2246 14.2462 11.7866 13.995C12.3487 13.7439 12.8512 13.3767 13.2614 12.9175C13.3701 12.7938 13.4256 12.6321 13.4158 12.4676C13.4059 12.3031 13.3315 12.1492 13.2088 12.0393C13.086 11.9294 12.9248 11.8724 12.7603 11.8808C12.5957 11.8891 12.4411 11.9621 12.3301 12.0838C12.0373 12.412 11.6782 12.6745 11.2766 12.854C10.875 13.0334 10.44 13.1258 10.0001 13.125C9.07511 13.125 8.24386 12.7238 7.67011 12.0838Z"
              fill="#616061"
            />
            <path
              d="M13.125 8.75C13.125 8.99864 13.0262 9.2371 12.8504 9.41291C12.6746 9.58873 12.4361 9.6875 12.1875 9.6875C11.9389 9.6875 11.7004 9.58873 11.5246 9.41291C11.3488 9.2371 11.25 8.99864 11.25 8.75C11.25 8.50136 11.3488 8.2629 11.5246 8.08709C11.7004 7.91127 11.9389 7.8125 12.1875 7.8125C12.4361 7.8125 12.6746 7.91127 12.8504 8.08709C13.0262 8.2629 13.125 8.50136 13.125 8.75Z"
              fill="#616061"
            />
            <path
              d="M17.5 10C17.5 9.01509 17.306 8.03982 16.9291 7.12987C16.5522 6.21993 15.9997 5.39314 15.3033 4.6967C14.6069 4.00026 13.7801 3.44781 12.8701 3.0709C11.9602 2.69399 10.9849 2.5 10 2.5C9.01509 2.5 8.03982 2.69399 7.12987 3.0709C6.21993 3.44781 5.39314 4.00026 4.6967 4.6967C4.00026 5.39314 3.44781 6.21993 3.0709 7.12987C2.69399 8.03982 2.5 9.01509 2.5 10C2.5 11.9891 3.29018 13.8968 4.6967 15.3033C6.10322 16.7098 8.01088 17.5 10 17.5C11.9891 17.5 13.8968 16.7098 15.3033 15.3033C16.7098 13.8968 17.5 11.9891 17.5 10ZM3.75 10C3.75 8.3424 4.40848 6.75269 5.58058 5.58058C6.75269 4.40848 8.3424 3.75 10 3.75C11.6576 3.75 13.2473 4.40848 14.4194 5.58058C15.5915 6.75269 16.25 8.3424 16.25 10C16.25 11.6576 15.5915 13.2473 14.4194 14.4194C13.2473 15.5915 11.6576 16.25 10 16.25C8.3424 16.25 6.75269 15.5915 5.58058 14.4194C4.40848 13.2473 3.75 11.6576 3.75 10Z"
              fill="#616061"
            />
          </svg>
        </button>
        <button>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.2921 11.775L12.1655 17.9016C10.6025 19.4646 8.06844 19.4646 6.50548 17.9016C4.94251 16.3387 4.94251 13.8046 6.50548 12.2416L12.6321 6.11498C13.6741 5.073 15.3635 5.073 16.4055 6.11498C17.4475 7.15696 17.4475 8.84633 16.4055 9.88831L10.2721 16.015C9.75115 16.536 8.90647 16.536 8.38548 16.015C7.86449 15.494 7.86449 14.6493 8.38548 14.1283L14.0455 8.47498"
              stroke="#616061"
              strokeWidth="0.941892"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={() => {
            if (inputStr !== "") {
              handleSend();
            } else return;
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.3043 13.4656C18.5054 13.3821 18.6391 13.1643 18.6391 12.9207C18.6391 12.677 18.5054 12.4592 18.3043 12.3757L5.45671 7.03521C5.25546 6.95155 5.02974 7.02018 4.89191 7.20695C4.75408 7.39371 4.73357 7.6587 4.8406 7.87002L7.39857 12.9207L4.8406 17.9713C4.73357 18.1826 4.75408 18.4476 4.89191 18.6344C5.02974 18.8211 5.25546 18.8898 5.45671 18.8061L18.3043 13.4656Z"
              fill="#616061"
            />
          </svg>
        </button>
        <button>
          <svg
            width="2"
            height="24"
            viewBox="0 0 2 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 0V24" stroke="#616061" />
          </svg>
        </button>
        <button>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.42857 6L9 9.75L12.5714 6L14 6.75L9 12L4 6.75L5.42857 6Z"
              fill="#616061"
            />
          </svg>
        </button>
        {showPicker && (
          <div className="emoji-picker">
            <Picker
              pickerStyle={{ width: "20vw", marginLeft: "0rem" }}
              onEmojiClick={onEmojiClick}
            />
          </div>
        )}
      </div>
    </ChatInputStyled>
  );
}

const ChatInputStyled = styled.div`
  /* display: flex;
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
  } */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
  height: 94px;
  width: 380px;
  left: 0px;
  top: 0px;
  border-radius: 3px;
  background: #ffffff;
  border: 1px solid #ebebeb;
  margin: 8px 16px 0 8px;
  box-sizing: border-box;
  overflow: hidden;
  input {
    position: relative;
    height: 54px;
    width: 385px;
    left: 13px;
    top: 1px;
    border: none;
    outline: transparent;
    flex: 1;
    border: none;
    ::placeholder {
      /* position: absolute;
      height: 18px;
      width: 165px;
      left: 13px;
      top: 19px; */
      border-radius: 3px;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 18px;
      /* left: 3.27%;
      right: 55.78%;
      top: 30.21%; */
      /* bottom: 60.64%; */
      /* font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px; */
    }
  }
  .tags {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0;
    flex: -1;
    button {
      border: none;
      background-color: #fff;
    }
    button:hover {
      background-color: #e9ecef;
    }
    .btn-test {
      margin-left: 1.3rem;
    }
  }
  .emoji-picker {
    position: absolute;
    top: 5rem;
    right: 2rem;
  }
`;
// const Wrapper = styled.div`
//   display: flex;
//   border: 1px solid #08ffae;
//   background-color: #fff;
//   padding: 0 12px;
//   z-index: 111;

//   .chat-input {
//     flex-grow: 1;
//     height: 48px;
//     border-radius: 0px;
//     font-weight: 500;
//     font-size: 15px;
//     line-height: 18px;
//     border: none;
//     outline: none;
//   }

//   .bold {
//     height: 24px;
//     width: 24px;
//     left: 12px;
//     top: 60px;
//     border-radius: 3px;
//   }
//   .chat-icon-group {
//     flex-basis: 90px;
//     display: flex;
//     justify-content: space-between;
//   }

//   .chat-icon {
//     color: #08ffae;
//     width: 27px;
//     cursor: pointer;
//   }

// `;

export default ChatInput;
