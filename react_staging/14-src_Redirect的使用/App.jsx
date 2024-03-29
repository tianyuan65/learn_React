import React, { Component } from 'react'
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import Home from './pages/Home'  //Home是路由组件
import About from './pages/About'  //About是路由组件
import Header from './components/Header'  //Header是一般组件
import MyNavLink from './components/MyNavLink'

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
              {/* 把标签名(about/home)作为标签体内容(About/Home)写在标签(<MyNavLink></MyNavLink>)里 */}
              <MyNavLink to="/about">About</MyNavLink>
              <MyNavLink to="/home">Home</MyNavLink>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                <Switch>
                  {/* 注册路由，靠路由进行匹配，匹配成功才展示对应的组件内容 */}
                  <Route path="/about" component={About}/>
                  <Route exact path="/home" component={Home}/>
                  {/* 重定向，和谁都匹配不上的时候，听从重定向的发落，用于兜底 */}
                  <Redirect to="/about" />
                </Switch>
              </div>
            </div>
          </div>
        </div>
        </BrowserRouter>
      </div>
    )
  }
}
