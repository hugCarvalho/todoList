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
  console.log("l", list.length);

  return (
    <section className="container__todos">
      <div className="options-top">
        <button className="btn__toggle-completed" onClick={toggleAll}>
          {" "}
          {toggleAllStatus ? (
            <i className="far fa-check-square" title="check all"></i>
          ) : (
            <i className="far fa-square" title="uncheck all"></i>
          )}
        </button>
        <button
          type="button"
          onClick={hide}
          className="btn__show-hide-completed"
        >
          {showAll ? (
            <span title="hide completed">
              <i className="far fa-eye-slash"> completed</i>
            </span>
          ) : (
            <span title="show completed">
              <i class="far fa-eye"></i> completed
            </span>
          )}
        </button>
        <button
          className="delete"
          type="button"
          onClick={boom}
          title="delete all"
        >
          <i className="fas fa-bomb"> </i>
        </button>
      </div>
      <div className="container-todos">
        {list.length === 0 && (
          <p style={{ textAlign: "center" }}>Your list is empty...</p>
        )}
        <ul>{showAll ? list : filtered}</ul>
      </div>
      <div></div>
    </section>
  );
}
