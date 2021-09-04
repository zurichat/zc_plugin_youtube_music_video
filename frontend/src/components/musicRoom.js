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

const Wrapper = styled.div`
  /* background: grey; */
  /* height: 400px; */
`;

export default MusicRoom;
