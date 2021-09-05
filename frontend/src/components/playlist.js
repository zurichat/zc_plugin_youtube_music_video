// @ts-nocheck

import React, { useState } from "react";
import styled from "styled-components";

import Player from "./player";

import PlaylistHeader from "./common/playlistHeader";
import PlaylistItem from "./common/playlistItem";

import albumCover from "../media/listAlbumCover.svg";
import customCover from "../media/customCover.svg";

const song = {
  id: "2",
  title: "Essence (ft Tems) - Wizkid",
  addedBy: "smoothice",
  duration: 4.05,
  liked: false,
  albumCover,
  likes: 340,
};

const custom = {
  id: "3",
  title: "Team Pythagoras (ft Imhade) - Vincent",
  addedBy: "Justice",
  duration: 3.05,
  liked: true,
  albumCover: customCover,
  likes: 300,
};

function Playlist() {
  const [player, setPlayer] = useState(false);
  const [songs, setSongs] = useState([custom, song, { ...song, id: "1" }]);

  const handleLike = (song) => {
    const index = songs.indexOf(song);
    const list = [...songs];
    list[index] = { ...song, liked: !song.liked };
    setSongs(list);
  };

  return (
    <Wrapper>
      <PlaylistHeader />
      {player && <Player />}
      <div className="playlist-item-group">
        {songs.map((song, index) => (
          <PlaylistItem key={index} {...song} onLike={() => handleLike(song)} />
        ))}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #fff;
  padding: 20px;

  .playlist-item-group {
    background-color: rgb(240, 240, 240);
  }

  @media (max-width: 370px) {
    padding: 5px;
  }
`;

export default Playlist;
