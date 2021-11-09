import { useSelector } from "react-redux";
import styled from "styled-components";

import songService from "../../services/songService";
import { selectCurrentUser } from "../../app/usersSlice";

import Like from "./like";
import option from "../../media/option.svg";

// interface Props {
//   duration?: string;
//   likedBy: string[];
//   songId: string;
//   handleOption: any;
// }

function LikeOptionCount(props) {
	const { duration, likedBy = [], songId, handleOption } = props;

	const { id: userId } = useSelector(selectCurrentUser);

	const { length: count } = likedBy;
	const liked = likedBy.some(id => id === userId);

	const countText = `${count} ${count > 1 ? "likes" : "like"}`;

	const countClasses = duration ? "like-count" : "like-count-player";

	const handleLike = () => {
		songService.likeSong({ songId, userId, like: !liked });
	};

	const formatDuration = (duration: string) => {
		const [h, ...rest] = duration.split(":");
		return (h === "0" ? "" : `${h}:`) + rest.join(":");
	};

	return (
		<Wrapper duration={duration}>
			{duration && (
				<div className="like-duration">{formatDuration(duration)} mins</div>
			)}

			{countText && <div className={countClasses}>{countText}</div>}

			<div className="like-button">
				<Like className="like-button" liked={liked} onLike={handleLike} />
			</div>

			<img
				onClick={e => {
					e.stopPropagation();
					handleOption(true);
				}}
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
	display: flex;
	align-items: center;
	justify-content: space-between;

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

	.like-option {
		margin-right: 0;
		z-index: 5;
	}

	.like-button {
		z-index: 5;
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
