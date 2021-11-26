import styled from "styled-components";
import Filter from "./filter";
import Search from "./search";
import Sort from "./sort";

const SearchSortFilter = () => {
	return (
		<Wrapper>
			<Search className="ssf-search" />
			<Filter className="ssf-filter" />
			<Sort className="ssf-sort" />
		</Wrapper>
	);
};

export default SearchSortFilter;

const Wrapper = styled.div`
	display: flex;
	gap: 30px;

	.ssf-search {
		flex-grow: 1;
	}

	@media (max-width: 853px) {
		.ssf-search {
			display: none;
		}
	}

	@media (max-width: 631px) {
		.ssf-filter {
			display: none;
		}
	}

	@media (max-width: 357px) {
		.ssf-sort {
			display: none;
		}
	}
`;
