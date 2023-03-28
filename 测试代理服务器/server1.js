const express=require('express')
const app=express()

app.use((request,response,next)=>{
    console.log('有人请求服务器1了');
    next()
})

app.get('/students',(request,response)=>{
    const students=[
        {id:'001',name:'tom',age:18},
        {id:'002',name:'jerry',age:19},
        {id:'003',name:'tony',age:20}
    ]
    response.send(students)
})

// 启动服务器的代码
app.listen(5000,(err)=>{
    if(!err) console.log('服务器1启动成功了,请求学生信息地址为:http://localhost:5000/students');
})