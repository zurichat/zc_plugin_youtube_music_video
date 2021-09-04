// @ts-nocheck

import React from "react";
import styled from "styled-components";

import PlaylistHeader from "./common/playlistHeader";
import PlaylistItem from "./common/playlistItem";

import albumCover from "../media/listAlbumCover.svg";
import customCover from "../media/customCover.svg";

function Playlist() {
  const song = {
    title: "Essence (ft Tems) - Wizkid",
    addedBy: "smoothice",
    duration: 4.05,
    liked: false,
    albumCover,
  };

  const custom = {
    title: "Team Pythagoras (ft Imhade) - Vincent",
    addedBy: "Justice",
    duration: 3.05,
    liked: true,
    albumCover: customCover,
  };

  return (
    <Wrapper>
      <PlaylistHeader />
      <PlaylistItem {...custom} />
      <PlaylistItem {...song} />
      <PlaylistItem {...song} />
      <PlaylistItem {...song} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #fff;
  padding: 20px;
`;

export default Playlist;
