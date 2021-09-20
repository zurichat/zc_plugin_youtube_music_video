import store from "../store";
import { uiDispatch } from "../store/uiSlice";

export default function chatMediaQuery() {
  // Display chat by default on desktop view
  const mediaQuery = matchMedia("(min-width: 1005px)");

  mediaQuery.addEventListener("change", (ev) => {
    if (mediaQuery.matches) uiDispatch.showChat(true);
    else if (store.getState().ui.showChat) uiDispatch.showChat(false);
  });

  if (mediaQuery.matches) uiDispatch.showChat(true);
}
