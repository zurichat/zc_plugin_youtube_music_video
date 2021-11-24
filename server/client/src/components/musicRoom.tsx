import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import Parcel from "single-spa-react/parcel";
import { pluginHeader, headerConfig } from "../utils/config";
import { MessageBoard } from "@zuri/zuri-ui";
import Playlist from "./playlist";
import PasteUrl from "./common/pasteUrl";
import EnterRoomModal from "./modals/enterRoom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectShowPasteUrl } from "../app/uiSlice";
import { useEffect, useMemo, useState } from "react";
import userService from "../services/userService";
// import { chatData } from "../utils/mockdata";
import {
	selectCurrentUser,
	selectIsMember,
	setCurrentUser,
	setMembership
} from "../app/usersSlice";
import chatService from "../services/chatService";
import eventService from "../services/eventService";

function MusicRoom() {
	const [members, setMembers] = useState([] as User[]);
	const [reload, setReload] = useState(false);

	const showPasteUrl = useAppSelector(selectShowPasteUrl);
	const isMember = useAppSelector(selectIsMember);
	const user = useAppSelector(selectCurrentUser);

	const dispatch = useAppDispatch();

	useEffect(() => {
		userService.getMembers().then(setMembers).catch(console.log);
		userService
			.isMember()
			.then(value => dispatch(setMembership(value)))
			.catch(console.log);
	}, [reload, isMember]);

	useEffect(() => {
		// userService.getCurrentUser().then(user => dispatch(setCurrentUser(user)));

		try {
			eventService.connect();

			chatService.addChat({
				id: Date.now() + "",
				username: user.name,
				userId: user.id,
				time: Date.now(),
				imageUrl: user.avatar,
				emojies: [],
				richUiData: {
					blocks: [
						{
							data: {},
							depth: 1,
							entityRanges: [],
							inlineStyleRanges: [],
							key: "key",
							text: "a text",
							type: "type"
						}
					],
					entityMap: {}
				}
			});

			chatService.deleteChat("618fc4d6b350ab40022ac8a7");
		} catch (error) {
			console.log("comment error", error);
		}
	}, []);

	const chatSidebarConfig = {
		chatHeader: "Chats",
		showChatSideBar: true,

		sendChatMessageHandler: msg => {
			alert(`${msg} here`);
			console.log({ msg }, " here");
		},

		currentUserData: {
			username: "Aleey",
			imageUrl: ""
		},

		messages: []
	};

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

				<Playlist />
			</div>

			<div className="room-chat-container">
				<MessageBoard chatsConfig={chatSidebarConfig} />
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.div<{ overflowMain: boolean }>`
	position: relative;
	box-sizing: border-box;
	display: flex;
	margin: 0;
	min-height: 94vh;
	max-height: 94vh;

	.plugin-header {
		position: sticky;
		top: 0px;
		z-index: 1111;
	}

	.room-main {
		flex-grow: 1;
		overflow-y: ${props => (props.overflowMain ? "hidden" : "scroll")};
		position: relative;
		margin-right: 10px;
		background-color: white;
	}

	.room-chat-container {
		position: relative;
		background-color: white !important;
		margin: 5px 5px 0 0;
		width: 600px;
		border: 2px solid red;
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
			/* display: none; */
			flex-basis: 40%;
			z-index: 111;
			max-height: 400px;
		}
	}
`;

export default MusicRoom;
