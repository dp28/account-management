import React from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";

export const App = () => (
  <div className="App">
    <header className="App-header">
      <Counter />
      <span>
        <span>Learn </span>
      </span>
    </header>
  </div>
);
