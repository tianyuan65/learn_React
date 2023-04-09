import React, { Component } from 'react'
import {NavLink,BrowserRouter,Route} from 'react-router-dom'
import Home from './pages/Home'  //Home是路由组件
import About from './pages/About'  //About是路由组件
import Header from './components/Header'  //Header是一般组件

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <Header a={1}/>
          </div>
        </div>
        <BrowserRouter>
          <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              {/* 原生html中，靠<a>跳转到不同的页面 */}
              {/* <a className="list-group-item active" href="./about.html">About</a>
              <a className="list-group-item" href="./home.html">Home</a> */}

              {/* 在React中靠路由链接实现切换组件(注意跳转地址写法：小写带杠，不加点)--编写路由链接 */}
              <NavLink activeClassName="atguigu" className="list-group-item" to="/about">About</NavLink>
              <NavLink activeClassName="atguigu" className="list-group-item" to="/home">Home</NavLink>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {/* 注册路由，靠路由进行匹配，匹配成功才展示对应的组件内容 */}
                <Route path="/about" component={About}/>
                <Route path="/home" component={Home}/>
              </div>
            </div>
          </div>
        </div>
        </BrowserRouter>
      </div>
    )
  }
}
