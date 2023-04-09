import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './index.css'

export default class List extends Component {
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

  componentDidMount(){
    this.token=PubSub.subscribe('atguigu',(_,stateObj)=>{
      this.setState(stateObj);
    })
  }

  componentWillUnmount(){
    PubSub.unsubscribe(this.token)
  }

  render() {
    const {users,isFirst,isLoading,err}=this.state
    return (
        <div className="row">
          {
            isFirst ? <h2>欢迎使用，输入关键字，随后点击搜索</h2> : 
            isLoading ? <h2>Loading...</h2> : 
            err ? <h2 style={{color:'red'}}>{err}</h2> : 
            users.map((userObj)=>{
              return(
                <div key={userObj.id} className="card">
                  <a rel="noreferrer" href={userObj.html_url} target="_blank">
                    <img alt="head_portrait" src={userObj.avatar_url} style={{width:'100px'}}/>
                  </a>
                  <p className="card-text">{userObj.login}</p>
                </div>
              )
            })
          }
        </div>
    )
  }
}
