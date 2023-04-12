import React, { Component } from 'react'
// import qs from 'querystring'

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
    // const {search}=this.props.location
    // 解构赋值 将提取来的search字符串转成对象
    // const {id,title}=qs.parse(search.slice(1))

    // 接收state参数
    const {id,title}=this.props.location.state || {}
   
    const fidnResult=DetailsData.find((detailObj)=>{
        return detailObj.id===id
    }) || {}
    return (
      <ul>
        <li>ID:{id}</li>
        <li>TITLE:{title}</li>
        <li>CONTENT:{fidnResult.content}</li>
      </ul>
    )
  }
}
