import React from "react";
import ReactPlayer from "react-player/youtube";
import styled from "styled-components";

const url = "https://www.youtube.com/watch?v=NmugSMBh_iI";

function Player() {
  return (
    <Wrapper>
      <div className="player-now">Now Playing</div>
      <div className="player-container">{/* <ReactPlayer url={url} /> */}</div>
      <div className="player-title">Title</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-size: 18px;
  font-weight: 500;

  .player-container {
    width: 100%;
    margin: 15px 0;
  }
`;

export default Player;
