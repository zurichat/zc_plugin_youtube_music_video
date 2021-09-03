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
{/* <div class="playlist-header">
    <div class="playlist-header-img">
        <img src="music-player.png" alt="music-player-image">
    </div>
    <div class="playlist-header-content">
        <h2>Music Room Playlist</h2>
        <p>10 songs, 38 min 33 sec</p>
    </div>
</div> */}


//PlaylistHeader CSS

// .playlist-header{
//     font-family: 'lato', sans-serif;
//     margin: 154px 393px 0px 285px;
//     display: flex;
// }

// .playlist-header-img {
//     margin: 24px 40px 0px 24px;
// }

// .playlist-header-content h2{
//     margin-top: 72px;
//     font-size: 21px;
// }

// .playlist-header-content p {
//     margin-top: 8px;
//     color: #999999;
// }
