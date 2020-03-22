import React from "react";
import "./Output.scss";

export default function output({
  list,
  showAll,
  hide,
  toggleAll,
  toggleAllStatus,
  boom
}) {
  const filtered = list.filter(item => !item.props.completed);

  return (
    <section className="container__todos">
      <h3>Todos</h3>
      <div className="options-top">
        <button className="mark-todos" onClick={toggleAll}>
          {" "}
          {toggleAllStatus ? "All" : "None"}
        </button>
      </div>
      <div className="container-todos">
        <ul>{showAll ? list : filtered}</ul>
      </div>
      <div>
        <form className="options-bottom">
          <button type="button" onClick={hide} className="one">
            {showAll ? "Hide completed" : "Show Completed"}
          </button>
          <button type="button" onClick={boom}>
            Remove All
          </button>
        </form>
      </div>
    </section>
  );
}
