// @ts-nocheck

import React from "react";
import YouTube from "react-youtube";
import styled from "styled-components";

function Player() {
  const handleReady = (event) => {
    event.target.playVideo();
  };

  const url = "https://www.youtube.com/watch?v=nBtDsQ4fhXY";

  return (
    <Wrapper>
      <div className="player-now">Now Playing</div>
      <YouTube videoId="nBtDsQ4fhXY" onReady={handleReady} />
      <div className="player-title">Title</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
`;

export default Player;
