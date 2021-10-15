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
		setInputStr(prevInput => prevInput + emojiObject.emoji);
		setShowPicker(false);
	};

	// function to display a gif once clicked
	const onGiphyClick = (event, gifObject) => {
		setInputStr(prevInput => prevInput + gifObject.gif);
		setShowGiphy(false);
	};

	const clearInput = () => {
		setInputStr("");
	};

	const handleSend = async () => {
		//sends message to the comments endpoint
		chatService.addChat({
			id: "test", // this will be taken care of by db
			userId: "",
			message: inputStr,
			time: Date.now(),
			name: "",
			avatar: ""
		});

		//clears the current contents of the input box
		clearInput();
	};

	return (
		<InputStyled onClick={handleFocus}>
			<div className="input">
				<textarea
					placeholder="Send a Message to John"
					value={inputStr}
					onKeyPress={e => (e.key === "Enter" ? handleSend() : undefined)}
					onChange={e => setInputStr(e.target.value)}
				/>
			</div>

			<div className="buttons">
				<button>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M12.7768 5.40775C12.9331 5.47559 13.026 5.63834 13.0048 5.80739L12.4347 10.3682H17.6162C17.7651 10.3682 17.9006 10.4543 17.9637 10.5892C18.0269 10.724 18.0064 10.8833 17.911 10.9977L11.6708 18.4859C11.5617 18.6168 11.3794 18.6601 11.2232 18.5923C11.0669 18.5245 10.974 18.3617 10.9952 18.1927L11.5653 13.6318H6.38378C6.23487 13.6318 6.0994 13.5457 6.03624 13.4109C5.97308 13.276 5.99362 13.1168 6.08896 13.0024L12.3292 5.5141C12.4383 5.38322 12.6206 5.33991 12.7768 5.40775ZM7.20315 12.8643H12C12.1101 12.8643 12.2148 12.9116 12.2877 12.9941C12.3605 13.0766 12.3945 13.1864 12.3808 13.2957L11.9191 16.989L16.7968 11.1358H12C11.8899 11.1358 11.7851 11.0885 11.7123 11.006C11.6394 10.9234 11.6055 10.8136 11.6192 10.7044L12.0808 7.01107L7.20315 12.8643Z"
							fill="#616061"
						/>
					</svg>
				</button>
				{/* <div>
          <svg
            width="2"
            height="18"
            viewBox="0 0 2 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1V17" stroke="#B0AFB0" stroke-linecap="round" />
          </svg>
        </div> */}
				<button>
					<svg
						width="14"
						height="14"
						viewBox="0 0 14 14"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M2.37988 2.3333C2.37988 2.03685 2.62021 1.79652 2.91666 1.79652H7.58333C9.16845 1.79652 10.4534 3.08152 10.4534 4.66664C10.4534 6.25176 9.16845 7.53675 7.58333 7.53675H2.91666C2.62021 7.53675 2.37988 7.29643 2.37988 6.99997V2.3333ZM3.45344 2.87008V6.46319H7.58333C8.57554 6.46319 9.37988 5.65885 9.37988 4.66664C9.37988 3.67443 8.57554 2.87008 7.58333 2.87008H3.45344Z"
							fill="#616061"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M2.37988 6.99996C2.37988 6.70351 2.62021 6.46318 2.91666 6.46318H8.16666C9.75178 6.46318 11.0368 7.74817 11.0368 9.33329C11.0368 10.9184 9.75178 12.2034 8.16666 12.2034H2.91666C2.62021 12.2034 2.37988 11.9631 2.37988 11.6666V6.99996ZM3.45344 7.53674V11.1298H8.16666C9.15887 11.1298 9.96322 10.3255 9.96322 9.33329C9.96322 8.34108 9.15887 7.53674 8.16666 7.53674H3.45344Z"
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
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M5.29651 2.33332C5.29651 2.03686 5.53683 1.79654 5.83329 1.79654H11.0833C11.3797 1.79654 11.6201 2.03686 11.6201 2.33332C11.6201 2.62977 11.3797 2.8701 11.0833 2.8701H5.83329C5.53683 2.8701 5.29651 2.62977 5.29651 2.33332Z"
							fill="#616061"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M2.37976 11.6666C2.37976 11.3702 2.62009 11.1299 2.91654 11.1299H8.16654C8.463 11.1299 8.70332 11.3702 8.70332 11.6666C8.70332 11.9631 8.463 12.2034 8.16654 12.2034H2.91654C2.62009 12.2034 2.37976 11.9631 2.37976 11.6666Z"
							fill="#616061"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
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
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M8.44913 2.12448C9.96586 0.60639 12.3768 0.6281 13.8678 2.17327C15.3589 3.71844 15.3798 6.21688 13.9149 7.78867L13.9077 7.79645L11.9489 9.82621C11.9489 9.82623 11.9489 9.82618 11.9489 9.82621C11.156 10.6481 10.0576 11.0728 8.93895 10.9898C7.82026 10.9067 6.79153 10.3243 6.11974 9.39358C5.92098 9.11822 5.97526 8.72802 6.24098 8.52205C6.50669 8.31608 6.88322 8.37233 7.08198 8.64769C7.54493 9.28907 8.25386 9.69045 9.02479 9.74767C9.79571 9.80489 10.5526 9.51229 11.099 8.94583L13.054 6.91986C14.0601 5.83647 14.0445 4.11742 13.0181 3.05381C11.9916 1.98999 10.3323 1.97405 9.2869 3.01721L8.16709 4.17092C7.93177 4.41336 7.55136 4.41221 7.3174 4.16835C7.08345 3.92449 7.08456 3.53026 7.31988 3.28782L8.44913 2.12448Z"
							fill="#616061"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M4.0512 6.17371C4.8441 5.35177 5.9424 4.92722 7.06105 5.01025C8.17974 5.09327 9.20847 5.67572 9.88026 6.60642C10.079 6.88178 10.0247 7.27197 9.75902 7.47794C9.49331 7.68391 9.11678 7.62766 8.91802 7.3523C8.45507 6.71093 7.74614 6.30954 6.97521 6.25233C6.20429 6.19511 5.44739 6.4877 4.90097 7.05417L2.94597 9.08012C1.93993 10.1635 1.9555 11.8826 2.98186 12.9462C4.00822 14.0098 5.66706 14.0259 6.7125 12.9834L7.82514 11.8303C8.05977 11.5872 8.44019 11.5872 8.67483 11.8303C8.90946 12.0735 8.90946 12.4677 8.67483 12.7109L7.55093 13.8756C6.0342 15.3936 3.62322 15.3719 2.13217 13.8267C0.641128 12.2815 0.620178 9.7831 2.08509 8.21132L2.09234 8.20354L4.0512 6.17371C4.05117 6.17374 4.05122 6.17369 4.0512 6.17371Z"
							fill="#616061"
						/>
					</svg>
				</button>
				<button>
					<svg
						width="16"
						height="15"
						viewBox="0 0 16 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M4.55688 3.75C4.55688 3.47994 4.77582 3.261 5.04589 3.261H13.2457C13.5157 3.261 13.7347 3.47994 13.7347 3.75C13.7347 4.02007 13.5157 4.23901 13.2457 4.23901H5.04589C4.77582 4.23901 4.55688 4.02007 4.55688 3.75Z"
							fill="#616061"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M4.55688 7.49994C4.55688 7.22987 4.77582 7.01094 5.04589 7.01094H13.2457C13.5157 7.01094 13.7347 7.22987 13.7347 7.49994C13.7347 7.77001 13.5157 7.98895 13.2457 7.98895H5.04589C4.77582 7.98895 4.55688 7.77001 4.55688 7.49994Z"
							fill="#616061"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M4.55688 11.2499C4.55688 10.9799 4.77582 10.7609 5.04589 10.7609H13.2457C13.5157 10.7609 13.7347 10.9799 13.7347 11.2499C13.7347 11.52 13.5157 11.7389 13.2457 11.7389H5.04589C4.77582 11.7389 4.55688 11.52 4.55688 11.2499Z"
							fill="#616061"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M3.01196 3.75C3.01196 3.47994 2.79303 3.261 2.52296 3.261H1.89221C1.62214 3.261 1.40321 3.47994 1.40321 3.75C1.40321 4.02007 1.62214 4.23901 1.89221 4.23901H2.52296C2.79303 4.23901 3.01196 4.02007 3.01196 3.75Z"
							fill="#616061"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M3.01196 7.49994C3.01196 7.22987 2.79303 7.01094 2.52296 7.01094H1.89221C1.62214 7.01094 1.40321 7.22987 1.40321 7.49994C1.40321 7.77001 1.62214 7.98895 1.89221 7.98895H2.52296C2.79303 7.98895 3.01196 7.77001 3.01196 7.49994Z"
							fill="#616061"
						/>
						<path
							d="M2.52295 11.25H1.8922"
							stroke="#616061"
							stroke-width="0.978006"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<button className="btn-divider">
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M10.7734 8.07351C10.7734 9.6192 9.53174 10.8722 8.00011 10.8722C6.46849 10.8722 5.22686 9.6192 5.22686 8.07351C5.22686 6.52782 6.46849 5.27479 8.00011 5.27479C9.53174 5.27479 10.7734 6.52782 10.7734 8.07351ZM10.7734 8.07351L10.7734 8.77319C10.7734 9.93246 11.7047 10.8722 12.8534 10.8722C14.0021 10.8722 14.9333 9.93246 14.9333 8.77319V8.07351C14.9331 4.82204 12.7134 1.99919 9.57584 1.26025C6.43825 0.521304 3.20973 2.06103 1.78343 4.97654C0.35713 7.89206 1.10897 11.4149 3.59809 13.4794C6.0872 15.5439 9.65755 15.6059 12.2155 13.629"
							stroke="#616061"
							stroke-width="0.941892"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<button>
					<svg
						width="15"
						height="16"
						viewBox="0 0 15 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M14.2921 7.77478L8.16548 13.9014C6.60251 15.4644 4.06844 15.4644 2.50548 13.9014C0.94251 12.3385 0.94251 9.80441 2.50548 8.24145L8.63214 2.11478C9.67412 1.0728 11.3635 1.0728 12.4055 2.11478C13.4475 3.15676 13.4475 4.84614 12.4055 5.88811L6.27214 12.0148C5.75115 12.5358 4.90647 12.5358 4.38548 12.0148C3.86449 11.4938 3.86449 10.6491 4.38548 10.1281L10.0455 4.47478"
							stroke="#616061"
							stroke-width="0.941892"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<button onClick={() => setShowPicker(val => !val)}>
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
				<button
					onClick={() => {
						if (inputStr !== "") {
							handleSend();
						} else return;
					}}
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M14.3043 9.46564C14.5054 9.38207 14.6391 9.16435 14.6391 8.92065C14.6391 8.67696 14.5054 8.45924 14.3043 8.37567L1.45671 3.03521C1.25546 2.95155 1.02974 3.02018 0.891909 3.20695C0.754076 3.39371 0.733571 3.6587 0.8406 3.87002L3.39857 8.92065L0.8406 13.9713C0.733571 14.1826 0.754076 14.4476 0.891909 14.6344C1.02974 14.8211 1.25546 14.8898 1.45671 14.8061L14.3043 9.46564Z"
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
		</InputStyled>
	);
}

