import { useEffect } from "react";
import styled from "styled-components";

import MusicRoom from "./components/musicRoom";
import DeleteModal from "./components/deleteModal";

import chatMediaQuery from "./utils/chatMedia";

import eventService from "./services/eventService";

import "moment-timezone";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./App.css";

function App() {
	useEffect(() => {
		eventService.connect();
		chatMediaQuery(); // toggle chat display based on screen size.
	}, []);

	return (
		<Wrapper>
			<DeleteModal />

			<MusicRoom />
		</Wrapper>
	);
}

const Wrapper = styled.div`
	box-sizing: border-box;
	position: relative;
	margin: 0;
	padding: 0;
	background: black;
	height: 100%;
	overflow: hidden;

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
