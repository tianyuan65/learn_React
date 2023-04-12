import React, { Component } from 'react'
import {Link,Route} from 'react-router-dom'
import Details from './Details'


export default class Message extends Component {
    state={
        messageArr:[
            {id:'01',title:'message1',content:[]},
            {id:'02',title:'message2',content:[]},
            {id:'03',title:'message3',content:[]}
        ]
    }
    render() {
        const {messageArr}=this.state
        return (
            <div>
                <ul>
                    {
                        messageArr.map((msgObj)=>{
                            return (
                                <li key={msgObj.id}>
                                    {/* 向路由组件传递params参数 */}
                                    <Link to={`/home/message/details/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
                {/* 注册路由，在此声明接收params参数 */}
                <Route path="/home/message/details/:id/:title" component={Details}/>
            </div>
        )
    }
}
