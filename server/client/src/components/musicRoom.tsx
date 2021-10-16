import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import Parcel from "single-spa-react/parcel";

// @ts-ignore
// import { AddUserModal } from "@zuri/manage-user-modal";
// import { addModalConfig } from "../utils/config";

import { pluginHeader, headerConfig } from "../utils/config";

// @ts-ignore
// import { MessageBoard } from "@zuri/zuri-ui";

// import RoomHeader from "./roomHeader";
import Playlist from "./playlist";
import Chat from "./chat";
import PasteUrl from "./common/pasteUrl";
import EnterRoomModal from "./modals/enterRoom";

import { useDispatch, useSelector } from "react-redux";
import { uiSelect } from "../store/uiSlice";
import User from "../types/user";
import { useEffect, useMemo, useState } from "react";
import userService from "../services/userService";
import { chatData } from "../utils/mockdata";
import { userDispatch, userSelect } from "../store/usersSlice";

function MusicRoom() {
	const [members, setMembers] = useState([] as User[]);
	const [reload, setReload] = useState(false);

	const showPasteUrl = useSelector(uiSelect.showPasteUrl);
	const isMember = useSelector(userSelect.isMember);

	const dispatch = useDispatch();

	useEffect(() => {
		userService.getMembers().then(setMembers).catch(console.log);
		userService.isMember().then(userDispatch.setMembership).catch(console.log);
	}, [reload, isMember]);

	const handleCreateRoomMessages = message => {
		console.log("creating a message", message);
	};

	const chatSidebarConfig = useMemo(
		() => ({
			sendChatMessageHandler: msg => {
				dispatch(handleCreateRoomMessages(msg));
			},
			currentUserData: {
				username: "Aleey",
				imageUrl: ""
			},
			messages: chatData(),

			showChatSideBar: true,
			chatHeader: "Chats"
		}),
		[]
	);

	return (
		<Wrapper overflowMain={showPasteUrl}>
			<div className="room-main">
				{/* Modals */}
				<PasteUrl />
				<EnterRoomModal isMember={isMember} />

				<div className="toast-holder">
					<ToastContainer
						position="top-center"
						theme="colored"
						autoClose={3000}
						hideProgressBar={true}
						toastClassName="toast-wrapper"
						bodyClassName="toast-body"
					/>
				</div>

				<div className="plugin-header">
					<Parcel
						config={pluginHeader}
						wrapWith="div"
						wrapStyle={{ width: "100%" }}
						headerConfig={headerConfig(members, () => setReload(!reload))}
					/>
				</div>

				{/* <RoomHeader /> */}

				<Playlist />
			</div>

			<div className="room-chat-container">
				<Chat />
				{/* <MessageBoard chatsConfig={chatSidebarConfig} /> */}
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.div<{ overflowMain: boolean }>`
	position: relative;
	box-sizing: border-box;
	display: flex;
	margin: 0;
	background-color: rgb(240, 240, 240);
	min-height: 94vh;
	max-height: 94vh;

	.plugin-header {
		position: sticky;
		top: 0px;
		z-index: 100;
	}

	.room-main {
		flex-grow: 1;
		overflow-y: ${props => (props.overflowMain ? "hidden" : "scroll")};
		position: relative;
		margin-right: 10px;
		background-color: white;
	}

	.room-chat-container {
		margin-top: 5px;
	}

	.room-main::-webkit-scrollbar,
	.room-chat-container::-webkit-scrollbar {
		width: 5px;
	}

	.room-main::-webkit-scrollbar-thumb,
	.room-chat-container::-webkit-scrollbar-thumb {
		width: 6px;
		background-color: #00b87c;
	}

	.toast-holder {
		position: relative;
		display: flex;
		justify-content: center;
		flex-grow: 1;
	}

	.Toastify__toast-container {
		position: absolute;
		top: 1px;
		width: 100%;
		right: 1px;

		.Toastify__toast--success {
			background-color: #cbffee;
			color: black;
			display: flex;
			justify-content: center;
		}

		.Toastify__toast--error {
			background: #fff1f3;
			color: red;
			display: flex;
			justify-content: center;
		}

		.toast-body {
			display: flex;
			justify-content: center;
		}
	}

	@media screen and (max-width: 1120px) {
		justify-content: center;

		.room-main {
			margin: 0;
		}

		.room-chat-container {
			position: fixed;
			top: 40px;
			// background: rgb(240, 240, 240);
			background: none;
			flex-basis: 40%;
			display: flex;
			justify-content: center;
			z-index: 111;
			max-height: 400px;
		}
	}
`;

export default MusicRoom;
