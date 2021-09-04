import React from "react";
import styled from "styled-components";

import Playlist from "./playlist";
import RoomHeader from "./roomHeader";

function MusicRoom() {
  return (
    <Wrapper>
      <RoomHeader />
      <Playlist />
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default MusicRoom;
