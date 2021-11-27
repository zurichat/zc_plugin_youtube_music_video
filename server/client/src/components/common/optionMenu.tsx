import { useEffect, useRef } from "react";
import styled from "styled-components";
import CopyIcon from "../../media/copy-icon.svg";
import DeleteIcon from "../../media/delete-icon.svg";
import { showedDeleteModal } from "../../app/uiSlice";
import { toast } from "react-toastify";
import { updatedSongId } from "../../app/deleteSongSlice";
import { selectCurrentUser } from "../../app/usersSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

interface Props {
	song: Song;
	isOption: boolean;
	setOption: (value: boolean) => void;
}

const OptionMenu = ({ setOption, isOption, song }: Props) => {
	const { url, id: songId, userId } = song;
	const uid = Date.now() + "uid";

	const dispatch = useAppDispatch();
	const user = useAppSelector(selectCurrentUser);

	const handleClickOutside = e => {
		const { id, option } = e.target.dataset;
		if (!option || id !== uid) {
			setOption(false);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);
		document.addEventListener("contextmenu", handleClickOutside, true);
	}, []);

	if (!isOption) return null;

	function handleCopy() {
		navigator.clipboard.writeText(url);
		toast.success("Link copied to clipboard");
	}

	function handleDelete() {
		if (user.id !== userId)
			return toast.error("Sorry, you cannot delete this file.");

		dispatch(updatedSongId(songId));
		dispatch(showedDeleteModal(true));
	}

	return (
		<Wrapper role="dialog" data-id={uid} onClick={() => setOption(false)}>
			<button autoFocus onClick={handleCopy} className="option-item">
				<img src={CopyIcon} alt="" />
				<span>Copy link</span>
			</button>

			{user.id === userId && (
				<button className="option-item" onClick={handleDelete}>
					<img src={DeleteIcon} alt="" />
					<span>Delete</span>
				</button>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: absolute;
	z-index: 10;
	top: 40px;
	right: 3px;
	width: 200px;
	box-shadow: 0px 2px 10px #d7d7d7;
	border-radius: 4px;
	background: #ffffff;

	.option-item {
		display: flex;
		align-items: center;
		padding: 8px 16px;
		height: 40px;
		width: 100%;
		background: transparent;
		border: none;

		&:hover {
			background: #f6f6f6;
			cursor: pointer;
		}

		&:focus {
			outline: none;
			background: #f6f6f6;
		}
	}

	span {
		font-style: normal;
		font-weight: normal;
		font-size: 14px;
		line-height: 170%;
		color: #1d1c1d;
		margin-left: 16px;
	}

	/* @media screen and (max-width: 540px) {
		max-width: 160px;
	} */
`;

export default OptionMenu;
