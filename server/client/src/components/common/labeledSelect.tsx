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

	return (
		<Wrapper className={className}>
			<div className="labaledSelect-name-icon">
				{Icon}

				<div>{name}</div>
			</div>

			<Select value={value} onSelect={onSelect} options={options} />
		</Wrapper>
	);
};

export default LabeledSelect;

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 36px;
	padding: 10px;
	font-size: 16px;
	gap: 25px;

	.labaledSelect-name-icon {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
	}
`;
