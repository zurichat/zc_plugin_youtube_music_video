import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ToastContextProvider } from "./context/toastContext";

ReactDOM.render(
 <ToastContextProvider>
  <App />
 </ToastContextProvider>,
 document.getElementById("root")
);

