import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import axios from 'axios'

export default class Search extends Component {
    search=()=>{
      // 获取用户的输入(连续解构赋值+重命名)
      // const {value}=this.keyWordElement  //常规解构赋值
      // console.log(value);
      const {keyWordElement:{value:keyWord}}=this  //连续解构赋值
      // 发送请求前通知List更新状态
        // isFirst:已经不是初次欢迎了，开始点击搜索了,isLoading:要发请求了
      // this.props.updateAppState({isFirst:false,isLoading:true})
      PubSub.publish({isFirst:false,isLoading:true})
      // 发送网络请求
      axios.get(`/api1/search/users2?q=${keyWord}`).then(
          response=>{
            // 请求成功后通知List更新状态
            // this.props.updateAppState({isLoading:false,users:response.data.items})
            PubSub.publish({isFirst:false,users:response.data.items})
          },
          error=>{
            // 请求后通知失败List更新状态
            // this.props.updateAppState({isLoading:false,err:error})
            PubSub.publish({isFirst:false,err:error})
          }
      )
    }

  render() {
    return (
        <section className="jumbotron">
          <h3 className="jumbotron-heading">搜索GitHub用户</h3>
          <div>
            <input ref={c=>this.keyWordElement=c} type="text" placeholder="输入关键词点击搜索"/>&nbsp;
            <button onClick={this.search}>搜索</button>
          </div>
        </section>
    )
  }
}


