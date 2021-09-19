import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "./store";

import App from "./App";

// @ts-ignore
import { GetUserInfo } from "@zuri/zuri-control";

export default function Root(props) {
  GetUserInfo();

  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}
