import React from "react";
import ReactPlayer from "react-player/youtube";
import styled from "styled-components";
import { useSelector } from "react-redux";

import store from "../store";
import { getPlayerState, playing } from "../store/playerSlice";
import { selectAllSongs } from "../store/songsSlice";

import PlaylistItems from "./common/playlistItems";

function Player() {
  const player = useSelector(getPlayerState);
  const songs = useSelector(selectAllSongs);

  if (!player.show) return null;

  const handlePlay = () => {
    store.dispatch({ type: playing.type, payload: { playing: true } });
  };

  const handlePause = () => {
    store.dispatch({ type: playing.type, payload: { playing: false } });
  };

  const url = "https://www.youtube.com/embed/vbYB4rddM-8";

  return (
    <Wrapper>
      <div className="player-now">Now Playing</div>
      <div className="player-player">
        <ReactPlayer
          url={url}
          width="100%"
          playing={player.playing}
          onPlay={handlePlay}
          onPause={handlePause}
        />
      </div>
      <div className="player-title">Title of song</div>
      <div className="player-next">Up next</div>
      <PlaylistItems songs={songs} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;

  .player-player {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: black;
  }

  .player-now,
  .player-title,
  .player-next {
    font-size: 18px;
    font-weight: 500;
    margin: 10px 0;
  }

  .player-next {
    border-bottom: 5px solid hsla(160, 100%, 36%, 1);
    width: 70px;
  }
`;

export default Player;
