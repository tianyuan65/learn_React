// 引入React核心库
import React from 'react'
// 引入react-dom
import ReactDOM from 'react-dom'
// 引入react-router-dom中的HashRouter
import {BrowserRouter} from 'react-router-dom'
// 引入App
import App from './App'

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
document.getElementById('root')
)
