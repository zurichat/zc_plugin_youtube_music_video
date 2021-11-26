import { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import styled from "styled-components";
import { connect } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import store from "../app/store";
import { selectSongs } from "../app/songsSlice";
import {
	getPlayerState,
	changedPlaying,
	changedCurrentSong,
	selectCurrentSong
} from "../app/playerSlice";
import PlaylistItems from "./common/playlistItems";
import LikeOptionCount from "./common/likeOptionCount";
import httpService from "../services/httpService";
import { getSongIdFromYouTubeUrl } from "../utils/idGenerator";
import SearchSortFilter from "./searchSortFilter";

function Player() {
	const [init, setInit] = useState(false);
	const dispatch = useAppDispatch();
	const player = useAppSelector(getPlayerState);
	const songs = useAppSelector(selectSongs);
	const song = useAppSelector(selectCurrentSong);
	const { currentsong: currentSongEndpoint } = httpService.endpoints;

	const thumbnail = async (song: Song) => {
		try {
			if (player.currentSongId) {
				await httpService.post(currentSongEndpoint, song);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		thumbnail(song);
	}, [song]);

	if (!player.show) return null;

	const url =
		"https://www.youtube.com/embed/" + getSongIdFromYouTubeUrl(song.url);

	const handlePlay = () => {
		store.dispatch({ type: changedPlaying.type, payload: { playing: true } });
	};

	const handlePause = () => {
		store.dispatch({ type: changedPlaying.type, payload: { playing: false } });
	};

	const handedEnded = () => {
		const index = songs.findIndex(s => s.id === song.id);

		if (index === -1) return;

		const indexNext = index < songs.length - 1 ? index + 1 : 0;
		dispatch(changedCurrentSong(songs[indexNext]));
	};

	const handleNext = () => {
		handedEnded();
	};

	return (
		<Wrapper init={init}>
			<div className="player-now">Now Playing</div>

			<div className="player-fixed-to-top">
				<div className="player-wrapper">
					<ReactPlayer
						url={url}
						className="react-player"
						width="100%"
						height="100%"
						controls
						playing={player.playing}
						onPlay={handlePlay}
						onPause={handlePause}
						onEnded={handedEnded}
						pip={true}
						stopOnUnmount={false}
						onEnablePIP={() => setInit(true)}
						onDisablePIP={() => setInit(false)}

						// config={{ playerVars: { showinfo: 1 } }}
					/>
				</div>

				<div className="player-title">{song.title}</div>

				<div className="player-next-row">
					<LikeOptionCount song={{ ...song, duration: undefined }} />

					<div className="nextsong" onClick={handleNext}>
						NEXT
					</div>
				</div>

				<SearchSortFilter />

				{songs.length > 0 && (
					<div className="player-next">
						All songs <span>({songs.length})</span>
					</div>
				)}
			</div>

			<PlaylistItems songs={songs} />
		</Wrapper>
	);
}

const Wrapper = styled.div<{ init: boolean }>`
	display: ${props => (props.init ? "none" : "flex")};
	flex-direction: column;
	gap: 15px;
	height: "100%";

	.player-fixed-to-top {
		position: sticky;
		top: 44px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		background: #fff;
		z-index: 111;
	}

	.player-wrapper {
		position: relative;
		padding-top: 26.25%; // Player ratio: 100 / (1280 / 720)
		height: 200px;
	}

	.player-next-row {
		display: flex;
		justify-content: space-between;
	}

	.nextsong {
		color: #00bb7c;
		font-size: 18px;
		font-weight: 700;
	}

	.nextsong:hover {
		font-weight: 900;
		cursor: pointer;
	}

	.react-player {
		position: absolute;
		top: 0;
		left: 0;
	}

	.player-now,
	.player-title,
	.player-next {
		font-size: 18px;
		font-weight: 500;
	}

	.player-next {
		align-self: flex-start;
		font-weight: 600;
		padding: 4px;
		border-bottom: 4px solid hsla(160, 100%, 36%, 1);
		width: auto;

		span {
			font-weight: 400;
		}
	}
`;

export default connect(null, {})(Player);
