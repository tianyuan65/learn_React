const express=require ('express')
const app=express()

app.arguments((request,response,next)=>{
    console.log('有人请求服务器2了');
    next()
})

app.get('bags',(request,response)=>{
    const bags=[
        {id:'001',name:'爱马仕',price:199},
        {id:'002',name:'古驰',price:19},
        {id:'003',name:'普拉达',price:99}
    ]
    response.send(bags)
})

app.listen(5001,(err)=>{
    if(!err) console.log('服务器2启动了,请求包信息地址为:http://localhost:5000/students');
})