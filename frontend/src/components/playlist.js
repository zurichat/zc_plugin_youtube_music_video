import React from "react";
import styled from "styled-components";

import PlaylistHeader from "./common/playlistHeader";

function Playlist() {
  return (
    <Wrapper>
      <PlaylistHeader />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #fff;
  padding: 20px;
`;

export default Playlist;
