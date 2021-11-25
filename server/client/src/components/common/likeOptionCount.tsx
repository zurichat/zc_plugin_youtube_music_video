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

	const countText = count > 1 ? `${count} likes` : count === 1 ? "1 like" : "";

	const countClasses = duration ? "like-count" : "like-count-player";

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
		const [h, ...rest] = duration.split(":");
		return (h === "0" ? "" : `${h}:`) + rest.join(":");
	};

	return (
		<Wrapper duration={duration}>
			<OptionMenu {...{ song: props.song, isOption, setOption }} />

			{duration && (
				<div className="like-duration">{formatDuration(duration)} mins</div>
			)}

			<div className={countClasses}>{countText}</div>

			<div className="like-button-div">
				<Like className="like-button" liked={liked} onLike={handleLike} />
			</div>

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

const Wrapper = styled.div<{ duration: string }>`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: context-menu;

	& > * {
		margin-right: 25px;
	}

	.like-icons {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 60px;
	}

	.like-count,
	.like-count-player {
		color: rgba(153, 153, 153, 1);
	}

	.like-count {
		min-width: 50px;
		text-align: right;
	}

	.like-option {
		margin-right: 0;
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
