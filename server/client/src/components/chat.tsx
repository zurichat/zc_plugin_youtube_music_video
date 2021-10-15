import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import ChatHeader from "./common/chatHeader";
import ChatItem from "./common/chatItem";
import ChatInput from "./common/chatInput";

import { chatSelect, chatDispatch } from "../store/chatsSlice";
import { uiSelect } from "../store/uiSlice";
import { syncArray } from "../utils/syncArray";
import chatService from "../services/chatService";
import User from "../types/user";
import userService from "../services/userService";

function Chat(props) {
	const chats = useSelector(chatSelect.allChat);
	const showChat = useSelector(uiSelect.showChat);
	const scroller = useRef(null);
	//const [ chats, setChats] = useState(chat);

	/*useEffect( () => {
    setChats(syncArray(chats, chat));
    console.log(chats);
    console.log(chat);
  }, [chat]);*/

	const scrollToBottom = () => {
		scroller.current.scrollIntoView(false);
	};

	const [workspaceUsers, setWorkspaceUsers] = useState([] as User[]);

	useEffect(() => {
		userService.getWorkspaceUsers().then(setWorkspaceUsers).catch(console.log);
	}, []);

	useEffect(() => {
		if (showChat) {
			scrollToBottom();
		}
	});

	if (!showChat) return null;

	function handleFocus() {
		const mediaQuery = window.matchMedia("(max-width: 1000px)");
		const mediaQueryPhone = window.matchMedia("(max-width: 450px)");
		const chatItemGroup =
			document.querySelector<HTMLElement>(".chat-item-group");
		const chatWrapper = document.querySelector<HTMLElement>(".chat-wrapper");

		if (mediaQueryPhone.matches) {
			chatItemGroup.style.maxHeight = "180px";
			chatWrapper.style.position = "fixed";
			chatWrapper.style.top = "40px";
		} else if (mediaQuery.matches) {
			chatItemGroup.style.maxHeight = "200px";
			chatWrapper.style.position = "fixed";
			chatWrapper.style.top = "60px";
		}
	}

	function handleBlur() {
		const mediaQuery = window.matchMedia("(max-width: 1000px)");

		const chatItemGroup =
			document.querySelector<HTMLElement>(".chat-item-group");

		const chatWrapper = document.querySelector<HTMLElement>(".chat-wrapper");

		if (mediaQuery.matches) {
			chatItemGroup.style.maxHeight = "450px";
			chatWrapper.style.position = "fixed";
			chatWrapper.style.top = "70px";
		}
	}

	const Cancel = (id, message) => {
		const test = chats.find(chat => chat.id === id && chat.message === message);
		let list = [];
		chats.map(ch => {
			if (ch.message !== test.message) list.push(ch);
		});
		//setChats(newchats);
		chatDispatch.set(list);
	};

	const Resend = (id, message) => {
		let test = chats.find(chat => chat.id === id && chat.message === message);
		let list = [];
		chats.map(ch => {
			if (ch.message !== test.message) list.push(ch);
		});
		//setChats(newchats);
		chatDispatch.set(list);
		chatService.addChat({ ...test, failed: false });
	};

	const items = chat => {
		const y = {
			onCancel: Cancel,
			onResend: Resend,
			...chat
		};
		return y;
	};

	return (
		<Wrapper className="chat-wrapper">
			<ChatHeader />

			<div className="chat-item-group">
				{chats.map((chat, index) => (
					<ChatItem key={index} {...items(chat)} users={workspaceUsers} />
				))}

				<div className="scroller" ref={scroller}></div>
			</div>
			<ChatInput handleFocus={handleFocus} handleBlur={handleBlur} />
		</Wrapper>
	);
}

const Wrapper = styled.div`
	height: 100%;
	max-width: 400px;
	background: white;
	box-shadow: 1px 3px 5px #b4b2b2;
	position: relative;
	z-index: 100;

	.chat-item-group {
		flex-grow: 1;
		overflow-y: scroll;
		min-height: 121px;
		padding-left: 16px;
		padding-right: 30px;
		margin-top: 24px;
		height: 440px;
	}

	.chat-item-group::-webkit-scrollbar {
		width: 3px;
	}
	.chat-item-group::-webkit-scrollbar-thumb {
		background-color: hsla(160, 100%, 36%, 1);
		width: 3px;
	}

	@media (max-width: 1000px) {
		margin: 0 30px;

		.chat-item-group {
			background-color: white;
		}
	}

	@media (max-width: 400px) {
		width: 350px;
		background: white;
	}
`;

export default Chat;
