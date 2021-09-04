import React from 'react';

// components
import styled from 'styled-components';
import Button from "./button";
//images
import Headset from "../../media/playlistIcon.svg";

const PlaylistHeader = () => {
  const Playlist = styled.div`
    display: flex;
    align-items: center;
    font-family: 'lato', sans-serif;
    padding: 10px 15px;
  `;
  const Wrapper = styled.div`
    padding: 0 25px;
  `;
  const Title = styled.h2`
    font-size: 1.7rem;
  `;
  const Paragraph = styled.p`
    font-size: 1rem;
    color: #999;
    padding: 6px 0 16px 0;
  `;

  return (
    <Playlist>
      <img src={Headset} alt='playlist image'/>
      <Wrapper>
        <Title>Music Room Playlist</Title>
        <Paragraph>10 songs, 38min 33s</Paragraph>
        <Button>Add song to the play list</Button>
        <Button>Pause</Button>
      </Wrapper>
    </Playlist>
  )
}



export default PlaylistHeader;
