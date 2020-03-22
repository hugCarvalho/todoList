import React from "react";
import "./inputs.scss";

export default function Input({ text, textValue, add, searchItems, editing }) {
  //console.log("INPUT");
  //console.log(editing);
  return (
    <>
      <div className="container-inputs">
        <form onSubmit={add}>
          <div className="wrapper__add-todo">
            <input
              className="add-todo"
              value={text}
              name="text"
              onChange={textValue}
              placeholder="add..."
              autoComplete="off"
            />
            <button type="submit">{editing ? "Edit" : "Add"}</button>
          </div>
          <div className="wrapper__search-todo">
            <input
              className="search-todo"
              placeholder="search..."
              //value={text}
              name="searchField"
              onChange={searchItems}
              autoComplete="off"
            />
          </div>
        </form>
      </div>
    </>
  );
}
