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
                    <Pause> Pause </Pause>
                </Wrapper>
            </Playlist>
        )
    }
}

export default PlaylistHeader;