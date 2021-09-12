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

  const urls = ["https://www.youtube.com/embed/vbYB4rddM-8"];

  return (
    <Wrapper>
      <div className="player-now">Now Playing</div>
      <div className="player-wrapper">
        <ReactPlayer
          url={urls}
          className="react-player"
          width="100%"
          height="100%"
          playing={player.playing}
          onPlay={handlePlay}
          onPause={handlePause}
          pip={true}
          stopOnUnmount={false}
          config={{ playerVars: { showinfo: 1 } }}
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

  .player-wrapper {
    position: relative;
    padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
  }

  .react-player {
    position: absolute;
    top: 0;
    left: 0;
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
