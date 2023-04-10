import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

// 在MyNavLink组件中二次封装NavLink
export default class MyNavLink extends Component {
  render() {
    console.log(this.props);
    return (
        <NavLink activeClassName="atguigu" className="list-group-item" {...this.props} />
    )
  }
}
