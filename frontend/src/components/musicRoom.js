import React from "react";
import styled from "styled-components";

import RoomHeader from "./roomHeader";
import Playlist from "./playlist";
import Chat from "./chat";

function MusicRoom() {
  return (
    <Wrapper>
      <div className="room-main">
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

  .room-main {
    overflow: hidden;
    position: relative;
    flex-grow: 1;
    margin-right: 10px;
  }

  @media screen and (max-width: 1000px) {
    justify-content: center;
    align-items: center;

    .room-main {
      margin: 0;
    }

    .room-chat-container {
      position: absolute;
      top: 31px;
      background: rgb(240, 240, 240);
      width: 347px;
      display: flex;
      justify-content: center;
    }
  }
`;

export default MusicRoom;
