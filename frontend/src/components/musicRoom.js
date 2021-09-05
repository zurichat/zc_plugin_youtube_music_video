import React from "react";
import styled from "styled-components";

import RoomHeader from "./roomHeader";
import Playlist from "./playlist";
import Chat from "./chat";

function MusicRoom() {
  return (
    <Wrapper>
      <RoomHeader />
      <Playlist />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* display: flex; */
`;

export default MusicRoom;
