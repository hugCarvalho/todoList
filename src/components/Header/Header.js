import React from "react"
import "./Header.scss"

const listType = {
  todo: "Todo List",
  travel: "Travel List",
}

export default function Header({ listName, setListName }) {
  return (
    <>
      <header>
        <button onClick={() => setListName("todo")}>Todo</button>
        <h1>{listType[listName]}</h1>
        <button onClick={() => setListName("travel")}>Travel</button>
      </header>
    </>
  )
}
