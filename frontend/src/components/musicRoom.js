// @ts-nocheck

import React, { useState } from "react";
import styled from "styled-components";

import RoomHeader from "./roomHeader";
import Playlist from "./playlist";
import Chat from "./chat";

function MusicRoom() {
  const [chat, setChat] = useState(false);

  return (
    <Wrapper chat={chat}>
      <div className="room-main">
        <RoomHeader onChat={() => setChat(!chat)} />
        <Playlist />
      </div>
      <div className="room-chat-container" id={chat ? "show" : ""}>
        <Chat onChat={() => setChat(!chat)} />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  margin: 0;

  .room-main {
    flex-grow: 1;
    margin-right: 10px;
  }

  #show.room-chat-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 1000px) {
    .room-main {
      margin: 0;
    }

    .room-chat-container {
      position: absolute;
      top: 1px;
      display: none;
      margin: 0 0 0 7px;
      background: rgb(240, 240, 240);
    }
  }
`;

export default MusicRoom;
