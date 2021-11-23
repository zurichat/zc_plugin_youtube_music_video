import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../app/store";
import PlaylistItem from "../components/common/playlistItem";

function TestComponent() {
	const users = [
		{
			id: "001",
			name: "Mr. Primal",
			avatar: "a pic",
			email: "uchihagohan@gmail.com"
		}
	];

	const song = {
		id: "001",
		title: "Blue bird",
		duration: "0:24",
		albumCover: "Naruto Shippuden",
		url: "bla bla.com",
		addedBy: "Mr Primal",
		userId: "001",
		likedBy: ["001", "002"],
		time: "5:06pm"
	};

	return (
		<Provider store={store}>
			<PlaylistItem song={song} users={users} />
		</Provider>
	);
}

test("Teting playlistItem", () => {
	render(<TestComponent />);
	expect(screen.getByText("Added by")).toBeInTheDocument();
	expect(screen.getByText("Mr. Primal")).toBeInTheDocument();
	expect(screen.getByAltText("album cover")).toBeInTheDocument();
	expect(screen.getByText("2 likes")).toBeInTheDocument();
	expect(screen.getByAltText("liked")).toBeInTheDocument();
	userEvent.click(screen.getByAltText("option img"));
	expect(screen.getByText("Copy link")).toBeInTheDocument();
});
