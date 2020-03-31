import React from "react";
import "./Output.scss";

export default function output({
  list,
  showAll,
  toggleHide,
  toggleAll,
  toggleAllStatus,
  boom,
  openModal
}) {
  const filtered = list.filter(item => !item.props.completed);
  const hideIsActive = () => (showAll ? "hide-completed" : " hide-is-active");

  console.log("RENDER");
  return (
    <section className="container__todos">
      <div className="options-top">
        {/* Toggle completed / not completed */}
        <button className="btn__toggle-completed" onClick={toggleAll}>
          {" "}
          {toggleAllStatus ? (
            <i className="far fa-check-square" title="check all"></i>
          ) : (
            <i className="far fa-square" title="uncheck all"></i>
          )}
        </button>

        {/* hide or show Completed */}
        <button
          type="button"
          onClick={toggleHide}
          // className={}
        >
          {/* {showAll ? ( */}
          <span title="hide completed" className={hideIsActive()}>
            <i className="far fa-eye-slash"> completed</i>
          </span>
          {/* ) : (
            <span title="show completed">
              <i className="far fa-eye"></i> completed
            </span>
          )} */}
        </button>
        {/* <BtnHideCompleted onClick={hide}>{showAll}</BtnHideCompleted> */}
        {/* Delete all */}
        <button
          className="delete"
          type="button"
          // onClick={boom}
          onClick={openModal}
          title="delete all"
        >
          <i className="fas fa-bomb"> </i>
        </button>
      </div>

      {/* Show if list is empty */}
      <div className="container-todos">
        {list.length === 0 && <p style={{ textAlign: "center" }}>Nothing...</p>}
        <ul>{showAll ? list : filtered}</ul>
      </div>
    </section>
  );
}
