import { useState } from "react";
import { getUUID } from "../../utils/idGenerator";
import styled from "styled-components";
import Select from "./select";

interface Props {
	value: string;
	options: string[];
	onSelect: (value: string) => void;
	Icon: React.ReactElement;
	name: string;
	className?: string;
}

const LabeledSelect = (props: Props) => {
	const { name, value, options, onSelect, Icon, className } = props;
	const [dropdown, setDropdown] = useState(false);
	const [marker] = useState(getUUID());

	return (
		<Wrapper
			className={`${className} ${marker}`}
			data-drop
			onClick={() => setDropdown(!dropdown)}
		>
			<div className="labaledSelect-name-icon">
				{Icon}

				<div>{name}</div>
			</div>

			<Select
				value={value}
				onSelect={onSelect}
				options={options}
				dropdown={dropdown}
				setDropdown={setDropdown}
				marker={marker}
			/>
		</Wrapper>
	);
};

export default LabeledSelect;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	height: 36px;
	padding: 10px 0;
	font-size: 16px;
	gap: 15px;
	cursor: pointer;

	.labaledSelect-name-icon {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
	}
`;
