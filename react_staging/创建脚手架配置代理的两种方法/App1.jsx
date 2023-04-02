import React, { Component } from 'react'
import axios from 'axios'

export default class App1 extends Component {
    getStudentData=()=>{
        axios.get('http://localhost:3001/api1/students').then(
            response=>{console.log(response.data);},
            error=>{console.log(error);}
        )
    }

    getBagData=()=>{
        axios.get('http://localhost:3001/api2/bags').then(
            response=>{console.log(response.data);},
            error=>{console.log(error);}
        )
    }

  render() {
    return (
      <div>
        <button onClick={this.getStudentData}>点我获取学生数据</button>
        <button onClick={this.getBagData}>点我获取包数据</button>
      </div>
    )
  }
}
