import store from "../store";
import { toggleChat } from "../store/uiSlice";

export default function chatMediaQuery() {
  // Display chat by default on desktop view
  const mediaQuery = matchMedia("(min-width: 1005px)");

  mediaQuery.addEventListener("change", (ev) => {
    if (mediaQuery.matches)
      store.dispatch({ type: toggleChat.type, payload: { chat: true } });
    else if (store.getState().ui.showChat)
      store.dispatch({ type: toggleChat.type, payload: { chat: false } });
  });

  if (mediaQuery.matches)
    store.dispatch({ type: toggleChat.type, payload: { chat: true } });
}
