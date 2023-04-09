import React, { Component } from 'react'
import PubSub from 'pubsub-js'
// import axios from 'axios'

export default class Search extends Component {
    search=async()=>{
      // 获取用户的输入(连续解构赋值+重命名)
      // const {value}=this.keyWordElement  //常规解构赋值
      // console.log(value);
      const {keyWordElement:{value:keyWord}}=this  //连续解构赋值
      // 发送请求前通知List更新状态
        // isFirst:已经不是初次欢迎了，开始点击搜索了,isLoading:要发请求了
      // this.props.updateAppState({isFirst:false,isLoading:true})
      PubSub.publish('atguigu',{isFirst:false,isLoading:true})
      // 发送网络请求 --- 使用axios发送
      /* axios.get(`/api1/search/users2?q=${keyWord}`).then(
          response=>{
            // 请求成功后通知List更新状态
            // this.props.updateAppState({isLoading:false,users:response.data.items})
            PubSub.publish({isLoading:false,users:response.data.items})
          },
          error=>{
            // 请求后通知失败List更新状态
            // this.props.updateAppState({isLoading:false,err:error})
            PubSub.publish({isLoading:false,err:error.message})
          }
      ) */
    
      // 发送网络请求 --- 使用fetch发送(未优化)
      // fetch(`/api1/search/users2?q=${keyWord}`).then(
      //   response=>{
      //     console.log('联系服务器成功了');
      //     return response.json()
      //   },
      //   // error=>{console.log('联系服务器失败了',error);
      //   //   return new Promise(()=>{})
      //   // }
      // ).then(
      //   response=>{console.log('获取数据成功',response);},
      //   // error=>{console.log('获取数据失败',error);}
      // )

      // 发送网络请求 --- 使用fetch发送(已优化)
      try {
        const response=await fetch(`/api1/search/users2?q=${keyWord}`)
        const data=await response.json()
        PubSub.publish('atguigu',{isLoading:false,users:data.items})
        console.log(data);  //{items: Array(9)}
      } catch (error) {
        console.log('请求出错',error);
        PubSub.publish({isLoading:false,err:error.message})
      }
      
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


