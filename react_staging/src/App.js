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
  // 状态在哪里，操作状态的方法就在哪里，所以这个组件里有一堆函数，都是操作状态的方法

  // 初始化状态
  state={todos:[
    // 如下这四个都是todo对象
    {id:'001',name:'吃饭',done:true},
    {id:'002',name:'睡觉',done:false},
    {id:'003',name:'打游戏',done:true},
    {id:'004',name:'做白日梦',done:false}

  ]}

  // addTodo用于添加一个todo，接收的参数是todo对象
  addTodo=(todoObj)=>{
    // 获取原todos
    const {todos}=this.state
    console.log(typeof todoObj);
    // 追加一个todo  新传过来的todo数据,原来数组里的数据
    const newTodos=[todoObj,...todos]
    console.log(newTodos instanceof Array);
    // 更新状态
    this.setState({todos:newTodos})
    console.log(this.state);
  }

  // updateTodo用于更新一个todo对象
  updateTodo=(id,done)=>{
    // 获取状态中的todos
    const {todos}=this.state
    // 匹配处理数据
    const newTodos=todos.map((todoObj)=>{
      // 如果新添加的id和原来的id相等的话，就返回新的todo对象和更改后的done的值
      if(todoObj.id===id) return {...todoObj,done}
      // 如果匹配结果不同，原来的是什么就返回什么
      else return todoObj
    })
    this.setState({todos:newTodos})
  }

  // deleteTodo用于删除一个todo
  deleteTodo=(id)=>{
    // 获取原来的todos
    const {todos}=this.state
    // 删除指定id的todo对象
    const newTodos=todos.filter((todoObj)=>{
      return todoObj.id!==id
    })
    // 更新状态
    this.setState({todos:newTodos})
  }

  // checkAllTodo用于全选
  checkAllTodo=(done)=>{
    // 获取原来的todos
    const {todos}=this.state
    // 加工数据
    const newTodos=todos.map((todoObj)=>{
      return {...todoObj,done}
    })
    // 更新状态
    this.setState({todos:newTodos})
  }

  // clearAllDone用于清除所有已经完成的
  clearAllDone=()=>{
    // 获取原来的todos
    const {todos}=this.state
    // 过滤数据
    const newTodos=todos.filter((todoObj)=>{
      return !todoObj.done
    })
    // 更新状态
    this.setState({todos:newTodos})
  }

  render() {
    const {todos}=this.state
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo={this.addTodo}/>
          <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo}/>
          <Footer todos={todos} clearAllDone={this.clearAllDone} checkAllTodo={this.checkAllTodo}/>
        </div>
      </div>
    )
  }
}
