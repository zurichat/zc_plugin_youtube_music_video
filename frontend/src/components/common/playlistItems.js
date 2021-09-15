import React from "react";

import PlaylistItem from "./playlistItem";

function PlaylistItems({ songs }) {
  return (
    <div className="playlist-item-group">
      {songs.map((song, index) => (
        <PlaylistItem key={index} {...song} />
      ))}
    </div>
  );
}

export default PlaylistItems;
