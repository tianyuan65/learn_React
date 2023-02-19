import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {nanoid} from 'nanoid'
import './Header.css'


export default class Header extends Component {
  static propTypes={
    // 对接收(在Header的角度上是接收，在App的角度上是传递)的props进行类型以及必要性的限制
    addTodo:PropTypes.func.isRequired
  }

  // 键盘事件的回调
  handleKeyUp=(event)=>{
    // 解构赋值获取keyCode,target
    const {keyCode,target}=event
    // 判断是否是回车按键
    if(keyCode!==13) return
    // 添加的todo名字不能为空
    if(target.value.trim()===''){
      alert('输入不能为空')
      return
    }
    // 准备好一个todo对象  id值,用户输入的值,是否勾选
    const todoObj={id:nanoid(),name:target.value,done:false}
    // 将todoObj传递给App
    this.props.addTodo(todoObj)
    // 清空输入
    target.value=''
  }

  render() {
    return (
      <div className="todo-header">
        {/* 绑定事件的元素和要操作的元素是同一个元素时，就不用ref，用事件对象(event) */}
        <input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认"/>
      </div>
    )
  }
}
