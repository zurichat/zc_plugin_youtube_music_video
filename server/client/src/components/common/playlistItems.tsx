import Song from "../../types/song";

import PlaylistItem from "./playlistItem";

import styled from 'styled-components';

interface Props {
  songs: Song[];
}

function PlaylistItems({ songs }: Props) {
  return (
    <Wrapper className="playlist-item-group" style={{ paddingBottom: "10px" }}>
      {songs.map((song, index) => (
        <PlaylistItem key={index} song={song} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: white;
`

export default PlaylistItems;
