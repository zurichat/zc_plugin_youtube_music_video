import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "./store";

import App from "./App";

export default function Root(props) {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}
