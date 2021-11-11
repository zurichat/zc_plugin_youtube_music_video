import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import SortIcon from "../media/sort-icon.svg";
import FilterIcon from "../media/filter-icon.svg";
import SearchIcon from "../media/search-icon.svg";
import ArrowIcon from "../media/arrowdown.svg";

const SearchFilter = () => {
	const ref = useRef(null);
	const [showFilter, setShowFilter] = useState(false);
	const [showSort, setShowSort] = useState(false);
	const [selected, setSelected] = useState({
		filter: "All songs",
		sort: "Default"
	});

	// const sortList = [
	// 	"Default",
	// 	"Ascending order A - Z",
	// 	"Descending order Z - A",
	// 	"Date added Recent to Oldest",
	// 	"Date added Oldest to Recent"
	// ];

	// const filterList = [
	// 	"All songs",
	// 	"By Artists",
	// 	"By Likes",
	// 	"By Duration",
	// 	"By Date addedt"
	// ];

	const handleClickOutside = e => {
		if (ref.current && !ref.current.contains(e.target)) {
			setShowFilter(false);
			setShowSort(false);
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

	return (
		<Wrapper>
			<form action="">
				<input type="text" placeholder="Enter keyword" />
				<img src={SearchIcon} alt="" />
			</form>
			<div className="container">
				<div className="filter__container">
					<div className="title">
						<img src={FilterIcon} alt="" />
						<span>Filter</span>
					</div>
					<div
						className="select__container"
						onClick={() => {
							setShowFilter(true);
						}}
						id=""
					>
						<span>{selected.filter}</span>
						{showFilter && (
							<div className="menu" ref={ref}>
								<button
									onClick={() => {
										setSelected({
											...selected,
											filter: "All songs"
										});
										setShowFilter(false);
									}}
								>
									All songs
								</button>
								<button
									onClick={() => {
										setSelected({
											...selected,
											filter: "By Artists"
										});
										setShowFilter(e => !e);
									}}
								>
									By Artists
								</button>
								<button
									onClick={() => {
										setSelected({
											...selected,
											filter: "By Likes"
										});
										setShowFilter(false);
									}}
								>
									By Likes
								</button>
								<button
									onClick={() => {
										setSelected({
											...selected,
											filter: "By Duration"
										});
										setShowFilter(false);
									}}
								>
									By Duration
								</button>
								<button
									onClick={() => {
										setSelected({
											...selected,
											filter: "By Date added"
										});
										setShowFilter(false);
									}}
								>
									By Date added
								</button>
							</div>
						)}
						<img
							style={{
								position: "absolute"
							}}
							src={ArrowIcon}
							alt=""
						/>
					</div>
				</div>
				<div
					className="sort__container"
					onClick={() => {
						setShowSort(true);
					}}
				>
					<div className="title">
						<img src={SortIcon} alt="" />
						<span>Sort</span>
					</div>
					<div className="select__container" id="">
						<span>{selected.sort}</span>
						{showSort && (
							<div className="menu" ref={ref}>
								<button
									value="Default"
									onClick={() => {
										setSelected({
											...selected,
											sort: "Default"
										});
										setShowSort(false);
									}}
								>
									Default
								</button>
								<button
									value="Ascending order A - Z"
									onClick={() => {
										setSelected({
											...selected,
											sort: "Ascending order A - Z"
										});
										setShowSort(false);
									}}
								>
									Ascending order A - Z
								</button>
								<button
									value="Descending order Z - A"
									onClick={() => {
										setSelected({
											...selected,
											sort: "Descending order Z - A"
										});
										setShowSort(false);
									}}
								>
									Descending order Z - A
								</button>
								<button
									value="Date added Recent to Oldest"
									onClick={() => {
										setSelected({
											...selected,
											sort: "Date added Recent to Oldest"
										});
										setShowSort(false);
									}}
								>
									Date added Recent to Oldest
								</button>
								<button
									value="Date added Oldest to Recent"
									onClick={() => {
										setSelected({
											...selected,
											sort: "Date added Oldest to Recent"
										});
										setShowSort(false);
									}}
								>
									Date added Oldest to Recent
								</button>
							</div>
						)}
						<img
							style={{
								position: "absolute"
							}}
							src={ArrowIcon}
							alt="k"
						/>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	padding: 0 4px;
	margin: 24px 0;

	form {
		position: relative;
		width: 100%;
		max-width: -webkit-fill-available;

		input {
			font-style: normal;
			width: -webkit-fill-available;
			font-weight: normal;
			font-size: 15px;
			line-height: 18px;
			color: #a5abb6;
			background: #ffffff;
			border: 1px solid #f6f6f6;
			border-radius: 8px;
			padding-left: 16px;
			height: 48px;
		}

		img {
			position: absolute;
			top: 16px;
			right: 16px;
		}
	}
	span {
		font-style: normal;
		font-weight: normal;
		font-size: 15px;
		line-height: 21px;
		color: #1d1c1d;
		margin: 0px 8px;
	}

	.container {
		display: flex;
		.title {
			display: flex;
			align-items: center;
			padding-right: 8px;
			span {
				padding-bottom: 0;
			}
		}
	}
	.menu {
		position: absolute;
		top: 48px;
		left: 0px;
		width: 100%;
		box-shadow: 0px 2px 10px #d7d7d7;
		border-radius: 4px;
		z-index: 5;
		button {
			border: none;

			display: flex;
			align-items: center;
			padding-left: 16px;
			width: 100%;
			height: 40px;
			background: #ffffff;
			font-size: 14px;
			line-height: 170%;
			color: #1d1c1d;
			&:hover,
			&:focus {
				background: #f6f6f6;
				cursor: pointer;
			}
		}
	}
	.filter__container,
	.sort__container {
		display: flex;
	}

	.sort__container {
		.select__container {
			width: 240px;
		}
	}

	.filter__container {
		margin: 0 24px 0 40px;
	}
	.select__container {
		align-items: center;
		position: relative;
		padding: 0 24px 0 16px;
		height: 48px;
		border: 1px solid #f6f6f6;
		border-radius: 8px;
		display: flex;
		width: 200px;
		cursor: pointer;

		span {
			margin: 0;
			width: calc(100% - 20px);
			padding-bottom: 0;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		img {
			top: 12px;
			right: 24px;
			position: aboslute;
		}
	}
`;

export default SearchFilter;
