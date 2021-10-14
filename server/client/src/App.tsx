import { useEffect, useState } from "react";
import styled from "styled-components";

import MusicRoom from "./components/musicRoom";
import MemberList from "./components/memberList";
import DeleteModal from "./components/deleteModal";

import chatMediaQuery from "./utils/chatMedia";

import eventService from "./services/eventService";
import userService from "./services/userService";

import Parcel from "single-spa-react/parcel";
// @ts-ignore
import { AddUserModal } from "@zuri/manage-user-modal";
import { addModalConfig } from "./utils/config";

import "moment-timezone";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./App.css";
import User from "./types/user";

function App() {
	const [users, setUsers] = useState([] as User[]);
	const [addUserModal, setAddUserModal] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				eventService.connect();
				chatMediaQuery(); // toggle chat display based on screen size.

				// userService.getUsers();
				// userService.addUserToRoom();

				const users = await userService.getWorkspaceUsers();
				setUsers(users);
			} catch (error) {
				console.log(error.message);
			}
		})();
	}, []);

	return (
		<Wrapper>
			<DeleteModal />

			<MemberList />

			{addUserModal && users.length > 0 && (
				<Parcel
					config={AddUserModal}
					wrapWith="div"
					parcelConfig={addModalConfig({
						users,
						togglePopup: () => setAddUserModal(false)
					})}
				/>
			)}

			<MusicRoom />
		</Wrapper>
	);
}

const Wrapper = styled.div`
	position: relative;
	margin: 0;
	padding: 0;

	/* &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    width: 6px;
    background-color: #00b87c;
  } */

	.loader-wrapper {
		position: absolute;
		top: 100px;
		z-index: 111;
	}
`;

export default App;
