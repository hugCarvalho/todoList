import React, { Component } from "react"
import Item from "../components/Item/Item"
import { v4 as uuid } from "uuid"
import Inputs from "../components/Inputs/Inputs"
import Output from "../components/Output/Output"
import ShowModal from "../components/Modal/ShowModal"
import Header from "../components/Header/Header"
import { hardcodedTravelData } from "../data/travelData"

const travelListHardcodedData = [
  {
    id: "ac2945e5-9248-4354-9f0d-3df053ff6eb7",
    title: "Id & passport",
    isCompleted: false,
  },
  {
    id: "16eeb49a-6fa1-4dc4-93df-3a381c590519",
    title: "Boarding pass",
    isCompleted: false,
  },
]

export default class AppState extends Component {
  state = {
    listName: "todo",
    todoList: [],
    travelList: hardcodedTravelData,
    addTodoText: "",
    searchFieldValue: "",
    errorMessage: "",
    isEditing: false,
    showAllTodos: true,
    toggleCheckAll: false,
    modalIsOpen: false,
    inputRef: React.createRef(),
  }

  componentDidMount() {
    this.focusAddTodoField()

    if (localStorage.todosData) {
      try {
        this.setState({
          todoList: JSON.parse(localStorage.getItem("todosData")),
          showAllTodos: JSON.parse(localStorage.getItem("showAllTodos")),
        })
      } catch (error) {
        this.setErrorMessage("localStorage")
      }
    }
    if (localStorage.travelData) {
      try {
        this.setState({
          travelList: JSON.parse(localStorage.getItem("travelData")),
          showAllTodos: JSON.parse(localStorage.getItem("showAllTodos")),
        })
      } catch (error) {
        this.setErrorMessage("localStorage")
      }
    }
  }

