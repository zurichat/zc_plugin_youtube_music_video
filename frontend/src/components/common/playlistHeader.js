//PlaylistHeader HTML
import React from 'react';
import styled from 'styled-components';
import beat from '../beat.png'

const PlaylistHeader = () => {
  const Playlist = styled.div`
    display: flex;
    align-items: center;
    font-family: 'lato', sans-serif;
  `;
  const Wrapper = styled.div`
    padding: 0 25px;
  `;
  const Para = styled.p`
    font-size: 1rem;
    color: #999;
    padding: 5px 0 15px 0;
  `;
  const Add = styled.button`
    padding: 10px;
    background: #00B87C;
    border: none;
    border-radius: 3px;
    color: white;
    cursor: pointer;
  `;
  const Pause = styled.button`
    padding: 10px;
    background: none;
    border: 1px solid #00B87C;
    border-radius: 3px;
    color: #00B87C;
    margin: 0 10px;
    cursor: pointer;
  `;
  return (
    <Playlist>
      <img src={beat} alt='playlist image'/>
      <Wrapper>
        <h2>Music Room Playlist</h2>
        <Para>10 songs, 38min 33s</Para>
        <Add>Add song to the play list</Add>
        <Pause>Pause</Pause>
      </Wrapper>
    </Playlist>
  )
}

export default PlaylistHeader;
