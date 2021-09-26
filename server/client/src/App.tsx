import { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Loader from "react-loader-spinner";

import RoomHeader from "./components/roomHeader";
import MusicRoom from "./components/musicRoom";

import chatMediaQuery from "./utils/chatMedia";

import { uiSelect } from "./store/uiSlice";
import eventService from "./services/eventService";

import "moment-timezone";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./App.css";

import Chat from "./components/chat";
import UserInfo from "./components/userInfo";

function App() {
  useEffect(() => {
    eventService.connect();
    chatMediaQuery(); // toggle chat display based on screen size.
  }, []);

  const isLoading = useSelector(uiSelect.isLoading);

  return (
    <Wrapper>
      <UserInfo />

      <div className="loader-wrapper">
        {isLoading && (
          <Loader
            visible
            type="BallTriangle"
            color="#27ae60"
            height={80}
            width={80}
          />
        )}
      </div>

      <div className="room-container">
        <RoomHeader />

        <MusicRoom />
      </div>
      <div className="room-chat-container">
        <Chat />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  padding: 0;

  & > * {
    flex-grow: 1;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    width: 6px;
    background-color: #00b87c;
  }

  .loader-wrapper {
    position: absolute;
    top: 100px;
    z-index: 111;
  }

  .room-chat-container {
    flex-grow: 0;
    background-color: transparent !important;
  }

  @media screen and (max-width: 1000px) {
    justify-content: center;

    .room-chat-container {
      position: fixed;
      top: 43px;
      background: rgb(240, 240, 240);
      flex-basis: 40%;
      display: flex;
      justify-content: center;
      z-index: 115;
    }
  }
`;

export default App;
