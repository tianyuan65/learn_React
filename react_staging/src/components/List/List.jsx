import React, { Component } from 'react'
import PropType from 'prop-types'
import Item from '../Item/Item'
import './List.css'

export default class List extends Component {
  static propTypes={
    // 对接收的(从App接收的)props进行类型以及必要性的限制
    todos:PropType.array.isRequired,
    updateTodo:PropType.func.isRequired,
    deleteTodo:PropType.func.isRequired
  }
  render() {
    // 从App接收props
    const {todos,updateTodo,deleteTodo}=this.props
    console.log('123');
    return (
      <ul className="todo-main">
        {
          
          todos.map(todo=>{
            return <Item key={todo.id} {...todo} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
          })
        }

      </ul>
    )
  }
}
