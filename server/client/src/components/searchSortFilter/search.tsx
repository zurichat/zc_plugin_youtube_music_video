import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	changedCurrentSong,
	changedPlaying,
	showedPlayer
} from "../../app/playerSlice";
import { selectSongs } from "../../app/songsSlice";

const Search = ({ className }) => {
	const dispatch = useAppDispatch();
	const songs = useAppSelector(selectSongs);

	const [isBlur, setBlur] = useState(true);
	const [query, setQuery] = useState("");

	useEffect(() => {
		window.addEventListener("click", (e: any) => {
			if (!e.target.closest(".searchbox")) setBlur(true);
		});
	}, []);

	const list = songs.map(song => song.title);

	const filtered =
		!isBlur && query
			? list.filter(item => item.toLowerCase().includes(query.toLowerCase()))
			: [];

	const handleSelect = (item: string) => {
		setBlur(true);

		const { id } = songs.find(
			song => song.title.toLowerCase() === item.toLowerCase()
		);

		dispatch(changedCurrentSong({ id }));
		dispatch(changedPlaying(true));
		dispatch(showedPlayer(true));
	};

	return (
		<Wrapper className={`searchbox ${className}`}>
			<div className="search-input-container">
				{query && <SearchIcon />}

				<input
					type="text"
					className="search-input"
					value={query}
					onChange={e => setQuery(e.target.value)}
					placeholder="Enter keyword"
					onFocus={() => setBlur(false)}
				/>

				{!query && <SearchIcon />}
			</div>

			<div className="search-items">
				{filtered.map((item, index) => (
					<div
						key={index}
						className="search-item-container"
						onClick={() => handleSelect(item)}
					>
						<SearchIconJr />
						<div className="search-item">{item}</div>
					</div>
				))}
			</div>
		</Wrapper>
	);
};

export default Search;

const Wrapper = styled.div`
	position: relative;
	width: 100%;

	.search-input-container {
		display: flex;
		align-items: center;
		border-radius: 3px;
		height: 36px;
		width: 100%;
		padding: 10px;
		background: white;
		gap: 5px;
	}
	.search-input {
		width: 100%;
		height: 100%;
		border: none;
		outline: none;
		font-size: 16px;
	}

	.search-items {
		position: absolute;
		top: 38px;
		width: min(400px, 94vw);
		box-shadow: 0px 2px 10px #d7d7d7;
		z-index: 9999;
	}
	.search-item-container {
		display: flex;
		align-items: center;
		width: 100%;
		height: 48px;
		padding: 10px;
		gap: 20px;
		font-size: 16px;
		cursor: pointer;
		background: #fefefe;
	}
	.search-item-container:hover {
		background: #f6f6f6;
	}
`;

// =================== SEARCH ICONS ======================  //

const SearchIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M15.7812 13.8344L12.6656 10.7188C12.525 10.5781 12.3344 10.5 12.1344 10.5H11.625C12.4875 9.39688 13 8.00937 13 6.5C13 2.90937 10.0906 0 6.5 0C2.90937 0 0 2.90937 0 6.5C0 10.0906 2.90937 13 6.5 13C8.00937 13 9.39688 12.4875 10.5 11.625V12.1344C10.5 12.3344 10.5781 12.525 10.7188 12.6656L13.8344 15.7812C14.1281 16.075 14.6031 16.075 14.8938 15.7812L15.7781 14.8969C16.0719 14.6031 16.0719 14.1281 15.7812 13.8344ZM6.5 10.5C4.29063 10.5 2.5 8.7125 2.5 6.5C2.5 4.29063 4.2875 2.5 6.5 2.5C8.70938 2.5 10.5 4.2875 10.5 6.5C10.5 8.70938 8.7125 10.5 6.5 10.5Z"
			fill="#00B87C"
		/>
	</svg>
);

const SearchIconJr = () => (
	<svg
		width="14"
		height="14"
		viewBox="0 0 14 14"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M13.2125 12.3516L9.15469 8.29375C9.78438 7.47969 10.125 6.48438 10.125 5.4375C10.125 4.18438 9.63594 3.00937 8.75156 2.12344C7.86719 1.2375 6.68906 0.75 5.4375 0.75C4.18594 0.75 3.00781 1.23906 2.12344 2.12344C1.2375 3.00781 0.75 4.18438 0.75 5.4375C0.75 6.68906 1.23906 7.86719 2.12344 8.75156C3.00781 9.6375 4.18438 10.125 5.4375 10.125C6.48438 10.125 7.47813 9.78438 8.29219 9.15625L12.35 13.2125C12.3619 13.2244 12.376 13.2338 12.3916 13.2403C12.4071 13.2467 12.4238 13.2501 12.4406 13.2501C12.4575 13.2501 12.4741 13.2467 12.4897 13.2403C12.5052 13.2338 12.5194 13.2244 12.5312 13.2125L13.2125 12.5328C13.2244 12.5209 13.2338 12.5068 13.2403 12.4912C13.2467 12.4757 13.2501 12.459 13.2501 12.4422C13.2501 12.4254 13.2467 12.4087 13.2403 12.3931C13.2338 12.3776 13.2244 12.3635 13.2125 12.3516ZM7.9125 7.9125C7.25 8.57344 6.37187 8.9375 5.4375 8.9375C4.50312 8.9375 3.625 8.57344 2.9625 7.9125C2.30156 7.25 1.9375 6.37187 1.9375 5.4375C1.9375 4.50312 2.30156 3.62344 2.9625 2.9625C3.625 2.30156 4.50312 1.9375 5.4375 1.9375C6.37187 1.9375 7.25156 2.3 7.9125 2.9625C8.57344 3.625 8.9375 4.50312 8.9375 5.4375C8.9375 6.37187 8.57344 7.25156 7.9125 7.9125Z"
			fill="#616061"
		/>
	</svg>
);