  componentDidUpdate() {
    const { todoList, travelList, showAllTodos } = this.state
    if (this.state.listName === "todo") {
      const todosData = JSON.stringify(todoList)
      localStorage.setItem("todosData", todosData)
      localStorage.setItem("showAllTodos", JSON.stringify(showAllTodos))
    } else {
      const travelData = JSON.stringify(travelList)
      localStorage.setItem("travelData", travelData)
      localStorage.setItem("showAllTodos", JSON.stringify(showAllTodos))
    }
  }
  //Gets typed text for add+search fields
  enteredTextHandler = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState(() => ({
      [name]: value,
    }))
  }
  //AddTodo searchbar
  focusAddTodoField = () => this.state.inputRef.current.focus()

  addTodo = e => {
    e.preventDefault()
    const { addTodoText, todoList, travelList } = this.state
    //trim(): if removed input text with white spaces doesn't get capitalized
    const validText = addTodoText.trim()
    const newTodo = {
      id: uuid(),
      title: `${validText[0].toUpperCase() + validText.substring(1)}`,
      isCompleted: false,
    }

    if (this.state.listName === "todo") {
      this.setState({
        todoList: [...todoList, newTodo],
        addTodoText: "",
        isEditing: false,
      })
    } else {
      this.setState({
        travelList: [...travelList, newTodo],
        addTodoText: "",
        isEditing: false,
      })
    }
  }

  //Toggle Options
  toggleCheckAll = () => {
    const { todoList, travelList, toggleCheckAll } = this.state
    if (this.state.listName === "todo") {
      this.setState({
        todoList: todoList.map(item => {
          !toggleCheckAll ? (item.isCompleted = true) : (item.isCompleted = false)
          return item
        }),
      })
      this.setState(() => ({ toggleCheckAll: !toggleCheckAll }))
    } else {
      this.setState({
        travelList: travelList.map(item => {
          !toggleCheckAll ? (item.isCompleted = true) : (item.isCompleted = false)
          return item
        }),
      })
      this.setState(() => ({ toggleCheckAll: !toggleCheckAll }))
    }
  }

  toggleHideCompleted = () =>
    this.setState(() => ({ showAllTodos: !this.state.showAllTodos }))

  toggleTodoCompleted = (id, listName) => {
    const { todoList, travelList } = this.state
    if (listName === "todo") {
      this.setState({
        todoList: todoList.map(item => {
          if (item.id === id) {
            item.isCompleted = !item.isCompleted
          }
          return item
        }),
      })
    } else {
      this.setState({
        travelList: travelList.map(item => {
          if (item.id === id) {
            item.isCompleted = !item.isCompleted
          }
          return item
        }),
      })
    }
  }

  //Edit todos
  editTodo = id => {
    let todo = []
    if (this.state.listName === "todo") {
      todo = this.state.todoList.filter(item => item.id === id)
    } else {
      todo = this.state.travelList.filter(item => item.id === id)
    }

    if (this.state.isEditing) {
      return
    }

    this.setState({
      todoList: this.state.todoList.filter(item => item.id !== id),
      travelList: this.state.travelList.filter(item => item.id !== id),
      addTodoText: todo[0].title.trim(),
    })
    this.setState(() => ({ isEditing: !this.state.isEditing }))
    this.focusAddTodoField()
  }

  //Remove Todos
  removeTodo = id =>
    this.setState({
      todoList: this.state.todoList.filter(item => item.id !== id),
      travelList: this.state.travelList.filter(item => item.id !== id),
    })
  removeAll = () => {
    if (this.state.listName === "todo") {
      this.setState(() => ({
        todoList: this.state.todoList.filter(item => !item),
      }))
      this.toggleModal()
    } else {
      this.setState(() => ({
        travelList: this.state.travelList.filter(item => !item),
      }))
    }
  }

  //Modal
  toggleModal = () => {
    this.setState(() => ({
      modalIsOpen: !this.state.modalIsOpen,
    }))
  }
  setErrorMessage = typeOfMsg => {
    const deleteAll = `You are about to delete ALL your todos. This action is
              irreversible! Continue?`
    const localStorage = "An error has ocurred!! Local storage file may be corrupted."

    this.setState(() => ({
      errorMessage: typeOfMsg === "localStorage" ? localStorage : deleteAll,
    }))
    this.toggleModal()
  }

  setListName = name => {
    this.setState({
      listName: name,
    })
  }

  render() {
    const {
      listName,
      addTodoText,
      todoList,
      travelList,
      showAllTodos,
      toggleCheckAll,
      searchFieldValue,
    } = this.state

    const listTodo = todoList
      .map(item => (
        <Item
          key={item.id}
          todoTitle={item.title}
          isCompleted={item.isCompleted}
          toggleTodoCompleted={() => this.toggleTodoCompleted(item.id, listName)}
          removeTodo={() => this.removeTodo(item.id)}
          editTodo={() => this.editTodo(item.id)}
        />
      ))
      .sort((a, b) => (a.props.isCompleted < b.props.isCompleted ? -1 : 1))
    const listTravel = travelList
      .map(item => (
        <Item
          key={item.id}
          todoTitle={item.title}
          isCompleted={item.isCompleted}
          toggleTodoCompleted={() => this.toggleTodoCompleted(item.id, listName)}
          removeTodo={() => this.removeTodo(item.id)}
          editTodo={() => this.editTodo(item.id)}
        />
      ))
      .sort((a, b) => (a.props.isCompleted < b.props.isCompleted ? -1 : 1))

    return (
      <React.Fragment>
        {
          <ShowModal
            list={listName === "todo" ? listTodo : listTravel}
            isOpen={this.state.modalIsOpen}
            closeModal={this.toggleModal}
            errorMessage={this.state.errorMessage}
            boom={this.removeAll}></ShowModal>
        }
        <Header listName={listName} setListName={this.setListName} />
        <Inputs
          getTextValue={this.enteredTextHandler}
          addTodoText={addTodoText}
          addTodo={this.addTodo}
          searchItems={this.searchItems}
          isEditing={this.state.isEditing}
          ref={this.state.inputRef}
          error={this.showError}
        />
        <Output
          list={listName === "todo" ? listTodo : listTravel}
          travelList={travelList}
          showAllTodos={showAllTodos}
          searchFieldValue={searchFieldValue}
          toggleHideCompleted={this.toggleHideCompleted}
          toggleCheckAll={this.toggleCheckAll}
          toggleCheckAllStatus={toggleCheckAll}
          setErrorMessage={this.setErrorMessage}
        />
      </React.Fragment>
    )
  }
}
