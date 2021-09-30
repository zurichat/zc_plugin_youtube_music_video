import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

// Store
import { playerAction, getPlayerState } from "../../store/playerSlice";
import { uiDispatch } from "../../store/uiSlice";

// Components
import Button from "./button";

import Headset from "../../media/playlistIcon.svg";
import { songSelect } from "../../store/songsSlice";

const PlaylistHeader = () => {
  const player = useSelector(getPlayerState);
  const firstSong = useSelector(songSelect.firstSong);
  const songs = useSelector(songSelect.allSongs);

  const [text, setText] = useState("Play");

  useEffect(() => setText(player.playing ? "Pause" : "Play"), [player.playing]);

  const to2Digits = (num: number, str: string) =>
    num === 0 ? "" : num < 10 ? `0${num} ${str}` : `${num} ${str}`;

  const totalDuration = () => {
    const durs = songs.map((song) => {
      const [h, m, s] = song.duration.split(":");
      return { h: +h, m: +m, s: +s };
    });

    const duration = { h: 0, m: 0, s: 0 };

    durs.forEach(({ h, m, s }) => {
      (duration.h = duration.h + h),
        (duration.m = duration.m + m),
        (duration.s = duration.s + s);
    });

    const sr = duration.s % 60;
    duration.s = Math.round(duration.s / 60);

    const mr = (duration.m + sr) % 60;
    duration.m = Math.round((duration.m + sr) / 60);

    duration.h = Math.round(duration.h + mr);

    const { h: hf, m: mf, s: sf } = duration;

    return `${to2Digits(hf, "hr ")}${to2Digits(mf, "min ")}${to2Digits(
      sf,
      "sec"
    )} `;
  };

  totalDuration();

  const handleShowPlayer = () => {
    if (text === "Play") {
      playerAction.dispatchPlaying(true);
      playerAction.dispatchShowPlayer(true);
    } else playerAction.dispatchPlaying(false);

    if (!player.currentSongId) playerAction.changeSong(firstSong);
  };

  const handleAddSongToggle = () => {
    uiDispatch.showPasteUrl(true);
  };


  return (
    <Wrapper>
      <div className="playlist-content-wrapper">
        <div className="playlist-img-div">
          <img src={Headset} alt="Playlist Header" className="playlist-img" />
        </div>

        <div className="playlist-content">
          <div className="playlist-caption">
            Music <span className="playlist-caption-hide">Room</span> Playlist
          </div>

          <div className="playlist-summary">
            {songs.length} songs, {totalDuration()}
          </div>

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
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: sticky;
  top: 25px;
  left: 0;
  padding-top: 10px;
  background: white;
  display: flex;
  justify-content: center;
  width: 100%;
  overflow: hidden;

  .playlist-content-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    flex-grow: 1;
  }
  .playlist-img-div {
    width: 150px;
    height: 150px;
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
    font-weight: 800;
    margin-bottom: 5px;
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

    .playlist-img-div {
      width: 140px;
      height: 140px;
    }
  }

  @media (max-width: 416px) {
    .playlist-caption-hide {
      display: none;
    }
  }
`;

export default PlaylistHeader;
