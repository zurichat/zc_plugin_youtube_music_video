import React from "react";
import { setMountMaxTime } from "single-spa";
import songsSlice from "../../store/songsSlice";
import Song from "../../types/song";

import PlaylistItem from "./playlistItem";

interface Props {
  songs: Song[];
}

function PlaylistItems({ songs }: Props) {
  
 
  let filteredSongs = songs
     .slice(0, songs.length)
     .reverse()
     .slice(0,15) 
    
  
  return (
    <div className="playlist-item-group">
      {filteredSongs.map((song, index) => (
        <PlaylistItem key={index} song={song} />
      ))}
    </div>
  );
}

export default PlaylistItems;
