import styled from "styled-components";
import { ToastContainer } from "react-toastify";

import Playlist from "./playlist";
import RoomHeader from "./roomHeader";
import PasteUrl from "./common/pasteUrl";
import Chat from "./chat";

function MusicRoom() {
  return (
    <Wrapper>
      <div className="room-main">
        <PasteUrl />

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

        <RoomHeader />
        <Playlist />
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
  margin: 0;
  background-color: rgb(240, 240, 240);
  height: 100vh;
  max-height: 100vh;

  .room-main {
    flex-grow: 1;
    overflow-y: scroll;
    position: relative;
    margin-right: 10px;
    background-color: white;
  }

  .room-main::-webkit-scrollbar {
    width: 5px;
  }

  .room-main::-webkit-scrollbar-thumb {
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
      top: 70px;
      background: rgb(240, 240, 240);
      flex-basis: 40%;
      display: flex;
      justify-content: center;
      z-index: 111;
    }
  }
`;

export default MusicRoom;
