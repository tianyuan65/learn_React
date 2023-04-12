## 一、todoList案例相关知识点
* 1. 拆分组件、实现静态组件，注意：className、style的写法
* 2. 动态初始化列表，如何确定将数据放在哪个组件的state中？
    * --某个组件的使用：放在其自身的state中
    * --某些组件的使用：放在他们共同的父组件state中(官方称此操作为：状态提升)
* 3. 关于父子间的通信：
    * 1. 父组件给子组件传递数据：通过props传递
    * 2. 子组件给父组件传递数据：通过props传递，要求父组件提前给子组件传递一个函数
* 4. 注意defaultChecked和checked的区别，类似的还有defaultValue和value
    * --defaultChecked只在初次渲染的时候生效，更新时不受控制；checked在全过程中始终受到状态控制，必须通过绑定onChange事件来控制选中情况
* 5. 状态在哪里，操作状态的方法就在哪里
    * --对todos增删改查的方法都是在父组件中完成的

## 二、github搜索案例相关知识点
* 1. 设计状态时要考虑全面，例如带有网络请求的组件，要考虑请求失败怎么办
* 2. ES6小知识点：解构赋值+重命名
    * ```
        //传统解构赋值
        let obj={a:{b:{c:1}}}
        let obj2={a:{b:1}}
        console.log(obj.a.b.c)  //1

        //连续解构赋值
        const {a:{b:{c}}}=obj
        console.log(c)  //1

        //连续解构赋值并重命名
        const {a:{b:data}}=obj2
        console.log(data)  //1
      ```
* 3. 消息订阅与发布机制
    * 1. 限定月，再发布(理解：一种兄弟间隔空对话的感觉，父组件此时只是容纳子组件的容器)
    * 2. 适用于任意组件间通信
    * 3. 要在组件的componentWillUnmount中取消订阅
* 4. fetch发送请求(关注分离的设计思想)
    * ```
        try {
            const response=await fetch(`/api1/search/users2?q=${keyWord}`)
            const data=await response.json()
            PubSub.publish({isFirst:false,users:data.items})
            console.log(data);
        } catch (error) {
            console.log('请求出错',error);
            PubSub.publish({isFirst:false,err:error.message})
        }
      ```

## 三、路由的基本使用
* 1. 明确好界面中的导航区、展示区
* 2. 导航区的a标签改为Link标签
    * <Link to="/xxxxx">Demo</Link>
* 3. 展示区写Route标签进行路径的匹配
    * <Route path='/xxxx' component={Demo}>
* 4. <App>的最外侧包裹一个<BrowserRouter>或<HashRouter>

## 四、 路由组件与一般组件
* 1. 写法不同：
    * 一般组件：<Demo/>
    * 理由组件：<Route path="/demo" component={Demo}/>
* 2. 存放位置不同：
    * 一般组件：components
    * 路由组件：pages
* 3. 接收到的props不同：
    * 一般组件：写组件标签时传递了什么，就能展示、输出什么
        * ```<Header a={1}/>```
        * ![一般组件Header中写了什么，就在控制台输出什么](images/props%E4%BC%A0%E9%80%92%E4%BB%80%E4%B9%88%E5%B0%B1%E8%BE%93%E5%87%BA%E4%BB%80%E4%B9%88.PNG)
    * 路由组件：接收到三个固定的属性，history、location、match
        * 可以看到history中有一个location对象，与location属性里的内容一样，所以删了哈。location属性中的key是随机生成的，每次都不一样，所以删了。下面只保留了写代码时常用的几个，留下来的是必须懂的干货，详细去控制台可以看到
        * ```
            history: 
                go: ƒ go(n)
                goBack: ƒ goBack()
                goForward: ƒ goForward()
                push: ƒ push(path, state)
                replace: ƒ replace(path, state)
            location: 
                pathname: "/about"
                search: ""
                state: undefined
            match: 
                params: {}
                path: "/about"
                url: "/about"
          ```

## 五、NavLink与封装NavLink
* 1. NavLink可以实现路由链接的高亮，通过activeClassName指定样式名
* 2. 标签体内容是一个特殊的标签属性
* 3. 通过this.props.children可以获取组件标签的标签体内容

## 六、Switch的使用
* 1. 通常情况下，path和component是一一对应的关系。
* 2. Switch可以提高路由匹配效率(单一匹配)

## 七、解决多级路径刷新页面样式丢失的问题
* 1. public/index.html 中引入样式时不写./ 写 / (常用)
* 2. public/index.html 中引入样式时不写./ 写 %PUBLIC_URL% (常用)
* 3. 使用HashRouter

## 八、路由的严格匹配与模糊匹配
* 1. 默认使用的是模糊匹配(煎蛋机：【输入的路径】必须包含要【匹配的内容】，且顺序要一致)
* 2. 开启严格匹配：<Route exact={true} path="/home" component={Home}/>
* 3. 严格匹配不要随便开启，需要时再开，有些时候开启会导致无法继续匹配二级路由

## 九、Redirect的使用
* 1. 一般写在所有路由注册的最下方，当所有的路由都无法匹配时，跳转到Redirect指定的路由
* 2. 具体编码：
    * ```
        <Switch>
            {/* 注册路由，靠路由进行匹配，匹配成功才展示对应的组件内容 */}
            <Route path="/about" component={About}/>
            <Route path="/home" component={Home}/>
            {/* 重定向，和谁都匹配不上的时候，听从重定向的发落，用于兜底 */}
            <Redirect to="/about" />
        </Switch>
      ```

## 十、嵌套路由
* 1. 注册了子路由时要写上父路由的path值
* 2. 路由的匹配是按照注册路由的顺序进行的

## 十一、向路由组件传递参数
* 1. params参数
    * 路由链接(携带参数)：<Link to={'/home/message/details/${msgObj.id}/${msgObj.title}'}>{msgObj.title}</Link>
    * 注册路由(声明接收)：<Route path="/home/message/details/:id/:title" component={Details}/>
    * 接收参数：const {id,title}=this.props.match.params
* 2. search参数
    * 路由链接(携带参数)：<Link to={`/home/message/details/?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link>
    * 注册路由(声明接收)：<Route path="/home/message/details" component={Details}/>
    * 接收参数：const {search}=this.props.location
    * 备注：获取到的search是urlencoded编码字符串，需要借助querystring解析
* 3. state参数
    * 路由链接(携带参数)：<Link to={{pathname:'home/message/details',state:{id:msgObj.id,title:msgObj.title}}}>{msgObj.title}</Link>
    * 注册路由(声明接收)：<Route path="/home/message/details" component={Details}/>
    * 接收参数：const {search}=this.props.location.state
    * 备注：刷新也可以保留参数

## 十二、
