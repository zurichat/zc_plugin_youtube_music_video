import store from "../app/store";
import { showedChat } from "../app/uiSlice";

export default function chatMediaQuery() {
	const dispatch = store.dispatch;

	// Display chat by default on desktop view
	const mediaQuery = matchMedia("(min-width: 1123px)");

	mediaQuery.addEventListener("change", ev => {
		if (mediaQuery.matches) dispatch(showedChat(true));
		else if (store.getState().ui.showChat) dispatch(showedChat(false));
	});

	if (mediaQuery.matches) dispatch(showedChat(true));
}
