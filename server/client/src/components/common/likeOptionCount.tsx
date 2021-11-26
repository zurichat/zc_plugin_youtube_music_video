import { useSelector } from "react-redux";
import styled from "styled-components";

import songService from "../../services/songService";
import { selectCurrentUser } from "../../app/usersSlice";

import Like from "./like";
import option from "../../media/option.svg";
import { useAppDispatch } from "../../app/hooks";
import { likedSong } from "../../app/songsSlice";
import { useState } from "react";
import OptionMenu from "./optionMenu";

interface Props {
	song: Song;
}

function LikeOptionCount(props: Props) {
	const { duration, likedBy = [], id: songId } = props.song;

	const dispatch = useAppDispatch();

	const { id: userId } = useSelector(selectCurrentUser);
	const [isOption, setOption] = useState(false);

	const { length: count } = likedBy;
	const liked = likedBy.some(id => id === userId);

	const countText = count ? `${count} ${count === 1 ? "like" : "likes"}` : "";

	const handleLike = () => {
		const likedObj = { songId, userId, like: !liked };

		dispatch(likedSong(likedObj));

		songService.likeSong(likedObj, {
			error: () => dispatch(likedSong({ ...likedObj, like: !liked }))
		});
	};

	const handleShowOption = e => {
		e.stopPropagation();
		setOption(!isOption);
	};

	const formatDuration = (duration: string) => {
		if (!duration) return "";

		const [h, ...rest] = duration.split(":");
		return (h === "0" ? "" : `${h}:`) + rest.join(":") + " mins";
	};

	return (
		<Wrapper>
			<OptionMenu {...{ song: props.song, isOption, setOption }} />

			{duration && (
				<div className="like-duration">{formatDuration(duration)}</div>
			)}

			{duration && <div className="like-count">{countText}</div>}

			{!duration && countText && (
				<div className="like-count-player">{countText}</div>
			)}

			<Like liked={liked} onLike={handleLike} />

			<img
				onClick={handleShowOption}
				data-option="option"
				src={option}
				alt="option img"
				style={{ cursor: "pointer", width: "20px", height: "20px" }}
				className="like-option"
			/>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	gap: 25px;
	text-align: left;
	cursor: context-menu;

	.like-count {
		min-width: 50px;
		text-align: right;
		color: rgba(153, 153, 153, 1);
	}
	.like-count-player {
		color: rgba(153, 153, 153, 1);
	}

	.like-option {
		cursor: pointer;
	}

	@media screen and (max-width: 850px) {
		.like-duration {
			display: none;
		}
	}

	@media screen and (max-width: 767px) {
		.like-duration {
			display: inline-block;
		}
	}

	@media screen and (max-width: 540px) {
		.like-duration {
			display: none;
		}
	}

	@media screen and (max-width: 450px) {
		.like-count {
			display: none;
		}
	}
`;

export default LikeOptionCount;
