import styled from "styled-components";

import Playlist from "./playlist";
import Chat from "./chat";
import PasteUrl from "./common/pasteUrl";
import { ToastContainer, Flip } from "react-toastify";

function MusicRoom() {
  return (
    <Wrapper>
      <PasteUrl />

      <div className="room-main">
        <div className="toast-holder">
          <ToastContainer
            theme="colored"
            autoClose={3000}
            hideProgressBar={true}
            toastClassName="toast-wrapper"
            bodyClassName="toast-body"
            transition={Flip}
            limit={1}
          />
        </div>

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

  .room-main {
    overflow: hidden;
    position: relative;
    flex-grow: 1;
    margin-right: 10px;
  }

  .toast-holder {
    position: relative;
    display: flex;
    justify-content: center;
  }

  .Toastify__toast-container {
    width: 100%;
    position: absolute;
    top: 1px;
    left: 5px;

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

  @media screen and (max-width: 1000px) {
    justify-content: center;
    align-items: center;

    .room-main {
      margin: 0;
      flex-grow: 1;
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
