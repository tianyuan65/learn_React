// React脚手架里在初始化脚手架的时候已经下载好这个了http-proxy-middleware，直接调用就行
const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports=function (app) {
    app.use(
        // 遇见api1前缀的请求，就会触发该代理配置
        createProxyMiddleware('/api1',{
            // 请求转发给哪一个端口
            target:'http://localhost:5000',
            // 控制服务器收到的请求头中Host的值，就是控制服务器知道请求是从哪儿发出去的，默认值为false
            changeOrigin:true,
            // 如果上面没有/api1，意味着无法给5000发送请求，但加了/api1，路径就不对了，所以需要在这一步把'^/api1'改成空串
            pathRewrite:{'^/api1':''}  //重写请求路径(必须写，要不然请求无法发送)
        }),
        createProxyMiddleware('/api2',{
            // 请求转发给哪一个端口
            target:'http://localhost:5001',
            // 控制服务器收到的请求头中Host的值，就是控制服务器知道请求是从哪儿发出去的，默认值为false
            changeOrigin:true,
            // 如果上面没有/api1，意味着无法给5000发送请求，但加了/api1，路径就不对了，所以需要在这一步把'^/api1'改成空串
            pathRewrite:{'^/api2':''}  //重写请求路径(必须写，要不然请求无法发送)
        })
    )
}