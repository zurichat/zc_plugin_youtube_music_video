import styled from "styled-components";
import Select from "./select";

interface Props {
	value: string;
	options: string[];
	onSelect: (value: string) => void;
	Icon: React.ReactElement;
	name: string;
}

const LabeledSelect = (props: Props) => {
	const { name, value, options, onSelect, Icon } = props;

	return (
		<Wrapper>
			{Icon}

			<div>{name}</div>

			<Select value={value} onSelect={onSelect} options={options} />
		</Wrapper>
	);
};

export default LabeledSelect;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	height: 36px;
	padding: 10px;
	font-size: 16px;
	gap: 10px;
`;
