import React, { Component } from 'react'
// 引入Header
import Header from './components/Header'
// 引入List
import List from './components/List'
// 引入Footer
import Footer from './components/Footer'
// 引入样式
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header/>
          <List/>
          <Footer/>
        </div>
      </div>
    )
  }
}
