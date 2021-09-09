// @ts-nocheck
import React from "react";
import styled from "styled-components";

import Button from "./button";

import Headset from "../../media/playlistIcon.svg";

const PlaylistHeader = () => {
  return (
    <Wrapper>
      <div className="playlist-img-div">
        <img
          src={Headset}
          alt="Playlist Header Image"
          className="playlist-img"
        />
      </div>

      <div className="playlist-content">
        <div className="playlist-caption">
          Music <span className="playlist-caption-hide">Room</span> Playlist
        </div>
        <div className="playlist-summary">10 songs, 38 min 33 sec</div>
        <div className="playlist-button-group">
          <Button className="playlist-button md" color="secondary">
            Add a song to the playlist
          </Button>
          <Button className="playlist-button hide" color="secondary">
            Add a song
          </Button>
          <Button className="playlist-button ">Play</Button>
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

  .playlist-button.hide {
    display: none;
  }

  @media screen and (max-width: 490px) {
    .playlist-content {
      margin-left: 8px;
    }
    .playlist-button {
      width: 100% !important;
    }

    .playlist-button.hide {
      display: block;
    }
    .playlist-button.md {
      display: none;
    }
  }

  @media (max-width: 416px) {
    .playlist-caption-hide {
      display: none;
    }
  }
`;

export default PlaylistHeader;
