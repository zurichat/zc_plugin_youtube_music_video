import styled from "styled-components";
import Filter from "./filter";
import Search from "./search";
import Sort from "./sort";

const SearchSortFilter = () => {
	return (
		<Wrapper>
			<Search className="ssf-search ssf-item" />
			<Filter className="ssf-filter ssf-item" />
			<Sort className="ssf-sort ssf-item" />
		</Wrapper>
	);
};

export default SearchSortFilter;

const Wrapper = styled.div`
	display: flex;
	gap: 20px;

	.ssf-search {
		flex-grow: 1;
		flex-basis: 20%;
	}

	@media (max-width: 733px) {
		gap: 10px;

		.select-value-container {
			display: none;
		}
	}
`;
