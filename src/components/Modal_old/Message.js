import React from "react";

export default function Message(props) {
  return <div>{props.message ? "great" : null}</div>;
}