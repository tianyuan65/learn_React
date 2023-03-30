import React, { Component } from 'react'
import axios from 'axios'


export default class App extends Component {
  // 函数体
  getStudentData=()=>{
    axios.get('http://localhost:3001/api1/students').then(response=>{
      console.log('成功',response.data);
    },error=>{
      console.log('失败了',error);
    })
  }

  getBagsData=()=>{
    axios.get('http://localhost:3001/api2/bags').then(response=>{
      console.log('成功',response.data);
    },error=>{
      console.log('失败了',error);
    })
  }

  render(){
    return (
      <div>
        <button onClick={this.getStudentData}>点我获取学生数据</button>
        <button onClick={this.getBagsData}>点我获取包包数据</button>

      </div>
    )
  }
}
