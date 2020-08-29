import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./react/App";
import { store } from "./react/app/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
