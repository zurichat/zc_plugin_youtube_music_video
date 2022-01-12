import { useEffect, useRef } from "react";
import styled from "styled-components";

interface SelectProps {
	value: string;
	onSelect: (value: string) => void;
	options: string[];
	dropdown: boolean;
	setDropdown?: (value: boolean) => void;
	marker: string; // should be unique, will be used in className
}

const Select = (props: SelectProps) => {
	let { value, onSelect, options, dropdown, setDropdown, marker } = props;

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		window.addEventListener("click", (e: any) => {
			if (!e.target.closest("." + marker)) {
				setDropdown(false);
			}
		});
	}, []);

	options = dropdown ? options : [];

	const maxLen =
		options.map(option => option.length).sort((a, b) => b - a)[0] ?? 1;

	const getLeft = () => {
		if (ref.current) {
			const dim = ref.current.getBoundingClientRect();
			const bw = document.body.offsetWidth;
			return bw - dim.right >= 260;
		}

		return false;
	};

	const raiseSelect = (value: string) => {
		setDropdown(false); // close the list after selection
		onSelect(value); // raise select event
	};

	return (
		<Wrapper className={marker} len={maxLen} left={getLeft()} ref={ref}>
			<div
				className="select-value-container"
				onClick={() => setDropdown(!dropdown)}
			>
				<div className="search-value">{value}</div>

				{<DropdownIcon />}
			</div>

			<div className="select-options">
				{options.map((item, index) => (
					<div
						key={index}
						className="select-option"
						onClick={() => raiseSelect(item)}
					>
						{item}
					</div>
				))}
			</div>
		</Wrapper>
	);
};

export default Select;

const Wrapper = styled.div<{ len: number; left: boolean }>`
	position: relative;
	/* min-width: 100px; */

	.select-value-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 3px;
		width: 100%;
		background: white;
		gap: 20px;
		cursor: pointer;
	}
	.search-value {
		width: 100%;
		height: 100%;
		border: none;
		outline: none;
		font-size: 16px;
	}

	.select-options {
		position: absolute;
		top: 30px;
		${props => (props.left ? "left: 1px" : "right: 1px")};
		box-shadow: 0px 2px 10px #d7d7d7;
		z-index: 999;
	}
	.select-option {
		display: flex;
		align-items: center;
		height: 48px;
		padding: 10px;
		gap: 20px;
		font-size: 16px;
		cursor: pointer;
		background: #fff;
		width: ${props => `clamp(200px, calc(28px * ${props.len / 3}), 300px)`};
		z-index: 111;
	}
	.select-option:hover {
		background: #f6f6f6;
	}
`;

// ======== Dropdown Icon ============

const DropdownIcon = () => (
	<svg
		width="12"
		height="8"
		viewBox="0 0 12 8"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M10.293 0.292969L5.99997 4.58597L1.70697 0.292969L0.292969 1.70697L5.99997 7.41397L11.707 1.70697L10.293 0.292969Z"
			fill="#1D1C1D"
		/>
	</svg>
);
