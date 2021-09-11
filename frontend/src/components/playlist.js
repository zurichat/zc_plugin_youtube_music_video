// @ts-nocheck

import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Player from "./player";

import PlaylistHeader from "./common/playlistHeader";
import PlaylistItem from "./common/playlistItem";

import customCover from "../media/customCover.svg";

import getSongs from "../mock-data/songs";

import { selectAllSongs } from "../features/songsSlice";

const custom = {
  id: "3kfkfk",
  title: "Team Pythagoras (ft Imhade) - Vincent",
  addedBy: "Justice",
  duration: "3:05",
  liked: true,
  albumCover: customCover,
  likes: 300,
};

function Playlist() {
  const [songs, setSongs] = useState([custom, ...getSongs()]);
  const allSongs = useSelector(selectAllSongs);

  const handleLike = (song) => {
    const index = songs.indexOf(song);
    const list = [...songs];
    list[index] = { ...song, liked: !song.liked };
    setSongs(list);
    dispatch(addSong(list));
  };

  return (
    <Wrapper>
      <PlaylistHeader onPlay={() => setPlayer(!player)} />
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

  .playlist-item-group {
    /* background-color: rgb(240, 240, 240); */
  }

  @media (max-width: 370px) {
    padding: 5px;
  }
`;

export default Playlist;
