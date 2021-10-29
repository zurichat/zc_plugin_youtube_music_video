import { useState } from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { useSelector, connect } from "react-redux";
import { toast } from "react-toastify";

import { RootState } from "../../store";
import { uiDispatch, uiSelect } from "../../store/uiSlice";

import songService from "../../services/songService";
import { getSongIdFromYouTubeUrl } from "../../utils/idGenerator";
import { userSelect } from "../../store/usersSlice";

interface Props {
	getSongByUrl: (url: string) => Song;
}

const PasteUrl = (props: Props) => {
	const [url, setUrl] = useState("");

	const isLoading = useSelector(uiSelect.isLoading);
	const { name: addedBy, id: userId } = useSelector(userSelect.currentUser);

	const showPasteUrl = useSelector(uiSelect.showPasteUrl);

	if (!showPasteUrl) return null;

	const handleChange = (event: any) => setUrl(event.target.value);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (props.getSongByUrl(url)) {
			return toast.error("This song already exists.") && setUrl("");
		}

		if (isLoading) return;

		uiDispatch.loading(true);

		try {
			getSongIdFromYouTubeUrl(url);

			await songService.addSong({
				url,
				addedBy,
				userId,
				likedBy: [],
				time: `${Date.now()}`
			});

			uiDispatch.showPasteUrl(false);

			toast.success("Added Successfully");
			setUrl("");
		} catch (e) {
			toast.error(`Error: ${e.message}`);
		}

		uiDispatch.loading(false);
	};

	const handleEscape = ev => {
		const escape = ev.code || ev.key;

		if (escape === "Escape" || ev.target.dataset.close === "close") {
			uiDispatch.showPasteUrl(false);
		}
	};

	return (
		<Wrapper onClick={handleEscape} data-close="close">
			<form onSubmit={handleSubmit} className="submit-form">
				<div>
					<label htmlFor="" className="form-label">
						Paste Youtube URL here
						<FiX
							style={{
								color: "#000",
								background: "#fff",
								width: "1rem",
								height: "1rem",
								cursor: "pointer"
							}}
							onClick={() => uiDispatch.showPasteUrl(false)}
						/>
					</label>
				</div>

				<div className="input-text-div">
					<input
						className="input-text"
						type="text"
						name=""
						id=""
						value={url}
						onChange={handleChange}
						onKeyDown={handleEscape}
						autoFocus
					/>
				</div>

				<div className="input-submit-div">
					<input className="input-submit" type="submit" value="Add" />
				</div>
			</form>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: absolute;
	top: 1px;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	background-color: rgb(0, 0, 0, 0.2);
	z-index: 111;

	.submit-form {
		position: absolute;
		top: 170px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background: #fff;
		padding: 20px;
		width: min(90%, 400px);
		box-shadow: 3px -4px 8px rgb(0, 0, 0, 0.2);
		border-radius: 4px;
	}

	.form-label {
		display: flex;
		justify-content: space-between;
		font-weight: 700;
		font-size: 20px;
	}

	.input-text-div {
		display: flex;
		margin: 20px 0;
	}

	.input-text {
		border: 1.5px solid #00bb7c;
		outline: none;
		padding: 0.5rem;
		font-size: 17px;
		width: 100%;
		border-radius: 5px;
	}

	.input-text::selection {
		background-color: #00bb7c;
		color: white;
	}

	.input-submit-div {
		display: flex;
		justify-content: flex-end;
	}

	.input-submit {
		padding: 8px 20px;
		font-size: 17px;
		color: #fff;
		background: #00bb7c;
		border: none;
		outline: none;
		cursor: pointer;
		border-radius: 5px;
	}
`;

const mapStateToProps = (state: RootState) => ({
	getSongByUrl: url => state.songs.find(song => song.url === url)
});

export default connect(mapStateToProps)(PasteUrl);
