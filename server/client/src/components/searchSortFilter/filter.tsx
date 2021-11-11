import { useState } from "react";
import LabeledSelect from "../common/labeledSelect";

const Filter = () => {
	const options = [
		"All songs",
		"By Artists",
		"By Likes",
		"By Duration",
		"By Date added"
	];
	const [value, setValue] = useState(options[0]);

	return (
		<LabeledSelect
			value={value}
			options={options}
			name="Filter"
			onSelect={setValue}
			Icon={<FilterIcon />}
		/>
	);
};

export default Filter;

// ===================== FILTER ICONS ======================

const FilterIcon = () => (
	<svg
		width="12"
		height="14"
		viewBox="0 0 12 14"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M7.63636 13.0909L4.36364 10.6364V7.84364L0 2.93455V1.63636C0 1.20237 0.172402 0.786157 0.47928 0.47928C0.786158 0.172402 1.20237 0 1.63636 0L10.3636 0C10.7976 0 11.2138 0.172402 11.5207 0.47928C11.8276 0.786157 12 1.20237 12 1.63636V2.93455L7.63636 7.84364V13.0909ZM5.45455 10.0909L6.54545 10.9091V7.42909L10.9091 2.52V1.63636C10.9091 1.4917 10.8516 1.35296 10.7493 1.25067C10.647 1.14838 10.5083 1.09091 10.3636 1.09091H1.63636C1.4917 1.09091 1.35296 1.14838 1.25067 1.25067C1.14838 1.35296 1.09091 1.4917 1.09091 1.63636V2.52L5.45455 7.42909V10.0909Z"
			fill="#1D1C1D"
		/>
	</svg>
);
