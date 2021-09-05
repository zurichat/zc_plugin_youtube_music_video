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
};

const custom = {
  id: "3",
  title: "Team Pythagoras (ft Imhade) - Vincent",
  addedBy: "Justice",
  duration: 3.05,
  liked: true,
  albumCover: customCover,
};

function Playlist() {
  const [player, setPlayer] = useState(true);
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
      <div>
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
`;

export default Playlist;
