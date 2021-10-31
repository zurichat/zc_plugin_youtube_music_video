import { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import CopyIcon from "../../media/copy-icon.svg";
import DeleteIcon from "../../media/delete-icon.svg";
import { showedDeleteModal } from "../../app/uiSlice";
import { updatedSongId } from "../../app/deleteSongSlice";
import { selectCurrentUser } from "../../app/usersSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const OptionMenu = ({ toggleOption, option, url, songId, userId }) => {
	const ref = useRef(null);

	const dispatch = useAppDispatch();
	const user = useAppSelector(selectCurrentUser);

	const handleClickOutside = e => {
		if (ref.current && !ref.current.contains(e.target)) {
			toggleOption && toggleOption(false);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);
		document.addEventListener("contextmenu", handleClickOutside, true);

		return () => {
			document.removeEventListener("click", handleClickOutside, true);
			document.removeEventListener("contextmenu", handleClickOutside, true);
		};
	});

	if (!option) return null;

	function handleCopy() {
		return (
			navigator.clipboard.writeText(url) &&
			toast.success("Link copied to clipboard")
		);
	}

	function handleDelete() {
		if (user.id !== userId) {
			return toast.error("Sorry, you cannot delete this file.");
		}
		dispatch(updatedSongId(songId));
		dispatch(showedDeleteModal(true));
	}

	return (
		<Wrapper role="dialog" ref={ref}>
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
	top: 46px;
	width: 100%;
	max-width: 200px;
	right: 0px;
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

	@media screen and (max-width: 540px) {
		max-width: 160px;
	}
`;

export default OptionMenu;
