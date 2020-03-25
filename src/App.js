import React from "react";
import "./App.css";
import FormStatefull from "./container/FormStatefull";
import Header from "../src/components/Header/Header";
import TestModal from "./TestModal";

function App() {
  return (
    <React.Fragment>
      <TestModal />
      <Header />
      <FormStatefull />
    </React.Fragment>
  );
}

export default App;
