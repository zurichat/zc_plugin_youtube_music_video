import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

// Store
import store from "../../store";
import { showPlayer, playing, getPlayerState } from "../../store/playerSlice";
import { addSongToggle } from "../../store/uiSlice";

// Components
import PasteUrl from "./pasteUrl";
import Button from "./button";

import Headset from "../../media/playlistIcon.svg";

const PlaylistHeader = () => {
  const player = useSelector(getPlayerState);

  const [text, setText] = useState("Play");

  useEffect(() => setText(player.playing ? "Pause" : "Play"), [player.playing]);

  const handleShowPlayer = () => {
    if (text === "Play") {
      store.dispatch({ type: showPlayer.type, payload: { show: true } });
      store.dispatch({ type: playing.type, payload: { playing: true } });
    } else store.dispatch({ type: playing.type, payload: { playing: false } });
  };

  const handleAddSongToggle = () => {
    store.dispatch({ type: addSongToggle.type, payload: { addSong: true } });
  };

  return (
    <Wrapper>
      <PasteUrl />

      <div className="playlist-img-div">
        <img src={Headset} alt="Playlist Header" className="playlist-img" />
      </div>

      <div className="playlist-content">
        <div className="playlist-caption">
          Music <span className="playlist-caption-hide">Room</span> Playlist
        </div>
        <div className="playlist-summary">10 songs, 38 min 33 sec</div>
        <div className="playlist-button-group">
          <Button
            className="playlist-button md"
            color="secondary"
            onClick={handleAddSongToggle}
          >
            <span className="playlist-button-desktop-text">
              Add a song to the playlist
            </span>
            <span className="playlist-button-mobile-text">Add a song</span>
          </Button>
          <Button className="playlist-button" onClick={handleShowPlayer}>
            {text}
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  .playlist-img-div {
    width: 160px;
    height: 160px;
  }

  .playlist-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 20px;
  }

  .playlist-caption {
    font-weight: 500;
    font-size: 20px;
  }

  .playlist-summary {
    font-size: 14px;
    margin-bottom: 20px;
  }

  .playlist-button-group {
    width: 100%;
  }

  .playlist-button.md {
    margin-right: 15px !important;
  }

  .playlist-button-mobile-text {
    display: none;
  }

  @media screen and (max-width: 490px) {
    .playlist-content {
      margin-left: 8px;
    }
    .playlist-button {
      width: 100% !important;
    }

    .playlist-button-desktop-text {
      display: none;
    }
    .playlist-button-mobile-text {
      display: inline;
    }
  }

  @media (max-width: 416px) {
    .playlist-caption-hide {
      display: none;
    }
  }
`;

export default PlaylistHeader;
