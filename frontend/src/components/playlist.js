import React from "react";
import styled from "styled-components";
import PlaylistItem from './common/playlistItem';
import PlaylistHeader from "./common/playlistHeader";

function Playlist() {
  return (
    <Wrapper>
      <PlaylistHeader />
      <PlaylistItem/>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #fff;
  padding: 20px;
`;

export default Playlist;
