import { useSelector } from "react-redux";
import styled from "styled-components";
import { uiSelect } from "../../store/uiSlice";
import Song from "../../types/song";

import PlaylistItem from "./playlistItem";

interface Props {
  songs: Song[];
}
function PlaylistItems({ songs }: Props) {
  return (
    <div className="playlist-item-group" style={{ paddingBottom: "10px" }}>
      {songs.map((song, index) => (
        <div>
          <PlaylistItem key={index} song={song} />
        </div>
      ))}
    </div>
  );
}

export default PlaylistItems;
