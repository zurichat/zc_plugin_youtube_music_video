import styled from "styled-components";
import { useSelector } from "react-redux";

import { selectSongs } from "../app/songsSlice";
import { getPlayerState } from "../app/playerSlice";

import Player from "./player";
import PlaylistHeader from "./common/playlistHeader";
import PlaylistItems from "./common/playlistItems";
import EmptyScreen from "./common/emptyScreen";
import SearchFilter from "./searchFilter";

function Playlist() {
	const songs = useSelector(selectSongs);
	const { show } = useSelector(getPlayerState);

	return (
		<Wrapper>
			<PlaylistHeader />
			<SearchFilter />

			{songs.length === 0 && <EmptyScreen />}

			<Player />

			{!show && <PlaylistItems songs={songs} />}
		</Wrapper>
	);
}

const Wrapper = styled.div`
	box-sizing: border-box;
	background: #fff;
	padding: 20px;
	margin-top: 40px;
	height: 80%;
	min-height: 80%;

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
