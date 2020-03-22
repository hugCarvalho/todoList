import React, { Component } from "react";
import Item from "../Item/Item";
import { v4 as uuid } from "uuid";
import Inputs from "../Inputs/Inputs";
import Output from "../Output/Output";

//2 localstorages
// loading
// saving

export default class FormStatefull extends Component {
  state = {
    items: [],
    text: "",
    searchField: "",
    showAll: true,
    toggleAll: true,
    editing: false,
    todoB: false
    //searching: true
  };
  componentDidMount() {
    console.log("MOUNT");

    this.setState({
      items: JSON.parse(localStorage.getItem("myData"))
    });
  }

  edit = id => {
    console.log(id);
    const item = this.state.items.filter(item => item.id === id);
    this.setState({
      items: this.state.items.filter(item => item.id !== id),
      text: item[0].title
    });
    this.setState(() => ({
      editing: !this.state.editing
    }));
  };

  componentDidUpdate() {
    const {
      text,
      items,
      showAll,
      editing,
      searching,
      searchField
    } = this.state;
    const data = JSON.stringify(items);
    console.log(
      "UPDATE",
      text,
      items,
      showAll,
      "editing:",
      editing,
      "searching:",
      searching,
      searchField.length
    );
    localStorage.setItem("myData", data);
  }
  textHandler = e => {
    const { text } = this.state;
    const name = e.target.name;
    const value = e.target.value;
    this.setState(() => ({
      [name]: value
    }));
  };
  add = e => {
    e.preventDefault();
    const { text, items } = this.state;
    const newItem = {
      id: uuid(),
      title: text,
      completed: false
    };

    this.setState({
      items: [...items, newItem],
      text: "",
      editing: false
    });
    console.log("ADD");
  };
  toggle = id => {
    const { items } = this.state;
    this.setState({
      items: items.map(item => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
        return item;
      })
    });
  };
  toggleAll = () => {
    const { items, toggleAll } = this.state;
    console.log(toggleAll);
    this.setState({
      items: items.map(item => {
        toggleAll ? (item.completed = true) : (item.completed = false);
        return item;
      })
    });
    this.setState(() => ({
      toggleAll: !toggleAll
    }));
  };

  hide = () => {
    const { showAll } = this.state;
    this.setState(() => ({
      showAll: !showAll
    }));
  };
  remove = id => {
    const { items } = this.state;
    this.setState({
      items: items.filter(item => item.id !== id)
    });
  };
  searchItems = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  removeAll = () => {
    this.setState(() => ({
      items: []
    }));
  };
  render() {
    const {
      text,
      items,
      showAll,
      toggleAll,
      searching,
      searchField
    } = this.state;
    console.log("RENDER!!!!");
    //RENDER!
    const list = items
      .map(item => (
        <Item
          key={item.id}
          title={item.title}
          completed={item.completed}
          toggle={() => this.toggle(item.id)}
          remove={() => this.remove(item.id)}
          edit={() => this.edit(item.id)}
        />
      ))
      .sort((a, b) => (a.props.completed < b.props.completed ? -1 : 1));
    const filteredList = list.filter(item => {
      return item.props.title.includes(searchField);
    });
    console.log(filteredList);
    return (
      <React.Fragment>
        <Inputs
          searchItems={this.searchItems}
          textValue={this.textHandler}
          add={this.add}
          text={text}
          editing={this.state.editing}
        />
        <Output
          list={filteredList}
          showAll={showAll}
          hide={this.hide}
          remove={this.remove}
          toggleAll={this.toggleAll}
          toggleAllStatus={toggleAll}
          searchItems={this.searchItems}
          edit={this.edit}
          boom={this.removeAll}
        />
      </React.Fragment>
    );
  }
}
