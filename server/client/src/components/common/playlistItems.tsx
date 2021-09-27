import { useSelector } from "react-redux";
import styled from "styled-components";
import { uiSelect } from "../../store/uiSlice";
import Song from "../../types/song";
import OptionMenu from "./optionMenu";

import PlaylistItem from "./playlistItem";

interface Props {
  songs: Song[];
}
function PlaylistItems({ songs }: Props) {
  const showOption = useSelector(uiSelect.showOption);
  return (
    <div className="playlist-item-group" style={{ paddingBottom: "10px" }}>
      {songs.map((song, index) => (
        <div>
          <PlaylistItem key={index} song={song} />
          {showOption && <OptionMenu />}
        </div>
      ))}
    </div>
  );
}

export default PlaylistItems;
