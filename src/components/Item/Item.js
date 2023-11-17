import React from 'react'
import './Item.scss'
import PropTypes from 'prop-types'
import Priority from '../Priority'

export default function Item({ todoTitle, toggleTodoCompleted, isCompleted, editTodo, removeTodo }) {
  const styleCompleted = () =>
    isCompleted
      ? {
          color: 'gray',
          textDecoration: 'line-through',
        }
      : null

  return (
    <li
      className='todo-item'
      onClick={toggleTodoCompleted}>
      <div className='wrapper__checkbox-title'>
        <label>
          {/* Check/Uncheck box */}
          {/* <input
            type="checkbox"
            onChange={toggleTodoCompleted}
            checked={isCompleted ? true : false}
          /> */}
          {/* Render Todo completed or not */}
          <span style={styleCompleted()}>{todoTitle}</span>
        </label>
      </div>

      <Priority />

      <div className='wrapper__edit-delete'>
        {/* Edit */}
        <span
          onClick={(e) => {
            e.stopPropagation()
            editTodo()
          }}>
          <button
            title='edit'
            className='btn__edit'>
            <i className='fas fa-edit'></i>
          </button>
        </span>
        {/* Delete */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            removeTodo()
          }}
          title='delete'
          className='btn__delete'>
          <i className='fas fa-trash'></i>
        </button>
      </div>
    </li>
  )
}

Item.propTypes = {
  todoTitle: PropTypes.string,
  toggleTodoCompleted: PropTypes.func,
  isCompleted: PropTypes.bool,
  editTodo: PropTypes.func,
  removeTodo: PropTypes.func,
}
