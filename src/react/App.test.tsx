import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { App } from "./App";

(global as any).ipcRenderer = { send: () => {}, on: () => {} };

test("renders learn react link", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const element = getByText(/Add Person/i);
  expect(element).not.toBeNull();
});
