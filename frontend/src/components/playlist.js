import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { selectAllSongs } from "../store/songsSlice";

import Player from "./player";
import PlaylistHeader from "./common/playlistHeader";
import PlaylistItem from "./common/playlistItem";
import EmptyScreen from "./common/emptyScreen";

function Playlist() {
  const [player, setPlayer] = useState(false);
  const songs = useSelector(selectAllSongs);

  const handleLike = (song) => {};

  return (
    <Wrapper>
      <PlaylistHeader onPlay={() => setPlayer(!player)} />
      <Player play={player} />
      <div className="playlist-item-group">
        {songs.length === 0 && <EmptyScreen />}
        {songs.map((song, index) => (
          <PlaylistItem key={index} {...song} onLike={() => handleLike(song)} />
        ))}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  overflow-y: scroll;
  background: #fff;
  padding: 20px;
  height: 540px;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #00b87c;
  }

  @media (max-width: 500px) {
    height: 1600px;
  }

  @media (max-width: 370px) {
    padding: 5px;
  }
`;

export default Playlist;
