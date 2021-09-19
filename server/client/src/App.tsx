import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

import RoomHeader from "./components/roomHeader";
import MusicRoom from "./components/musicRoom";
import EnterRoom from "./components/Modals/EnterRoom";

import chatMediaQuery from "./utils/chatMedia";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "moment-timezone";

function App() {
  chatMediaQuery(); // toggle chat display based on screen size.
  const [showModal, setShowModal] = useState(true);

  return (
    <Wrapper>
      <ToastContainer theme="colored" />

      {showModal && <EnterRoom setShowModal={setShowModal} />}

      <RoomHeader />
      <MusicRoom />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* overflow-y: scroll; */
  padding: 10px;
  height: 100vh;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    width: 6px;
    background-color: #00b87c;
  }

  @media (max-width: 600px) {
    padding: 0;
    margin: 0;
  }
`;

export default App;
