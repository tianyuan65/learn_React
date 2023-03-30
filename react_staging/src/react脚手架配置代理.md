## 方法一
* 在package.json中追加如下配置
    * ```"proxy":"http://localhost:5000"```
    * 说明：
        * 1. 优点：配质检单，前端请求资源时可以不加任何的前缀
        * 2. 缺点：不能配置多个代理
        * 3. 工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000(优先匹配前端资源)

## 方法二
* 1. 第一步：创建代理配置文件
    * 在src下创建配置文件：src/setupProxy.js
* 2. 编写setupProxy.js配置具体代理规则：
    * ```
        // React脚手架里在初始化脚手架的时候已经下载好这个了http-proxy-middleware，直接调用就行
        const proxy=require('http-proxy-middleware')

        module.exports=function (app) {
            app.use(
                // 遇见api1前缀的请求，就会触发该代理配置
                proxy('/api1',{
                    // 请求转发给哪一个端口
                    target:'http://localhost:5000',
                    // 控制服务器收到的请求头中Host的值，就是控制服务器知道请求是从哪儿发出去的，默认值为false
                    changeOrigin:true,
                    // 如果上面没有/api1，意味着无法给5000发送请求，但加了/api1，路径就不对了，所以需要在这一步把'^/api1'改成空串
                    pathRewrite:{'^/api1':''}  //重写请求路径(必须写，要不然请求无法发送)
                }),
                proxy('/api2',{
                    target:'http://localhost:5001',
                    // 能够让服务器指导请求是从哪儿发出去的，默认值为false
                    changeOrigin:true,
                    // 如果上面没有/api1，意味着无法给5000发送请求，但加了/api1，路径就不对了，所以需要在这一步把'^/api1'改成空串
                    pathRewrite:{'^/api2':''}
                }),
            )
        }
      ```
* 说明：
    * 1. 优点：可以配置多个代理，可以灵活地控制请求是否走代理
    * 2. 缺点：配置繁琐，前端请求资源时必须加前缀```/api```