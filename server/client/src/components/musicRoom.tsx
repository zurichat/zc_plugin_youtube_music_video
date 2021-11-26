import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import Parcel from "single-spa-react/parcel";
import { pluginHeader, headerConfig } from "../utils/config";
import Playlist from "./playlist";
import PasteUrl from "./common/pasteUrl";
import EnterRoomModal from "./modals/enterRoom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectShowPasteUrl } from "../app/uiSlice";
import { useEffect, useState } from "react";
import userService from "../services/userService";
// import MessageBoard from "./messageBoard";
import { selectIsMember, setMembership } from "../app/usersSlice";
import eventService from "../services/eventService";

function MusicRoom() {
	const [members, setMembers] = useState([] as User[]);
	const [reload, setReload] = useState(false);

	const showPasteUrl = useAppSelector(selectShowPasteUrl);
	const isMember = useAppSelector(selectIsMember);

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

		eventService.connect();
	}, []);

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

				<div>
					<Playlist />
				</div>
			</div>

			{/* <div className="room-chat-container">
				<MessageBoard />
			</div> */}
		</Wrapper>
	);
}

const Wrapper = styled.div<{ overflowMain: boolean }>`
	position: relative;
	box-sizing: border-box;
	display: flex;
	margin: 0;
	min-height: 100vh;
	max-height: 100vh;

	.plugin-header {
		position: absolute;
		top: -1px;
		left: -1px;
		flex-grow: 1;
		border: 1px solid red;
		z-index: 999;
	}

	.room-main {
		flex-grow: 1;
		overflow-y: ${props => (props.overflowMain ? "hidden" : "scroll")};
		position: relative;
		margin-right: 10px;
	}

	.room-chat-container {
		position: relative;
		margin: 5px 5px 0 0;
		width: 500px;
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
