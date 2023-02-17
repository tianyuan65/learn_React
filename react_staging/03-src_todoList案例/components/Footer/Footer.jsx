import React, { Component } from 'react'
import './Footer.css'

export default class Footer extends Component {

  // 全选checkBox的回调
  handleCheckAll=(event)=>{
    // 获取勾选的对象的数目
    this.props.checkAllTodo(event.target.checked)
  }

  // 清除所有已经完成的回调
  handleClearAllDone=()=>{
    this.props.clearAllDone()
  }

  render() {
    const {todos}=this.props
    // 已完成的个数 pre是这个函数上一次的返回值，第一次调用的话就是0 current就是函数上一次调用之后的返回值，在这里就写todo
    const doneCount=todos.reduce((pre,todo)=>pre+(todo.done ? 1 : 0),0)
    // 总数
    const total=todos.length
    
    return (
      <div className="todo-footer">
        <label>
          <input type="checkbox" onChange={this.handleCheckAll} checked={doneCount===total && total !== 0 ? true :false}/>
        </label>
        <span>
          <span>已完成{doneCount}</span>  /  全部{total}
        </span>
        <button onClick={this.handleClearAllDone} className="btn btn-danger">清除已完成任务</button>
        </div>
    )
  }
}
