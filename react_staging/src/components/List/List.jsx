import React, { Component } from 'react'

export default class List extends Component {
  render() {
    return (
      <ul className="todo-main">
            <li>
              <label>
                <input type="checkbox"/>
                <span>XXXXX</span>
              </label>
              <button className="btn btn-danger" style={{display:'none'}}>删除</button>
            </li>
            <li>
              <label>
                <input type="checkbox"/>
                <span>YYYYYY</span>
              </label>
              <button className="btn btn-danger" style={{display:'none'}}>删除</button>
            </li>
          </ul>
    )
  }
}
