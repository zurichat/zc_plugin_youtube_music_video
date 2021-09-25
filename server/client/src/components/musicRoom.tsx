import React from "react";
import styled from "styled-components";

import Playlist from "./playlist";
import Chat from "./chat";

function MusicRoom() {
  return (
    <Wrapper>
      <div className="room-main">
        <Playlist />
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
  }
`;

export default MusicRoom;
