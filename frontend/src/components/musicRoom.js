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
      <Chat />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;

  .room-main {
    flex-grow: 1;
    margin-right: 10px;
  }
`;

export default MusicRoom;