const InputStyled = styled.div`
	/* height: 94px;
  width: 399px;
  border-radius: 3px;
  left: 0%;
  right: -0.25%;
  top: 0%;
  bottom: 0%;
  background: #ffffff;
  border: 1px solid #ebebeb;
  box-sizing: border-box;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
  box-sizing: border-box; */
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
	width: 100%;

	textarea {
		position: relative;
		border: none;
		outline: none;
		width: 390px;
		/* height: 54px; */

		::placeholder {
			position: absolute;
			margin: 18px 0 18px 12px;
			resize: none;
			font-family: Lato;
			font-style: normal;
			font-weight: normal;
			font-size: 15px;
			line-height: 18px;
		}
	}
	textarea::-webkit-scrollbar {
		display: none;
	}

	.buttons {
		display: flex;
		flex-wrap: wrap;
		padding: 0;
		flex: -1;
		margin-top: 20px;
		padding-left: 12px;
		overflow: hidden;

		.line {
			position: absolute;
			height: 17px;
			width: 0px;
			left: 55px;
			top: 64px;
			border-radius: 0px;
			border: 1px solid #b0afb0;
		}
		button {
			border: none;
			background-color: #fff;
			transition: all 0.3s;
			margin-right: 8px;
		}
		button:hover {
			background-color: #e9ecef;
		}

		.btn-divider {
			margin-left: 8rem;
		}
	}
	.emoji-picker {
		position: absolute;
		top: 9rem;
		right: 3rem;
	}
`;

export default ChatInput;
