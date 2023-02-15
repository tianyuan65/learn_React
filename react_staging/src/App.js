import React, { Component } from 'react'
// 引入Header
import Header from './components/Header/Header'
// 引入List
import List from './components/List/List'
// 引入Footer
import Footer from './components/Footer/Footer'
// 引入样式
import './App.css'

export default class App extends Component {

  // 初始化状态
  state={todos:[
    {id:'001',name:'吃饭',done:true},
    {id:'002',name:'睡觉',done:false},
    {id:'003',name:'打游戏',done:true},
    {id:'004',name:'做白日梦',done:false}

  ]}

  // addTodo用于添加一个todo，接收的参数是todo对象
  addTodo=(todoObj)=>{
    // 获取原todos
    const {todos}=this.state
    // 追加一个todo  新传过来的todo数据,原来数组里的数据
    const {newTodos}=[todoObj,...todos]
    // 更新状态
    this.setState({todos:newTodos})
  }

  render() {
    const {todos}=this.state
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo={this.addTodo}/>
          <List todos={todos}/>
          <Footer/>
        </div>
      </div>
    )
  }
}
