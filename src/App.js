import React from "react";
import "./App.scss";
import AppState from "./container/AppState";
import Header from "../src/components/Header/Header";

function App() {
  return (
    <React.Fragment>
      <Header />
      <AppState />
    </React.Fragment>
  );
}

export default App;
