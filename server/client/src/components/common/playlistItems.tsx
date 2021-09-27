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
    // className="playlist-item-group"
    <Wrapper >
      {songs.map((song, index) => (
        <div>
          <PlaylistItem key={index} song={song} />
          {showOption && <OptionMenu />}
        </div>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

export default PlaylistItems;
