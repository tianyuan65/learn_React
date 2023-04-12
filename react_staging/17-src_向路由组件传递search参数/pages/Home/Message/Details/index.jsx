import React, { Component } from 'react'
import qs from 'querystring'

// 把对象转为多组key=value字符串用&符号进行分隔，这种写法叫做urlencoded编码
// let obj={name:'tom',age:18}  //name=tom&age=18    key=value&key=value
// console.log(qs.stringify(obj))  //name=tom&age=18

// 多组用&分隔的key=value字符串转为对象
// let str='bagName=GUCCI&price=19999'
// console.log(qs.parse(str));  //bagName:GUCCI,price:19999

const DetailsData=[
    {id:'01',content:'Tears of Themis'},
    {id:'02',content:'请提高掉率，或者给我晶片'},
    {id:'03',content:'要不然mhy去死吧'}
]
export default class Details extends Component {
  render() {
    console.log(this.props);

    // 接收params参数
    // const {id,title}=this.props.match.params

    // 接收search参数
    const {search}=this.props.location
    // 解构赋值 将提取来的search字符串转成对象
    const {id,title}=qs.parse(search.slice(1))

    const fidnResult=DetailsData.find((detailObj)=>{
        return detailObj.id===id
    })
    return (
      <ul>
        <li>ID:{id}</li>
        <li>TITLE:{title}</li>
        <li>CONTENT:{fidnResult.content}</li>
      </ul>
    )
  }
}
