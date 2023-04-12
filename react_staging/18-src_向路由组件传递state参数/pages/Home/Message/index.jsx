import React, { Component } from 'react'
import {Link,Route} from 'react-router-dom'
import Details from './Details'


export default class Message extends Component {
    state={
        messageArr:[
            {id:'01',title:'message1'},
            {id:'02',title:'message2'},
            {id:'03',title:'message3'}
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
                                    {/* <Link to={`/home/message/details/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link> */}

                                    {/* 向路由组件传递search参数 */}
                                    {/* <Link to={`/home/message/details/?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link> */}

                                    {/* 向路由组件传递state参数 */}
                                    <Link to={{pathname:'/home/message/details',state:{id:msgObj.id,title:msgObj.title}}}>{msgObj.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
                {/* 注册路由，在此声明接收params参数 */}
                {/* <Route path="/home/message/details/:id/:title" component={Details}/> */}

                {/* search参数无需声明接收，正常注册路由即可，因为上面传递时有? */}
                {/* <Route path="/home/message/details" component={Details}/> */}

                {/* state参数无需声明接收，正常注册路由即可 */}
                <Route path="/home/message/details" component={Details}/>
            </div>
        )
    }
}
