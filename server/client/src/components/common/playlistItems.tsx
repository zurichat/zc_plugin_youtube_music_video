import React from "react";
import Song from "../../types/song";

import PlaylistItem from "./playlistItem";

interface Props {
  songs: Song[];
}

function PlaylistItems({ songs }: Props) {
  return (
    <div className="playlist-item-group">
      {songs.map((song, index) => (
        <PlaylistItem key={index} {...song} />
      ))}
    </div>
  );
}

export default PlaylistItems;
