import ReactPlayer from "react-player/youtube";
import styled from "styled-components";
import { useSelector } from "react-redux";

import store from "../store";
import {
  getPlayerState,
  playerAction,
  playerSelector,
  playing,
} from "../store/playerSlice";
import { songSelect } from "../store/songsSlice";

import PlaylistItems from "./common/playlistItems";
import { useState } from "react";

function Player() {
  const player = useSelector(getPlayerState);
  const songs = useSelector(songSelect.allSongs);
  const song = useSelector(playerSelector.selectCurrentSong);
  const upnext = getUpnext();

  if (!player.show) return null;

  const url = "https://www.youtube.com/embed/" + song.id;

  function getUpnext() {
    const index = songs.indexOf(song);

    return [...songs.slice(index + 1), ...songs.slice(0, index)];
  }

  const handlePlay = () => {
    store.dispatch({ type: playing.type, payload: { playing: true } });
  };

  const handlePause = () => {
    store.dispatch({ type: playing.type, payload: { playing: false } });
  };

  const handedEnded = () => {
    const index = songs.findIndex((s) => s.id === song.id);

    if (index === -1) return;

    const indexNext = index < songs.length - 1 ? index + 1 : 0;
    playerAction.changeSong(songs[indexNext]);
  };

  return (
    <Wrapper>
      <div className="player-now">Now Playing</div>

      <div className="player-wrapper">
        <ReactPlayer
          url={url}
          className="react-player"
          width="100%"
          height="100%"
          controls
          playing={player.playing}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handedEnded}
          pip={true}
          stopOnUnmount={false}
          // config={{ playerVars: { showinfo: 1 } }}
        />
      </div>

      <div className="player-title">{song.title}</div>
      {upnext.length > 0 && <div className="player-next">Up next</div>}
      <PlaylistItems songs={upnext} />
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
