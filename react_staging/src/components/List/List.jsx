import React, { Component } from 'react'
import Item from '../Item/Item'
import './List.css'

export default class List extends Component {
  render() {
    const {todos,updateTodo}=this.props
    return (
      <ul className="todo-main">
        {
          todos.map(todo=>{
            return <Item key={todo.id} {...todo} updateTodo={updateTodo}/>
          })
        }

      </ul>
    )
  }
}
