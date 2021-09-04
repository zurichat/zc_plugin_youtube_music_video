<<<<<<< HEAD
import React, { Component } from "react";
import Headset from ".../assets/headset.png"

class PlaylistHeader extends Component {
    render() {
        return (
            <Playlist>
                <img src = {Headset} alt = "Playlist Header image" />
                <Wrapper>
                    <h3> Music Room Playlist </h3>
                    <Para> 10 songs, 38 min 33 sec </Para>
                    <Add> Add song to the playlist </Add>
                    <Play> Play </Play>
                </Wrapper>
            </Playlist>
        )
    }
}

export default PlaylistHeader;
=======
// @ts-nocheck
import React from "react";
import styled from "styled-components";

import Button from "./button";

import Headset from "../../media/playlistIcon.svg";

const PlaylistHeader = () => {
  return (
    <Wrapper>
      <img src={Headset} alt="Playlist Header Image" className="playlist-img" />

      <div className="playlist-content">
        <div className="playlist-caption">Music Room Playlist</div>
        <div className="playlist-summary">10 songs, 38 min 33 sec</div>
        <div>
          <Button className="playlist-button" color="secondary">
            Add a song to the playlist
          </Button>
          <Button>Play</Button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 20px;

  .playlist-img {
    display: block;
  }
  .playlist-content {
    display: flex;

    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 30px;
  }

  .playlist-caption {
    font-weight: 500;
    font-size: 20px;
  }

  .playlist-summary {
    font-size: 14px;
    margin-bottom: 20px;
  }
  .playlist-button {
    margin-right: 15px !important;
  }
`;

export default PlaylistHeader;
>>>>>>> 43beb47075bcb6fe7a89a6ae52cba55650eea85a
