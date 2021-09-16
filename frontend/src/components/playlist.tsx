import styled from "styled-components";
import { useSelector } from "react-redux";

import { selectAllSongs } from "../store/songsSlice";
import { getPlayerState } from "../store/playerSlice";

import Player from "./player";
import PlaylistHeader from "./common/playlistHeader";
import PlaylistItems from "./common/playlistItems";
import EmptyScreen from "./common/emptyScreen";

function Playlist() {
  const songs = useSelector(selectAllSongs);
  const { show } = useSelector(getPlayerState);

  if (songs.length === 0) return <EmptyScreen />;

  return (
    <Wrapper>
      <PlaylistHeader />

      <Player />

      {!show && <PlaylistItems songs={songs} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  overflow-y: scroll;
  background: #fff;
  padding: 20px;
  height: 83vh;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #00b87c;
  }

  @media (max-width: 500px) {
    height: 100%;
  }

  @media (max-width: 400px) {
    padding: 5px;
  }
`;

export default Playlist;
