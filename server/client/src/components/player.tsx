import { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import styled from "styled-components";
import { useSelector, connect } from "react-redux";

import store from "../store";
import { songSelect } from "../store/songsSlice";

import {
  getPlayerState,
  playerAction,
  playerSelector,
  playing,
} from "../store/playerSlice";

import PlaylistItems from "./common/playlistItems";
import LikeOptionCount from "./common/likeOptionCount";

import httpService from "../services/httpService";
import { getSongIdFromYouTubeUrl } from "../utils/idGenerator";
import Song from "../types/song";

function Player() {
  const [init, setInit] = useState(false);
  const player = useSelector(getPlayerState);
  const songs = useSelector(songSelect.allSongs);
  const song = useSelector(playerSelector.selectCurrentSong);
  const upnext = getUpnext();
  const { currentSongEndpoint } = httpService.endpoints;

  const thumbnail = async (song: Song) => {
    if(player.currentSongId === "") 
    song = {
      id: "",
      title: "",
      duration: "",
      albumCover: "",
      url: "",
      addedBy: "",
      userId: "",
      likedBy: [],
      time: "",
    };
    try {
      await httpService.post(currentSongEndpoint, song);
      console.log("Succesfully sent to current-song Endpoint");
      console.log(song);
    } catch (error) {
      console.log(error);
    }
    return;
  };

  useEffect(() => {
    thumbnail(song);
  }, [song]);

  if (!player.show) return null;

  const url =
    "https://www.youtube.com/embed/" + getSongIdFromYouTubeUrl(song.url);

  function getUpnext() {
    const index = songs.indexOf(song);
    return [...songs.slice(index + 1), song, ...songs.slice(0, index)];
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

  const handleNext = () => {
    handedEnded();
  }

  return (
    <Wrapper init={init}>
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
          onEnablePIP={() => setInit(true)}
          onDisablePIP={() => setInit(false)}

          // config={{ playerVars: { showinfo: 1 } }}
        />
      </div>

      <div className="player-title">{song.title}</div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <LikeOptionCount likedBy={song.likedBy} songId={song.id} />
        <div 
        className="nextsong"
        onClick={handleNext}
        >NEXT</div>
      </div>

      {upnext.length > 0 && <div className="player-next">Up next</div>}

      <PlaylistItems songs={upnext} />
    </Wrapper>
  );
}

const Wrapper = styled.div<{ init: boolean }>`
  height: "100%";
  display: ${(props) => (props.init ? "none" : "block")};

  .player-wrapper {
    position: relative;
    padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
  }

  .nextsong {
    color: #00bb7c;
    font-size: 18px;
    font-weight: 700;
  }

  .nextsong:hover {
    font-weight: 900;
    cursor:grab;
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

export default connect (null, {})(Player);
