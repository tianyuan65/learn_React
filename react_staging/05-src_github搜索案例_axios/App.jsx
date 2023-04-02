import React, { Component } from 'react'
import Search from './components/Search'
import List from './components/List'

export default class App extends Component {
  // 初始化状态
  state={
    // users初始值为数组
    users:[],
    // 用于标识该应用或该网页是否是第一次打开，就是刚打开网页，什么都没有搜索
    isFirst:true,
    // 用于标识是否处于加载中，就是发送请求前把isLoading调为true，让用户看这个loading
      // 一旦数据返回，就需要把isLoading调为false，不让用户看见loading。
      // 不能一上来就loading，所以是false
    isLoading:false,
    // 存储请求相关的错误信息(代码写错了不往这里存)
    err:''
  }

  // 更新App的state
  updateAppState=(stateObj)=>{
    this.setState(stateObj)
  }

  render() {
    return (
      <div className="container">
        <Search updateAppState={this.updateAppState}/>
        <List {...this.state}/>
      </div>
    )
  }
}
