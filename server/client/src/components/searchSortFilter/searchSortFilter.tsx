import styled from "styled-components";
import Filter from "./filter";
import Search from "./search";
import Sort from "./sort";

interface Props {}

function SearchSortFilter(props: Props) {
	// const {} = props;

	return (
		<Wrapper>
			<Search />
			<Filter />
			<Sort />
		</Wrapper>
	);
}

export default SearchSortFilter;

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	border: 1px solid red;
	gap: 20px;
`;
