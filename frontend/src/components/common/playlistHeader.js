import React from 'react';
import Headset from '../media/Headset.png'

import styled from 'styled-components';

const Playlisth = styled.div`
  font-family: 'lato', sans-serif;
  margin: 154px 393px 0px 285px;
  display: flex; 
`;

const Playlisthi = styled.div`
  margin: 24px 40px 0px 24px;
`;

const Playlisthc = styled.div`
`;

const Title = styled.h2`
  margin-top: 72px;
  font-size: 21px;
`;

const Paragraph = styled.p`
  margin-top: 8px;
  color: #999999;
`;


const PlaylistHeader = () => {
    return(
        <Playlisth>
            <Playlisthi>
                <img src={Headset} alt="Playlist Header Image" />
            </Playlisthi>
            <Playlisthc>
                <Title>Music Room Playlist</Title>
                <Paragraph>10 songs, 38 min 33 sec</Paragraph>
            </Playlisthc>
        </Playlisth>
    )
}

export default PlaylistHeader;