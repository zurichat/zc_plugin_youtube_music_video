import React from 'react';
import Headset from '../media/Headset.png'

const PlaylistHeader = () => {
    return(
        <div className="playlist-header">
            <div className="playlist-header-img">
                <img src={Headset} alt="Playlist Header Image" />
            </div>
            <div className="playlist-header-content">
                <h2>Music Room Playlist</h2>
                <p>10 songs, 38 min 33 sec</p>
            </div>
        </div>
    )
}

export default PlaylistHeader;




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