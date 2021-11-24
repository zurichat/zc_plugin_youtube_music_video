import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectSongs } from "../app/songsSlice";
import { getPlayerState } from "../app/playerSlice";
import Player from "./player";
import PlaylistHeader from "./playlistHeader";
import PlaylistItems from "./common/playlistItems";
import EmptyScreen from "./common/emptyScreen";
import SearchSortFilter from "./searchSortFilter";

function Playlist() {
	const songs = useSelector(selectSongs);
	const { show } = useSelector(getPlayerState);

	return (
		<Wrapper>
			<div className="playlist-header-container">
				<PlaylistHeader />
				{!show && <SearchSortFilter />}
			</div>

			{songs.length === 0 && <EmptyScreen />}

			<Player />

			{!show && <PlaylistItems songs={songs} />}
		</Wrapper>
	);
}

const Wrapper = styled.div`
	box-sizing: border-box;
	padding: 20px;
	margin-top: 40px;
	height: 80%;
	min-height: 80%;

	.playlist-header-container {
		position: sticky;
		top: 25px;
		margin-bottom: 20px;
	}

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
