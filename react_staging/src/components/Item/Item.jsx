import React, { Component } from 'react'
import './Item.css'

export default class Item extends Component {

  // 标识鼠标移入、移出
  state={mouse:false}
  // 鼠标移入、移出的回调
  handleMouse=(flag)=>{
    return ()=>{
      this.setState({mouse:flag});
    }
  }

  // 勾选、取消勾选某一个todo的回调
  handleCheck=(id)=>{
    return (event)=>{
      this.props.updateTodo(id,event.target.checked)
    }
  }

  render() {
    const {id,name,done}=this.props
    const {mouse}=this.state
    return (
      <li style={{backgroundColor:mouse ? '#ddd' : 'white'}} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
        <label>
          <input type="checkbox" defaultChecked={done} onChange={this.handleCheck(id)}/>
          <span>{name}</span>
        </label>
        <button className="btn btn-danger" style={{display:mouse ? 'block' : 'none'}}>删除</button>
      </li>
    )
  }
}
