import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Header extends Component {

  back=()=>{
    this.props.history.goBack()
  }

  forward=()=>{
    this.props.history.goForward()
  }

  go=()=>{
      this.props.history.go(1)
  }

  render() {
    // console.log('Header组件收到的props是',this.props);
    return (
        <div className="page-header">
          <h2>React Router Demo</h2>

          <button onClick={this.back}>回退</button>&nbsp;
          <button onClick={this.forward}>前进</button>&nbsp;
          <button onClick={this.go}>go</button>
        </div>
    )
  }
}

// 向外暴露的是withRouter加工完之后的Header，简单来说，暴露的是withRouter函数调用的返回值，其返回值是一个新组件
export default withRouter(Header)
