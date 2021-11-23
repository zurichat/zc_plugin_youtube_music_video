import React from "react";
import { render, screen } from "@testing-library/react";
import ChatHeader from "../components/common/chatHeader";
import { Provider } from "react-redux";
import store from "../app/store";

function TestComponent() {
	return (
		<Provider store={store}>
			<ChatHeader />
		</Provider>
	);
}

test("Testing ChatHeaer Component", () => {
	render(<TestComponent />);
	expect(screen.getByText("Chat")).toBeInTheDocument();
	expect(screen.getByAltText("chat")).toBeInTheDocument();
});
