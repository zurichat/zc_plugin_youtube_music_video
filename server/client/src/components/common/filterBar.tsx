import styled from "styled-components";

function Filterbar() {
	return (
		<Filterstyled>
			<div className="filterBar">
				<p>
					<i className="fa fa-filter" aria-hidden="true" />
					Filter
				</p>
				<div className="drop-down">
					<button className="accordion">
						<h3>All songs</h3>
						<i className="fa fa-chevron-down" aria-hidden="true" />
					</button>
					<div className="panel">
						<a href="#">
							<p>All Songs</p>
						</a>
						<a href="#">
							<p>By Artist</p>
						</a>
						<a href="#">
							<p>By Likes</p>
						</a>
						<a href="#">
							<p>By Duration</p>
						</a>
						<a href="#">
							<p>By Date Added</p>
						</a>
					</div>
				</div>
			</div>
		</Filterstyled>
	);
}

const Filterstyled = styled.div`
	.filterBar {
		display: flex;
		width: 17rem;
		justify-content: space-between;
		box-sizing: border-box;
		font-size: 1rem;
		font-family: Lato sans-serif;
	}

	button.accordion {
		background-color: #ffffff;
		color: #1d1c1d;
		cursor: pointer;
		padding: 1.5rem 1rem;
		width: 200px;
		height: 3rem;
		text-align: left;
		border: none;
		border-radius: 8px;
		outline: none;
		transition: 0.3s;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	button.accordion.active,
	button.accordion:hover {
		background-color: #f6f6f6;
		border-radius: 8px 8px 0 0;
	}

	.panel.show {
		display: block !important;
	}

	.panel {
		padding: 0 0.75rem;
		background-color: white;
		max-height: 0;
		overflow: hidden;
		transition: 0.3s ease-in-out;
		opacity: 0;
		width: 176px;
	}

	.panel.show {
		opacity: 1;
		max-height: 800px;
		box-shadow: 0px 2px 10px #d7d7d7;
		border-radius: 0 0 4px 4px;
	}

	.panel p {
		color: #1d1c1d;
		padding: 0 0.5rem;
		height: 3rem;
		background-color: #fff;
		display: grid;
		align-items: center;
	}

	.panel p:hover {
		background-color: #f6f6f6;
	}

	.panel a {
		text-decoration: none;
		cursor: pointer;
	}

	button.accordion:after {
		color: #f6f6f6;
	}
`;
export default Filterbar;
