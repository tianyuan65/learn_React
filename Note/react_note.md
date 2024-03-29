### React
* **React简介**
    * 什么是react?
        * React用于构建用户界面的JS库。是一个将数据渲染为HTML视图的开源JS库。
    * React特点
        * 采用组件化模式、声明式编码，提高开发效率及组建复用率
        * 在ReactNative中可以使用React语法进行移动端开发(如安卓或IOS应用)
        * 使用虚拟DOM(不是页面上的真是DOM,是React操作的,专门为React用的，没放在页面上的DOM,放在代码运行时电脑的内存里)和优秀的Diffing算法啊，尽量减少与真实DOM的交互
    * React高效的原因
        * 使用虚拟(virtual)DOM不总是直接操作界面真实DOM
        * DOMDiffing算法,最小化页面重绘
* **第一章：React入门**  
    * 1.引入三个包
        * 先引入react.development.js
        * 后引入react-dom.development.js
        * 再引入babel.min.js 
    * 2. 创建一个容器
        * ```<div id="test"></div>```
    * 3. 创建虚拟DOM,渲染到容器中
        * 
        ```
            <!-- 表示这里写的不是js,是jsx,且此处一定要写babel,啥都不写那默认就是js -->
            <script type="text/babel">
                // 1.创建虚拟DOM,此处不要写引号，因为不是字符串
                 const VDOM=<h1>Hello,React</h1>
                // 2.渲染虚拟DOM到页面
                ReactDOM.render(VDOM,document.getElementById("test"))
            </script>
        ```
        * 顺利的话会在页面中的div容器里添加h1,但是我没有
            * ![向容器中添加h1](images/在div容器里添加上了h1.PNG)
    * **两种方法创建虚拟DOM**
        * 1. 使用JSX创建
            * 
            ```
            const VDOM=(
                <h1 id="title">
                    <span>Hello,React</span>
                </h1>
            )
            ```
        * 2.使用JS创建
            * 
            ``` 
                const VDOM=React.createElement('h1',{id:'title'},React.createElement('span',{},'Hello,Raect'))
            ```
        * **使用JS创建虚拟DOM比使用JSX要复杂,还是比较推荐使用JSX来创建,且JSX使用babel翻译后就是JS的格式** 
        * 关于虚拟DOM:
            * 1.本质是Object类型的对象(一半对象)
            * 2.虚拟DOM比较“轻”,真实DOM比较“重,因为虚拟DOM是React内部在用,无需真实DOM上那么多的属性
            * 3.虚拟DOM最终会被React转化为真实DOM,呈现在页面上
            * ```
                const TDOM=document.getElementById('demo')
                console.log('虚拟DOM',VDOM);  //虚拟DOM Object
                console.log('真实DOM',TDOM);  //真实DOM <div id="demo"></div>
                debugger;
            ```

    * **JSX基础语法规则**
        * 1.定义虚拟DOM时,不能使用引号
        * 2.标签中混入JS表达式时要用{}
        * 3.样式的类名指定不要用class,要用className
        * 4.内联样式,要用style={{key:value}}形式写
        * 5.虚拟DOM必须只有一个根标签,要不然全是报错
        * 6.标签必须闭合,如input标签,要么写成```<input type="text"></input>```；要么让标签自闭合```<input type="text" />```
        * 7.标签首字母
            * (1)若小写字母开头,则将该标签转为html中同名元素,若html中无改标签对应的同名元素,则报错
            * (2)若大写字母开头,react就去渲染对应的组件,若组件没有定义，则报错

        * JSX小练习
            * 给react数组，react会帮助遍历数组，但如果给了对象，无法展示任何东西，如图：
                * ![不能定义对象](images/%E4%B8%8D%E8%83%BD%E6%8E%BA%E5%AF%B9%E8%B1%A1.PNG)

* **第二章React面向组件编程**
    * 什么是组件？
        * 组件是用来实现局部功能效果的代码和资源的集合(html/css/js/image等待)
        * 作用:复用编码，简化项目编码，提高运行效率
    * 函数式组件
        * 用函数的形式创建一个组件,组件名头一个字母必须大写,因为小写的话会去html标签中找，没有找到就会给你报错；并且必须要有返回值
            * ```
                function MyComponent() {
                    // console.log(this);  //此处的this是undefined，因为babel编译后开启了严格模式
                    return <h2>他是用函数定义的组件(适用于[简单组件]的定义)</h2>
                }
              ```
        * 渲染组件到页面上，```ReactDOM.render(<MyComponent/>,document.getElementById('test'))```
        * 执行了ReactDOM.render(<MyComponent/>...)之后，发生了什么？
            * 1.React解析组件标签，找到了MyComponent组件
            * 2.发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中
    * 类式(Class)组件
        * 无需单独创建类，只需从React.Component继承，```class MyComponent extends React.Component{}```
        * 执行过程：
            * React解析组件标签，找到了MyComponent组件
            * 2.发现组件是使用类定义的，随后new出该类的实例，并通过该实例调用到原型上的render方法
            * 3.将render返回的虚拟DOM换位真实DOM，随后呈现在页面中
        * 另外，
            * render是放在哪里的？  MyComponent的原型对象上，供实例使用
            * render中的this是谁？  MyComponent的实例对象 <=> MyComponent组件的实例对象
                * ![render中的this](images/render%E4%B8%AD%E7%9A%84this.PNG)

    * **组件实例的三大属性**
        * 1.state 
            * state是组件对象最重要的属性，值是对象(可以包含多个key-value的组合)，记住！！！！绝对不可能是数组
            * 组价被称为**状态机**，通过更新组件的state来更新对应的页面显示(重新渲染组件)
            * **强烈注意**
                * 组件中的render方法中的this为组件实例对象
                * 组件自定义的方法中this为undefined，如何解决？
                    * 强制绑定this：通过函数对象的bind()
                    * 箭头函数，但是必须写成赋值语句+箭头函数的形式
                * 状态数据，不能直接修改或者更新，就用setState
            * 使用react开发工具查看，组件状态里有哪些数据都被罗列了
                * ![用react开发工具，也就是components](images/%E6%95%B0%E6%8D%AE%E7%BD%97%E5%88%97.PNG)
            * setState的使用
                * ```
                    <script type="text/babel">
                        //1.创建组件
                        class Weather extends React.Component{
                            constructor(props){
                                super(props)
                                // 初始化状态
                                this.state={isHot:false}
                                // 解决changeWeather中this指向问题
                                this.changeWeather=this.changeWeather.bind(this)
                            }
                            // render里的this就是组件的实例对象，render中做的最多的事就是，读取状态，根据状态的值做展示
                            render(){
                                // 读取状态
                                const {isHot,wind}=this.state
                                // 不用括号，括号是立即执行
                                // 将demo函数赋值给onClick作为回调，点击时，帮助调用demo
                                return <h1 onClick={this.changeWeather}>今天天真{isHot ? '热':'冷'}</h1>
                            }
                            changeWeather() {
                                // changeWeather放在哪里？  Weather的原型对象上，供实例使用
                                // 通过Weather实例调用changeWeather时，changeWeather中的态度就是Weather实例
                                // 由于changeWeather是作为onClick的回调，所以不是通过实例调用的，是直接调用的
                                // 类中的方法默认开启了局部开启的严格模式，所以changeWeather中的this为undefined
                                // console.log(this);  //{isHot: false}

                                // 获取原来的isHot值
                                const isHot=this.state.isHot
                                // 严重注意：状态必须通过setState进行更新，且更新是一种是合并，不是替换
                                this.setState({isHot:!isHot})

                                // 严重注意：状态(state)不可直接更改，下面这行就是直接更改！！！
                                // this.state.isHot=!isHot //这是错误的写法
                            }
                        }
                        //2.渲染组件到页面
                        ReactDOM.render(<Weather/>,document.getElementById('test'))

                        const w=new Weather()
                        w.changeWeather()
                    </script>
                ```
                * 构造器调用几次？  1次
                * render调用几次？  1+n次，1是初始化的那次，n是状态更新的次数
                * changeWeather调用几次？  点几次，调用几次
                * 严重注意：状态必须通过setState进行更新，且更新是一种是合并，不是替换
                    * ```this.setState({isHot:!isHot})```
            * state的简写方式，可以在类中直接写赋值语句，如下
                * ```
                    <script type="text/babel">
                        //1.创建组件
                        class Weather extends React.Component{
                            // 初始化状态
                            // 向Weather的实例对象身上添加一个属性，名为state，值为一个对象，也就是{isHot:false,wind:'刮大风'}
                            state={isHot:false,wind:'刮大风'}
                            
                            render(){
                                const {isHot,wind}=this.state
                                return <h1 onClick={this.changeWeather}>今天天真{isHot ? '热':'冷'},{wind}</h1>
                            }

                            // 自定义方法  写成赋值语句(constructor) + 箭头函数的形式
                            changeWeather = ()=> {
                                const isHot=this.state.isHot
                                this.setState({isHot:!isHot})

                            }
                        }
                        //2.渲染组件到页面
                        ReactDOM.render(<Weather/>,document.getElementById('test'))
                    </script>
                  ```
                * 可以看出构造器没了，直接向Weather的实例对象身上添加了属性，名为state，值为一个对象；且自定义的方法，写成了赋值语句 + 箭头函数的形式，
                    * 因为箭头函数有一大特点，就是没有自己的this，但是如果要在箭头函数里使用了this关键字的话，会找其外层函数的this作为箭头函数的this，在上面的代码中，箭头函数内打印出来的this就是Weather的实例，如图：
                        * ![箭头函数内打印出来的this指向，很明显是组件Weather的实例](images/%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0%E7%9A%84this.png)
        * 2.props
            * 理解：
                * 1）每个组件对象都会有props(properties的简写)属性
                * 2）组件标签的所有属性都保存在props中
            * 作用：
                * 1）通过标签属性从组件外向组件内传递变化的数据/props主要用来传递数据，比如组件之间进行传值
                * 2）注意：组件的内部不要修改props数据，也不可改，因为props是只读的
            * 基本使用：
                * ```
                    <script type="text/babel">
                        //创建组件
                        class Person extends React.Component{
                            render(){
                                // console.log(this);
                                const {name,age,gender}=this.props
                                return (
                                    <ul>
                                        <li>姓名：{name}</li> 
                                        <li>性别：{gender}</li>    
                                        <li>年龄：{age+1}</li>
                                    </ul>
                                )
                            }
                        }

                        // 渲染组件
                        ReactDOM.render(<Person name="tom" age={18} gender="female"/>,document.getElementById('test1'))
                        ReactDOM.render(<Person name="jerry" age={19} gender="male"/>,document.getElementById('test2'))
                        
                        const p={name:'老司',gender:'female',age:24}
                        ReactDOM.render(<Person {...p} />,document.getElementById('test3'))
                    </script>
                  ```
            * 对props进行限制
                * ```
                    <script type="text/babel">
                        //创建组件
                        class Person extends React.Component{
                            render(){
                                // console.log(this);
                                const {name,gender,age}=this.props
                                // props是只读的
                                // this.props.name='jack' //此行代码会报错，因为props是只读的
                                return (
                                    <ul>
                                        <li>姓名：{name}</li> 
                                        <li>性别：{gender}</li>    
                                        <li>年龄：{age+1}</li>
                                    </ul>
                                )
                            }
                        }
                        // 对标签属性进行类型、必要性的限制
                        // Person.属性规则={name:'必传，字符串'}
                        Person.propTypes={
                            name:PropTypes.string.isRequired,  //限制name必传，且为字符串
                            gender:PropTypes.string,  //限制gender为字符串
                            age:PropTypes.number,  //限制age为数值
                            speak:PropTypes.func,  //限制speak方法为函数
                        }
                        // 指定默认的标签属性值
                        Person.defaultProps={
                            gender:'male',  //gender默认值为male
                            age:19  //age默认值为19
                        }

                        // 渲染组件
                        ReactDOM.render(<Person name="tom" gender="female" speak={speak}/>,document.getElementById('test1'))
                        ReactDOM.render(<Person name="jerry" gender="male" age={19}/>,document.getElementById('test2'))
                        
                        const p={name:'老司',age:24,gender:'female'}
                        // ReactDOM.render(<Person name={p.name} gender={p.gender} age={p.age} />,document.getElementById('test3'))
                        ReactDOM.render(<Person {...p} />,document.getElementById('test3'))
                        
                        function speak() {
                            console.log('我说话了');
                        }
                    </script>
                  ```
            * props简写方式
                * ```
                    <script type="text/babel">
                        //创建组件
                        class Person extends React.Component{
                            // 对标签属性进行类型、必要性的限制
                            // Person.属性规则={name:'必传，字符串'}
                            static propTypes={
                                name:PropTypes.string.isRequired,  //限制name必传，且为字符串
                                gender:PropTypes.string,  //限制gender为字符串
                                age:PropTypes.number,  //限制age为数值
                                speak:PropTypes.func,  //限制speak方法为函数
                            }

                            // 指定默认的标签属性值
                            static defaultProps={
                                gender:'male',  //gender默认值为male
                                age:19  //age默认值为19
                            }

                            render(){
                                // console.log(this);
                                const {name,gender,age}=this.props
                                // props是只读的
                                // this.props.name='jack' //此行代码会报错，因为props是只读的
                                return (
                                    <ul>
                                        <li>姓名：{name}</li> 
                                        <li>性别：{gender}</li>    
                                        <li>年龄：{age+1}</li>
                                    </ul>
                                )
                            }
                        }

                        // 渲染组件
                        ReactDOM.render(<Person name="tom" gender="female" age={18} speak={speak}/>,document.getElementById('test1'))
                        ReactDOM.render(<Person name="jerry" gender="male" age={19}/>,document.getElementById('test2'))
                        
                        const p={name:'老司',age:24,gender:'female'}
                        // ReactDOM.render(<Person name={p.name} gender={p.gender} age={p.age} />,document.getElementById('test3'))
                        ReactDOM.render(<Person {...p} />,document.getElementById('test3'))
                        
                        function speak() {
                            console.log('我说话了');
                        }
                    </script>
                  ```
            * 操作：
                * 扩展属性：将对象的所有属性通过props传递
                    * ```<Person {...p} />```
                * 默认属性值
                    * ```
                        Person.propTypes={
                            name:PropTypes.string.isRequired,  //限制name必传，且为字符串
                            gender:PropTypes.string,  //限制gender为字符串
                            age:PropTypes.number,  //限制age为数值
                        }
                      ```
                * 组件类的构造器
                    * ```
                        constructor(props){
                            // 构造器是否接收props，是否传递给super，取决于是否希望在构造器中通过this访问props
                            // console.log(props);
                            super(props)
                            // 构造器中可以不传props参数，super方法中也可以不传props，虽然看起来没什么影响，但是在构造器中无法使用this(实例).props的方式取值
                                // 如果想要在构造器内使用this.props的方式取值，就需要向构造器和super中传递props参数
                            console.log('constructor',this.props);  //constructor Object
                        }
                      ```
        * 3.refs 
            * 可以理解为打标识。不需要写id，最终会收集所有以ref为标识的标签，到refs属性中，收集之后的ref，不是虚拟DOM，而是该虚拟DOM转成真实DOM之后的节点
            * 字符串形式的refs
                * ![使用refs属性，将虚拟DOM转成真实DOM](images/%E4%BD%BF%E7%94%A8refs%E5%B1%9E%E6%80%A7%E8%99%9A%E6%8B%9FDOM%E8%BD%AC%E4%B8%BA%E7%9C%9F%E5%AE%9EDOM.PNG)
            * 回调函数形式的refs
                * ```<input ref={(a)=>{this.input1=a}} type="text" placeholder="点击按钮提示数据"/>&nbsp;```的意思是把ref当前所处的节点(也就是input)，挂在实例自身上(this)，取名为input1
            * createRef创建ref容器
                * ```myRef=React.createRef()```
                * ```<input ref={this.myRef} />```
            * 发生事件的元素是要操作的元素时，可以省略ref
                * ![省略ref](images/%E4%B8%8D%E8%A6%81%E8%BF%87%E5%BA%A6%E4%BD%BF%E7%94%A8ref.PNG)
            * 非受控组件
                * 页面中所有的输入类的DOM，现用现取就是**非受控组件**，就像：
                    * 啥是现用现取？点击了登录按钮，就会调用handleSubmit回调函数，就会取```const {username,password}=this```这个节点，```alert(`你输入的用户名是:${username.value},密码是:${password.value}`)```这个操作是取节点的value值，这就属于现用现取
                    * ```
                        class Login extends React.Component{
                            handleSubmit=(event)=>{
                                event.preventDefault()  //阻止表单提交
                                const {username,password}=this
                                alert(`你输入的用户名是:${username.value},密码是:${password.value}`)
                            }

                            render(){
                                return(
                                    <form onSubmit={this.handleSubmit}>
                                        用户名：<input ref={c=>this.username=c} type="text" name="usrename"/>
                                        密码：<input ref={c=>this.password=c} type="password" name="password"/>
                                        <button>登录</button>
                                    </form>
                                )
                            }
                        }
                    ```
            * 受控组件
                * 页面中所有输入类的DOM，下面的就是input框，随着用户的输入，可以把值维护到状态中，也就是state中，需要的时候，直接从状态中取出使用，这就是**受控组件**，优点是，可以省略掉ref
                * 取出来的值是什么取决于是怎么放的，怎么取值取决于值放在哪儿了，```const {username,password}=this.state```中，this.state里拿到的username和password是真正的值，所以弹窗中不能写```username.value```或```password.value```，取出来的值会是undefined
                    * ![](images/%E5%80%BC%E5%92%8B%E6%94%BE%E7%9A%84%E5%B0%B1%E5%92%8B%E5%8F%96.PNG)
                * ```
                    class Login extends React.Component{
                        // 初始化状态
                        state={
                            username:'', //用户名
                            password:''  //密码
                        }

                        // 保存用户名到状态中
                        saveUsername=()=>{
                            this.setState({username:event.target.value})
                        }

                        // 保存密码到状态中s
                        savePassword=()=>{
                            this.setState({password:event.target.value})
                        }

                        // 表单提交的回调
                        handleSubmit=(event)=>{
                            event.preventDefault()  //阻止表单提交
                            const {username,password}=this.state
                            alert(`你输入的用户名是:${username},密码是:${password}`)
                        }

                        render(){
                            return(
                                <form onSubmit={this.handleSubmit}>
                                    用户名：<input onChange={this.saveUsername} type="text" name="usrename"/>
                                    密码：<input onChange={this.savePassword} type="password" name="password"/>
                                    <button>登录</button>
                                </form>
                            )
                        }
                    }
                ```
        * 高阶函数&函数柯里化
            * 下面这种情况的含义是saveFormData的返回值(这个返回值依然是个函数，这个函数才是真正的onChange的回调)交给了onChange作为回调，不是将saveFormData函数交给onChange作为回调
                * ```用户名：<input onChange={this.saveFormData('username')} type="text" name="usrename"/>```
                * ```用户名：<input onChange={this.saveFormData} type="text" name="usrename"/>```这样才是将saveFormData函数交给onChange做回调
            * 不用函数柯里化的实现
                * onchange需要一个函数作为回调，React就会调用函数，传入event参数，通过event.target.value就可以取到值，在下面的箭头函数中调用了this.saveFormData，在这里没用柯里化，但是也实现了
                    * ```
                        class Login extends React.Component{
                            // 初始化状态
                            state={
                                username:'', //用户名
                                password:''  //密码
                            }

                            // 保存表单数据到状态中
                            saveFormData=(dataType,event)=>{
                                this.setState({[dataType]:event.target.value})
                            }
                            
                            // 表单提交的回调
                            handleSubmit=(event)=>{
                                event.preventDefault()  //阻止表单提交
                                const {username,password}=this.state
                                alert(`你输入的用户名是:${username},密码是:${password}`)
                            }

                            render(){
                                return(
                                    <form onSubmit={this.handleSubmit}>
                                        用户名：<input onChange={event=>this.saveFormData('username',event.target.value)} type="text" name="usrename"/>
                                        密码：<input onChange={event=>this.saveFormData('password',event.target.value)} type="password" name="password"/>
                                        <button>登录</button>
                                    </form>
                                )
                            }
                        }
                      ```
        * 组件的生命周期(旧)，React的s生命周期就像在关键的点，调用特殊的函数componentDidMount和componentWillUnmount函数，在函数里面完成特殊的事情
            * 组件挂载流程，就像人的一生，
                * 出生了 ==> 组件挂载完毕后调用componentDidMount函数
                * 中间学会了很多事 ==> 记录一下
                * 病危了(还没死) ==> 调用componentWillUnmount函数，在里面清除定时器
            * ```
                // 创建组件
                // 生命周期回调函数 <=> 生命周期钩子函数 <=> 生命周期函数 <=> 生命周期钩子
                class Life extends React.Component{
                    state={opacity:1}

                    // 赋值语句+箭头函数，作为事件的回调函数使用
                    death=()=>{
                        // 卸载组件
                        ReactDOM.unmountComponentAtNode(document.getElementById('test'))
                    }
                    
                    // 它为啥不写成赋值语句+箭头函数的形式？因为它跟render是兄弟，这个函数是通过Life的实例对象调用的
                    // 组件挂载完毕之后调用
                    componentDidMount(){
                        this.timer=setInterval(()=>{
                            // 获取原状态
                            let {opacity}=this.state
                            // 减小0.1
                            opacity-=0.1
                            if(opacity<=0) opacity=1
                            // 设置新的透明度/更新状态
                            this.setState({opacity})
                        },200)
                    }

                    // 组件将要卸载
                    componentWillUnmount(){
                        // 清除定时器
                        clearInterval(this.timer)
                    }

                    // render调用的时机：初始化渲染、状态更新之后
                    render(){
                        console.log('render');
                        
                        return (
                            <div>
                                <h2 style={{opacity:this.state.opacity}}>React学不会怎么办?</h2>
                                <button onClick={this.death}>老师说别活了</button>
                                
                            </div>
                        )
                    }
                }
              ```
                * 理解：
                    * 1.组件从创建到死亡会经历一些特定的阶段
                    * 2.React组件中包含一系列钩子函数(生命周期回调函数)，会在特定的时刻调用
                    * 我们在定义组件时，会来特定的生命周期回调函数中做特定的工作
            * setState流程  --正常更新，是建立在真的修改了里面的数据，才会帮我更新，**前提是```shouldComponentUpdate()```这个阀门要开启**
                * shouldComponentUpdate()  --这个钩子函数控制组件更新的“阀门”，即使不写底层的React也会帮我补一个，而且返回值为true。但是如果我写了就以我写的为准，我手动写的这个必须要亲自写个返回值，且值为true，要不然后边写多少都白扯
                * componentWillUpdate()  --组件将要更新的钩子
                * componentDidUpdate()  --组件更新完毕的钩子，即使把它写在最前面也不是先调用它的，它肯定是在倒数第二部的时候被调用的
            * forceUpdate流程  --强制更新，是即使没有修改组件里的数据或状态，就是想更新一下，就可以走这条路。不像setState()，需要有shouldComponentUpdate()这个阀门，强制更新里面，因为没有写死，数据或状态修改没修改都可以更新
                * ```
                    force=()=>{
                        this.forceUpdate()
                    }
                  ```
            * 父组件render流程
                * componentWillReceiveProps()，按照流程写完执行，首先会调用render()，**前提是render里写了输出**，**shouldComponentUpdate阀门必须是开启才能正常执行**，然后点击按钮页面会变化，并且后面的钩子函数会按顺序执行，如图(图放在代码下面)：
                    * ```
                        class B extends React.Component{
                            // 组件将要接受新的props的钩子
                            componentWillReceiveProps(props){
                                console.log('B--componentWillReceiveProps',props);

                            }
                            shouldComponentUpdate(){
                                console.log('B--shouldComponentUpdate');
                                return true
                            }
                            // 组件将要更新的钩子
                            componentWillUpdate(){
                                console.log('B---componentWillUpdate');
                            }
                            // 组件更新完毕的钩子
                            componentDidUpdate(){
                                console.log('B---componentDidUpdate');
                            }
                            render(){
                                console.log('B--render');
                                return (
                                    <div>我是B组件,接收到的游戏是:{this.props.gameName}</div>
                                )
                            }
                        }
                      ```
                    * ![执行前](images/%E9%A6%96%E5%85%88%E8%B0%83%E7%94%A8render.PNG)
                    * ![执行后](images/gameName%E5%8F%98%E4%BA%86%EF%BC%8C%E9%92%A9%E5%AD%90%E4%BB%AC%E6%89%A7%E8%A1%8C%E4%BA%86.PNG)
        * 组价的生命周期(新)，相较于旧的生命周期，即将废弃三个Will钩子(componentWillReceiveProps,componentWillMount,componentWillUpdate)，而添加了两个新的钩子(getDerivedStateFromProps,getSnapshotBeforeUpdate)，如图：
            * ![新react生命周期图](images/04-react%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F(%E6%96%B0).PNG)
                * 新的生命周期(图)里的**React更新DOM和refs**是一个固定的小环节，在这个环节不会有什么输出
            * getDerivedStateFromProps()，直译为从props得到派生/衍生的状态，但是这种派生状态会导致代码冗余，且组件难以维护，所以，了解即可。
                * ```
                    static getDerivedStateFromProps(props){
                        console.log('Count--getDerivedStateFromProps',props);
                        return props
                    }
                  ```
                * 加上上面这段代码我的状态值(state值)在任何情况下，都取决于props。无论初始化状态的值或是修改的值都会无效，这适用于极特殊的状态，就是状态值完全取决于props的时候。若state的值在任何时候都取决于props，那么可以使用(不是必须)getDerivedStateFromProps
            * getSnapshotBeforeUpdate(),直译为更新前得到快照
                * snapshot译为快照，按照新react生命周期图中的顺序，这个钩子在render()和componentDidUpdate()之间，但是和getDerivedStateFromProps()一样也需要有返回值，可以是null，也可以是快照值(snapshot value)。这个快照值可以是任何值，如，字符串、数组、对象、函数，都可以
                    * ![getSnapshotBeforeUpdate要有返回值](images/%E6%9B%B4%E6%96%B0%E5%89%8D%E8%8E%B7%E5%8F%96%E5%BF%AB%E7%85%A7%E9%92%A9%E5%AD%90%E4%B9%9F%E9%9C%80%E8%A6%81%E8%BF%94%E5%9B%9E%E5%80%BC.PNG)
                * ![getSnapshotBeforeUpdate运行原理](images/getSnapshotBeforeUpdate%E5%92%8B%E8%BF%90%E8%A1%8C.PNG)
                * 稍微改进一下，向组件中定义一个props，props命名为count，其值为199。在getDerivedStateFromProps钩子函数中设置一个if语句，当state.count的值为偶数时，输出数字2，返回值为null(意思是在这个钩子函数里传递的state参数不从props中取值)；当state.count的值为奇数时，输出数字199，返回值为props(意思是state值从props中取值)。点击“点我+1”按钮后state值也会随之改变，第一次渲染时，state从构造器里的初始化状态值中取值，所以输出为2，返回值为null；第一次点击后，count值为1，输出199，return props；第二次点击开始，state就会从props中取值，且因为有componentDidUpdate钩子函数中传递之前的props值(preProps)、state值(preState)和快照值(snapshotValue)，所以之后的派生状态值(就是getDerivedStateFromProps里传递的state参数和输出的state值)，就会从props中取值，因此输出数字2，return null。咋走新来一个文件运行一下。
                    * ```
                        class Count extends React.component{
                            static getDerivedStateFromProps(props,state){
                                console.log('Count--getDerivedStateFromProps',props,state);
                                if (state.count %2 ===0){
                                    console.log(2);
                                    return null
                                }else{
                                    console.log(199);
                                    return props
                                }
                                // return null
                            }
                            getSnapshotBeforeUpdate(){
                                console.log('getSnapshotBeforeUpdate');
                                return 'atguigu'
                            }
                            // 组件更新完毕的钩子
                            componentDidUpdate(preProps,preState,snapshotValue){
                                console.log('Count---componentDidUpdate',preProps,preState,snapshotValue);
                            }
                        }
                        // 渲染组件
                        ReactDOM.render(<Count count={199}/>,document.getElementById('test'))    
                      ```
                * 例子：每隔一秒就会在容器中有新的新闻加载出来，但是我想要看某一个新闻，滚动到那个新闻后想要让滚动条停在想看的新闻的位置上。但是新的新闻必须继续加载出来，并且不会将我定位好的新闻的位置顶替上去
                    * ```
                        class NewsList extends React.Component{
                            // 初始化状态
                            state={newsArr:[]}

                            componentDidMount(){
                                setInterval(()=>{
                                    // 获取原状态
                                    const {newsArr}=this.state
                                    // 模拟一条新闻
                                    const news='新闻'+(newsArr.length+1)
                                    // 更新状态  新生成的状态,之前的状态
                                    this.setState({newsArr:[news,...newsArr]})
                                },1000)
                            }

                            render(){
                                return (
                                    <div className="list" ref="list">
                                        {
                                            this.state.newsArr.map((n,index)=>{
                                                return <div key={index} className="news">{n}</div>
                                            })
                                        }
                                        
                                    </div>
                                )
                            }

                            getSnapshotBeforeUpdate(){
                                return this.refs.list.scrollHeight
                            }

                            componentDidUpdate(preProps,preState,height){
                                this.refs.list.scrollTop += this.refs.list.scrollHeight-height
                            }
                        }
                    ```
            * 重要的钩子
                * 1. render:初始化渲染或更新渲染调用
                * 2. componentDidMount:开启监听，发送ajax请求
                * 3. componentWillUnmount:做一些收尾工作，如：清除定时器
            * 即将废弃的钩子。最新版需要加上UNSAFE_前缀才可以使用，以后可能会彻底废弃，不建议使用
                * 1. componentWillMount
                * 2. componentWillReceivedProps
                * 3. componentWillUpdate
        * DOM的Diffing算法
            * 这个算法是逐层对比的，最小的力度是标签/节点，标签里套标签之后，会和之前的标签进行对比，没有重新生成，重新放置的话就是

* **第三章：react应用(给予react脚手架)**
    * 3.1 使用create-react-app创建react应用
        * 3.1.1 react脚手架
            * 1. 脚手架：让程序员快速、方便地编写一个基于某种技术(Angular,React,Vue)的应用/模板项目。
                * 1. 包含了所有需要的配置(语法检查、jsx编译、devServer...)，都是webpack相关的东西。
                * 2. 下载好了所有相关的依赖
                * 3. 可以直接运行一个简单效果
            * 2. react提供了一个用于创建react项目的脚手架库：create-react-app
            * 3. 项目的整体技术架构为：react + webpack + es6 + eslint
            * 4. 使用脚手架开发的项目的特点：模块化、组件化、工程化
        * 3.1.2 创建项目并启动
            * 第一步，全局安装：npm install -g create-react-app
            * 第二步，切换到想创建项目的目录，使用命令：create-react-app react_staging
            * 第三步，进入项目文件夹：cd hello-react
            * 第四步，启动项目：npm start
        * 3.1.3
            * public---静态资源文件夹
                * favicon.icon--网站页签图标
                * **index.html--主页面**
                * logo192.ppng--logo图
                * logo512.png--logo图
                * manifest.json--应用加壳的配置文件
                * robots.txt--爬虫协议文件
            * src---源码文件夹
                * App.css--App组件的样式
                * **App.js--App组件**
                * app.test.js--用于给App做测试
                * index.css--样式
                * **index.js--入口文件**
                    * index.js中，渲染组件的操作中，<APP/>的外侧为什么要包裹<React.StrictMode></React.StrictMode>？
                        * 能检查APP以及APP里所有子组件写的东西是否合理
                * logo.svg--logo图
                * reportWebVitals.js文件是干嘛的？
                    * 是用于记录页面上的性能的，里面用上了web-vitals这个库
                * setupTest.js
                    * 用于应用的整体测试，也就是用于组件测试，或者是某一个模块/单元的测试，需要有jest-dom库做支持
        * 3.1.4脚手架介绍
            * 样式的模块化
                * 当两个先后引入的组件的样式名相同时，后引入的组件的样式会把先引入的组件的样式覆盖掉，最终只会以后引入的组件的样式为主，详细看Welcome组件和Hello组件
                * 这样影响非常不好，所以为了避免样式的冲突，可以：
                    * 1. 样式文件写 .less文件，因为less文件可以嵌套，就像这样
                        * ```
                            .welcome{
                                .demo{
                                    background-color: lightblue;
                                }
                            }
                          ```
                    * 2. 样式文件写成```xxx.module.css```，在组件上用变量接一下```import 变量 from './xxx.module.css'```，在此步骤会自动帮我整理成对象。最后在标签中写成 变量.类名
        * 3.1.5 功能界面的组件化编码流程(通用)
            * 1. 拆分组件：拆分界面，抽取组件
            * 2. 实现静态组件：使用组件实现静态页面效果
            * 3. 实现动态组件
                * 3.1 动态显示初始化数据
                    * 3.1.1 数据类型
                    * 3.1.2 数据名称
                    * 3.1.3 保存在哪个组件？
                * 3.2 交互(从绑定事件监听开始)

    * 3.2组件的组合使用--TodoList
        * 1. 拆分组件，抽取组件
            * Header.jsx
            * Item.jsx
            * List.jsx
            * Footer.jsx
        * 2. 实现静态组件：使用组件实现静态页面效果
            * 拆文本文件(html)和样式文件(css)到各个组件中和要被引入到各个组件的样式文件
        * 3. 实现动态组件
            * **状态中的数据驱动着页面的展示，每一个组件都有自己的状态**
                * 如图所示，List中的状态帮我保存一堆要做的事(就是todos)。Header组件把输入的数据交给List组件，List会把这些数据放在自己的状态(state)里，随后状态会驱动页面的展示，打包后会在页面中显示
                * ![状态中数据驱动页面的展示](images/%E7%8A%B6%E6%80%81%E4%B8%AD%E6%95%B0%E6%8D%AE%E9%A9%B1%E5%8A%A8%E9%A1%B5%E9%9D%A2%E5%B1%95%E7%A4%BA.PNG)
            * **两个组件之间传递数据就叫组件间通信，如果子组件想给父组件传递数据，父组件就需要先前通过props给子组件传递一个函数，而子组件在适当的时候(也就是子组件想给父组件传递数据的时候)，也就是想要给父组件传递数据时，调用一下这个函数即可**
                * 父组件(外壳组件)--App.jsx
                * 子组件1--Header.jsx
                * 子组件2--List.jsx
                * 整体的交互模型是这样的，App组件里存储着一堆要做的事，这些事传给了List，App又给Header传递了一个函数，这个函数后续能接收todoObj。Header组件会在合适的时候调用App这个父组件传递的函数，把todoObj交给App，App拿到todoObj之后会放在自己的状态里，就引起了App状态的更改，App状态一更改，App里的render就会重新被调用，这样就会引发App的子组件List的重新渲染，然后List里的内容就会有所变化。
            * **状态在哪里，操作状态的方法就在哪里**
                * 祖先组件--App.jsx
                * 父组件--List.jsx
                * 组件--Item.jsx
                * 勾选、取消勾选某一个todo的操作是通过改变单个的input节点中的done的状态来实现的，因为Item无法向List或App传递数据，所以父组件(List)需要给Item中传递一个函数，就是handleCheck。App又需要给List传递函数updateTodo，所以合适的时候会按顺序调用，当勾选或取消勾选某个todo的时候，首先执行handleCheck函数，随后执行updateTodo函数，进入匹配处理数据的判断中，结果相同，返回新的todoObj和更改后的done值，如果不同，就返回原来的值
                    * ![updateTodo执行原理](images/updateTodo%E4%B8%BA%E5%95%A5%E8%BF%99%E6%A0%B7%E5%86%99.PNG)

* **第四章：react ajax**
    * 4.1 理解
        * 4.1.1 前置说明
            * 1. React本身只关注于界面，并不包含发送ajax请求的代码(如：React.get/post(url) 这种是不可能存在的)
            * 2. 前端应用需要通过ajax请求与后台进行交互(json数据)
            * 3. react应用中需要继承第三方ajax库或自己封装(但是自己封装用得少，一般用第三方的ajax)
        * 4.1.2 常用的ajax请求库
            * 1. jQuery：比较重，如果需要另外引入，不建议使用
            * 2. axios：轻量级，建议使用axios，发送网络请求
                * 1. 封装XMLHTTPRequest对象的ajax
                * 2. promise风格
                * 3. 可以用在浏览器端和node服务器端
    * 4.2 axios
        * 4.2.1 文档
            * https://github.com/axios/axios
        * 4.2.2 相关API
            * 1. GET请求
            * 2. POST请求
    * 4.3 案例--GitHub用户搜索
        * 4.3.1 效果，看C:\Users\田园\Desktop\尚硅谷React全家桶教程（天禹老师主讲）\react全家桶资料\04_静态页面\users_page\index.html
    * 4.4 消息订阅-发布机制
        * 1. 工具库：PubSubJS
        * 2. 下载：npm i pubsub-js --save
        * 3. 使用
            * 1. import PubSub from 'pubsub-js' // 引入
            * 2. PubSub.subscribe('delete',function(data){}) //订阅
            * 3. PubSub.publish('delete',data) //发布消息
            * 简单总结就是，有A、B两个组件，A组件想要收到B组件发布的消息，就是B给A提供东西，**A就需要在自己的组件内部订阅消息**，商量好消息的名字叫什么。在B组件当中通过某种方法**发布消息**，发布消息的同时，**把要传递的数据一起携带过去**。因为在A组件中订阅了消息，B组件中的数据就会传递到A组件中
    * 4.5 fetch
        * 4.5.1 文档：
            * 1. https://github.github.io/fetch/
            * 2. https://segmentfault.com/a/1190000003810652
        * 4.5.2 特点：
            * 1. fetch是原生函数，不再使用XMLHttpRequest(xhr)对象来提交ajax请求
            * 2. 老版本的浏览器可能不支持(对，说的就是ie，都2023年了ie都死绝了)
        * 4.5.3 相关API
            * 1. GET请求
                * ```
                    try {
                        const response=await fetch(`/api1/search/users2?q=${keyWord}`)
                        const data=await response.json()
                        PubSub.publish({isLoading:false,users:data.items})
                        console.log(data);
                    } catch (error) {
                        console.log('请求出错',error);
                        PubSub.publish({isLoading:false,err:error.message})
                    }
                  ```
            * 2. POST请求

* **第五章 React路由**
    * 5.1 相关理解
        * 5.1.1 SPA的理解
            * 1. 单页Web应用(single page web application,SPA)
            * 2. 整个应用只有**一个完整的页面**
            * 3. 点击页面中的链接**不会刷新**页面，只会做页面的**局部更新**
            * 4. 数据都需要通过ajax请求获取，并在前端异步展现
        * 5.1.2 路由的理解
            * 1. 什么是路由？
                * 1. 一个路由就是一个映射关系(key:value)：你给我key，我根据拿到的key，决定响应哪一个value
                * 2. key为路径(path)，value可能是function或component
            * 2. 路由分类：
                * 1. 后端路由：
                    * 理解：value是function，用来处理客户端提交的请求
                    * 注册路由：router.get(path,function(req,res){})
                    * 工作过程：当node接收到一个请求时，根据请求路径找到匹配的路由，调用路由中的函数来处理请求，返回响应数据。
                * 2. 前端路由：(无刷新跳转) 详细例子见C:\Users\田园\Desktop\尚硅谷React全家桶教程（天禹老师主讲）\react全家桶资料\06_其他\前端路由的基石_history.html
                    * 浏览器端路由，value是component，用于展示页面内容
                    * 注册路由：<Route path="/test" component={Test}>
                    * 工作过程：当请求的path变为/test时，当前路由组件就会变为Test组件
        * 5.1.3 react-router-dom 的理解
            * 1. react的一个插件库
            * 2. 专门用来实现一个SPA应用
            * 3. 基于react的项目基本都会用到此库
    * 5.2 react-router-dom相关API
        * 5.2.1 内置组件
            * 1. <BrowserRouter>
            * 2. <HashRouter>
            * 3. <Route>
            * 4. <Redirect>
            * 5. <Link>
            * 6. <NavLink>
            * 7. <Switch>
        * 5.2.2 其他
            * 1. history对象
            * 2. match对象
            * 3. withRouter函数
    * 5.3 基本路由使用
        * 1. 明确好界面中的导航区、展示区
        * 2. 导航区的a标签改为Link标签
            * ```<Link to="/xxxxx">Demo</Link>```
        * 3. 展示区写Route标签进行路径的匹配，看路径path是什么，就展示哪一个组件component的组件内容
            * ```<Route path='/xxxx' component={Demo}>```
        * 4. <App>的最外侧包裹一个<BrowserRouter>或<HashRouter>，用于管理整个应用里的路由
    * 5.4 路由组件与一般组件
        * 5.4.1 区别
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
                * 2. 路由组件：接收到三个固定的属性，history、location、match
                    * 可以看到history中有一个location对象，与location属性里的内容一样，所以删了。location属性中的key是随机生成的，每次都不一样，所以删了。下面只保留了写代码时常用的几个，留下来的是必须懂的干货，详细去控制台可以看到
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
        * 5.4.2 NavLink标签
            * 1. 想要点击导航链接后，导航链接高亮，表示被选择，需要在Link标签的className中追加active类名，表示点击哪一个导航就发亮。想要这样的效果还需要创建一个样式文件，并引入，比较麻烦。此时把两个Link标签替换为NavLink标签，NavLink标签的设计理念碰巧就是给正在被点击的那一个链接追加active样式类名，且可以在NavLink标签里多追加一个属性名为activeClassName的属性。在public/index.html文件中添加一个样式名为atguigu的样式，但是之前引入的bootstrap.css的权重比较重，给atguigu的样式添加```!important```，来提高atguigu样式的权重。给两个NavLink标签添加```activeClassName="atguigu"```属性和样式，表示点击哪一个链接就给它追加一个样式名为atguigu的样式。打包后，到页面控制台在元素查看时，点击哪一个链接，```activeClassName="atguigu"```就会被追加到那一个NavLink标签中
                * ![点击哪一个导航链接，atguigu样式就在哪儿](images/%E7%82%B9%E5%93%AA%E4%B8%AAatguigu%E7%9A%84%E6%A0%B7%E5%BC%8F%E5%B0%B1%E5%9C%A8%E5%93%AA%E9%87%8C.PNG)
            * 2. 封装NavLink
                * 当导航区里有很多选项，就需要写很多NavLink标签，此时NavLink标签中重复的属性可以通过封装NavLink来简写，以免代码冗余。
                * 定义一个组件MyNavLink，引入到App中，写入名为MyNavLink的标签，并在标签中添加必要的属性，例如```to="/about"```。回到MyNavLink组建中，想要实现和前面一样的展示效果，需要对NavLink二度封装，引入'react-route-dom'中NavLink必要的、重复的属性```activeClassName="atguigu" className="list-group-item"```。至于其他想要追加的属性，标签内的标签属性可以通过props来传递其数据或状态，但标签体没有特意说过，其实标签体内容也是一种特殊的标签属性。在控制台查看时，可以看到两个标签里所有的属性输出了，其中标签体内容的key的名字我没有指定，他们给指定了就叫children。且在MyNavLink/index.jsx中写标签体内容时不一定要这么写，```<NavLink activeClassName="atguigu" className="list-group-item" {...this.props}>{this.props.children}</NavLink>```。可以把标签体内容配在children这个标签属性中也是可以的,```<NavLink activeClassName="atguigu" className="list-group-item" {...this.props} />```
                * ![被指定标签体内容的key为children](images/%E4%BB%96%E4%BB%AC%E7%BB%99%E6%8C%87%E5%AE%9A%E4%BA%86%E6%A0%87%E7%AD%BE%E4%BD%93%E5%86%85%E5%AE%B9%E7%9A%84key%E7%9A%84%E5%90%8D%E4%B8%BAchildren.PNG)
                * ![在...this.props中已经传递了包括to、title在内的许多标签属性，当然也包括children，所以标签自闭和，传递标签属性就可以了](images/%E4%B8%8D%E7%94%A8%E9%9D%9E%E5%BE%97%E7%89%B9%E6%84%8F%E5%86%99%E6%A0%87%E7%AD%BE%E4%BD%93%E5%86%85%E5%AE%B9%EF%BC%8C%E5%8F%AF%E4%BB%A5%E9%80%9A%E8%BF%87%E6%A0%87%E7%AD%BE%E5%B1%9E%E6%80%A7%E4%BC%A0%E9%80%92.PNG)
            * Switch的使用
                * 当一个路径下对应两个或以上数量的组件，点击导航链接时，其组建内容会都展示在展示区。因为只想展示与路由相匹配的组件，不想要展示与路径不匹配的组件，所以匹配到与组件相对应的路径后就不继续匹配了。此时需要先引入Switch标签，并把所有注册的路由使用Switch标签包起来，如果不适用Switch包括路由，匹配相对应的组建后，会继续向下匹配，这是我不需要的，但使用Switch包裹后，匹配上了路径，就不会继续向下匹配了。虽然**不会在同一个路径上对应两个或多个组件**，但还是需要注意，哪个组件对应的路径先被匹配，就展示该组件的内容，如下代码，就会展示Test组件的内容，当然Home组件写在上面，那就展示Home组件的内容。当写入了多个路由就用Switch标签包裹起来即可，写了一个路由就别包了。
                    * ```
                        <Switch>
                            <Route path="/about" component={About}/>
                            <Route path="/home" component={Test}/>
                            <Route path="/home" component={Home}/>
                        </Switch>
                      ```
                    * ![此时展示Test组件的内容，因为对应的/home路径写在上面匹配了Test组件，且Switch包了之后不往下继续匹配了](images/%E5%85%88%E5%8C%B9%E9%85%8D%E5%93%AA%E4%B8%AA%E7%BB%84%E4%BB%B6%E5%AF%B9%E5%BA%94%E7%9A%84%E8%B7%AF%E5%BE%84%E5%B0%B1%E5%B1%95%E7%A4%BA%E5%93%AA%E4%B8%AA%E7%BB%84%E4%BB%B6.PNG)
            * 解决样式丢失问题
                * 问题说明：路由路径是多级的结构，在我刷新的时候样式就会丢失。以```http://localhost:3000/atguigu/css/bootstrap.css```这个请求样式为例，丢失的原因是在多级结构中的atguigu也是localhost:3000，也就是脚手架下的路径，但是实际脚手架下没有名为atguigu的文件夹(因为atguigu是我自己加的)。第一次运行脚手架，打开浏览器时是不会出现样式丢失的情况的，甚至在Network查看时，样式文件成功发送了请求，还得到了成功的响应。点击导航链接后，刷新页面就会出现页面丢失的情况。因为无法在脚手架的根路径下找到发送请求的样式文件，所以最终展示在页面上的是public根路径下的index.html文件，且在Response部分查看，响应回来的文件的话也会发现是index.html文件。
                * 解决办法：
                    * 1. 去掉index.html文件里引入的样式文件最前面的点(常用)
                    * 2. 把index.js文件和App组件中所有的BrowserRouter换成HashRouter。打包后打开浏览器会发现```http://localhost:3000`/#/```后面会带井号，**井号后面内容被认为是前端的资源，不会带给脚手架服务器**，所以```atguigu/about```是出现在井号后面的。所以当刷新页面，给脚手架服务器发送请求时，是自动忽略井号后面的内容的。挡在Network查看bootstrap样式文件时，请求路径是```http://localhost:3000/css/bootstrap.css```，没有atguigu，因为井号后面的前端资源被脚手架服务器自动忽略了，那就以原来在index.html中引入的有点的bootstrap样式文件为主，且得到的成功响应文件也是样式文件。
                        * ![1.去index.html里bootstrap最前面的点；2.把BrowserRouter换成HashRouter](images/%E4%B8%A4%E7%A7%8D%E6%96%B9%E6%B3%95%E7%BB%9F%E4%B8%80%E7%9A%84%E6%95%88%E6%9E%9C%E5%9B%BE.PNG)
                    * **"/css/bootstrap.css"和"./css/bootstrap.css"的区别**
                        * 有点表示以当前文件出发，在当前文件夹下出发去找样式文件；没点，直接"/css"就表示直接去localhost:3000下找css文件夹下的bootstrap.css文件
            * 路由的模糊匹配和严格匹配
                * 模糊匹配：
                    * 1. 在MyNavLink给多了，但是Route没要那么多，可以像以前那样在展示区看到组件内容，但是MyNavLink还是```to="home"```，Route却要求```to="home/a/b"```，就无法展示。
                    * 2. MyNavLink给多了，还给了奇怪的东西，``` <MyNavLink to="/a/home/b">Home</MyNavLink>```，与Route要求的不匹配，路径的顺序不一致，```<Route path="/home" component={Home}/>```，也无法展示组件内容。
                    * 关于模糊匹配的小总结：这就像彩礼，我只要求正常、必要的，但是你别上奇怪的地方找来奇怪的或者不给。
                * 严格/精准匹配
                    * 如上方两种无论哪种情况，以第一个情况举例，MyNavLink给多了，但Route只要home路径，虽然可以匹配上并在点击后展示组件内容，但毕竟不规范。此时在Route标签中添加exact属性，且属性值为true，```<Route exact={true} path="/home" component={Home}/>```。重新打包、刷新页面后，可以看到点击Home选项，无法展示Home组件的内容，因为添加了严格匹配的属性后，要求的和收到的必须一样，差一个符号都不行。
                * 严格匹配虽然目前看来是规范代码书写方法的，要求不能写多或写少，但到正式工作中，不能随便开严格匹配，如果不开启严格匹配，不影响页面的呈现，那就不开，但若影响了(若跳到了奇怪的地方；若点啥都跳到了一个地方)就开启严格匹配来规范。
    * 5.5 嵌套路由使用
        * 嵌套路由，也叫多级路由，就是路由里还有路由
            * React中路由的注册是有顺序的，App中的About和Home这两个路由是先注册的，每当我点击一个路由链接，要改地址的时候，会从最开始注册的路由开始进行逐层匹配。所以当我点击了News链接，路径确实会改成news，但是紧随其后会触发路由的匹配，路由从按照当时注册的顺序进行匹配，就会来到App，一个一个对比，我要的是去/news，对比后会发现没有与之相匹配的，那就听从重定向，也就是Redirect的发落，按照我写的代码，点击News或者Message，就会去/about。想要解决这种情况，那就去Home中把两个MyNavLink的to属性的值由```"/news或message"```，改为```"/home/news或message"```，并注册路由。
                * 分析：当点击Home后会展示Home组件里所有的内容，Home里还有两个路由，News和Message，当点击他们两个中的任何一个的时候需要在展示区中展示匹配的路径所对应的组件的内容。以点击News为例，当点击News后，路径变成了/home/news。因路由的匹配都是按照顺序进行的，/home/news到App中，与注册的路由进行逐一匹配，/about不匹配，pass掉，到/home的时候，由于没有添加精准匹配的设置，进行了模糊匹配，Home组件才没有丢失，不像上面说明的那样跳到/about，展示About的内容。成功挂载Home组件后，在Home组件里又注册了路由，继续进行路由的匹配，我输入的/home/news和Route的路径完美匹配，就会在展示了Home组件内容的同时，也展示了News的内容。Message同理，并延伸，写三级路由甚至更多级路由时，需要我规规矩矩的把前几级的路径写好。
    * 5.6 向路由组件传递参数数据
        * 二级路由的基础上，再追加一级路由，点击Message中的任何一个选项(message1/2/3)，都会在其展示区展示与匹配的路由对应的组件的内容。
            * **方法1：向路由组件传递params参数**
                * 使Message中作为展示内容的message1/2/3也称为导航链接，点击任意一个，都展示与之匹配的路由对应的组件内容，在此对应的组件命名为Details。因为Details中展示的内容不只是一行内容那么简单，有id、title和content，所以事先需要在Message中初始化message的状态，state中传入对象messageArr数组，在messageArr中写入路径的变量。在render方法中先解构赋值```const {messageArr}=this.state```，然后对messageArr数组进行遍历，并给li标签传递msgObj的id。在创建好的Details组件中，写入点击选项后要展示的内容列表。由于Details的导航区和展示区都是包含在Message的展示区里的，当点击任何一个message的时候，就会渲染/展示Details组件。导航区是动态遍历生成的，将导航选项的标签改为Link，并拖家带口的、完整的将需要匹配的路径写好，```<Link to={`/home/message/details/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link>```，并在下面注册路由，表示在此声明接收params参数，```<Route path="/home/message/details/:id/:title" component={Details}/>```。在Details组件的上方定义message的id和content，整合为数组，名为DetailsData，专门用于存储message的详情，只要从Message中把与路径匹配的信息带到Details中，Details就输出与信息对象(msgObj)对应的content。在Details中输出this.props，在控制台可以查看到路由组件的固定的三个属性，点击任意一个message，其中打开match属性，可以看到params中传递了点击的message的id和title，由此再次使用解构赋值，```const {id,title}=this.props.match.params```，可以展示id和title，```<li>ID/TITLE:{id/title}</li>```。然后可以拿着id到DetailsData中找对应的消息项，随后使用find方法，```const fidnResult=DetailsData.find((detailObj)=>{return detailObj.id===id})```，找到消息详情对象，将这个对象传到CONTENT中，使之得到向路由组件传递的params数据，展示与匹配的路径相对应的组件内容。
            * 2. **方法2：传递search参数**
                * 在方法1的基础上，使用search方法向路由组件传递参数，```<Link to={`/home/message/details/?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link>```，在下面正常注册路由即可，无需声明接收search参数，此时到控制台输出查看this.props，点击任意一个选项的话，会发现在location的search中查看到?id=01&title=message1，这是字符串的形式，我需要对象的形式，并且把这些对象进行整合成数组，方便遍历。此时需要在Details中引入querystring，简称qs，它是可以把字符串和对象进行转换的工具，引入后，接收search参数，```const {search}=this.props.location```，并把从search中提取来的字符串转换为对象，```const {id,title}=qs.parse(search.slice(1))```。在展示列表中传入各自的属性，到浏览器点击任意一个选项均可展示与匹配路径相应的组件内容。
            * 3. **方法3：传递state参数** 此state和一般组件里的state没有任何关系
                * state方法与前两个方法不同之处就是，前两个方法会把传递的路径暴露在地址栏上，隐私信息就暴露了，不安全，state方法在地址栏上隐藏的。
                * 向路由组件传递的参数，要传递的匹配路径一直是字符串形式的写法，但是state方法里要求传递的匹配路径要求是对象，```to={{pathname:'home/message/details',state:{id:msgObj.id,title:msgObj.title}}}```。state和search相同的一点就是无需声明接收参数。在控制台输出this.props，可以发现location的state中查看到对象写法的id和title，所以到Details中提取从state中获取的id和title属性，来接收state参数，最后以便于点击选项时，展示对应的组件内容。此时查看网址的话会发现message后面的内容就被隐藏了，虽然提高了安全性，但是当把这个网址发送给别人或把浏览器的历史记录全部删除的时候，就会发现无法打开网页，甚至给报错。为了这是因为当没有历史记录作为定位的时候，this.props.location.state是undefined，在undefined的state中国查找的id和title必定也是undefined。所以需要在接收state参数和寻找detailObj对象方法的的最后加上当没有这个网址的访问记录时的情况。
                    * ```
                        const {id,title}=this.props.location.state || {}
                        const fidnResult=DetailsData.find((detailObj)=>{
                            return detailObj.id===id
                        }) || {}
                      ```
    * 5.7 push和replace
        * 以上面的情况为例，一般点击到三级路由，也就是message1/2/3后，点击后退时，会后退到上一个页面中。这是因为Link路由默认是使用push属性的，也就是压栈，可以在历史记录中查看到都访问过哪些网页，点击了哪些链接，可以按照顺序一步一步回退到想要访问的网页中。但若不想留有记录，就可以给Link路由添加replace属性，这个属性可以将最上面的记录删掉，自己会成为最新的，且因为替换掉了上一个记录，点击回退时，会退到它的上上一个页面中。就是在历史记录中查看的时候无法找到，最近的上一个网址/网页的访问记录。```<Link replace to={{pathname:'home/message/details',state:{id:msgObj.id,title:msgObj.title}}}>{msgObj.title}</Link>```，如果给所有的请求路由添加replace属性，那回退的时候会直接退到刚打开浏览器的那个页面，不管咋说，挺炸裂的。
    * 5.8 多种路由跳转方式
        * **编程式路由导航**，若想要点击的不只是链接，而是按钮或是一个图片的时候，不需要使用Link或NavLink标签包裹起来。以上面情况为例，想要在每个message选项后面追加两个按钮，名为push查看和replace查看。显而易见，是点击push按钮后，可以回退到上一个路径，点击replace会回退到上上一个路径。
            * 以传递state参数的方法为例，定义两个函数pushShow和replaceShow，并把这两个函数分别绑定在onClick事件上，在render方法前执行这两个函数，各自的函数内分别调用push和replace方法，方法不但可以传递跳转的方式，还可以携带三种不同的参数。打开浏览器，点击按钮后会在控制台输出this.props的属性，其中history属性有三个api，goBack、goForward和go，显而易见，和push或replace一样，定义三个函数，绑定在onClick事件上，goBack是回退，goForward是前进，go可以传递数值参数，正数为前进，负数为回退。
        * withRouter的使用
            * withRouter是react-router-dom的一个函数，而不是组件。它的作用的接收一般组件，使其拥有路由组件特有的三个属性。以现在的代码为例，Header组件是一个一般组件，想要给一般组件添加路由组件特有的属性的API的话，会发现报错，所以此时需要调用withRouter函数，并向函数内传递一般组件作为参数后，向外暴露被withRouter函数加工之后的返回值，其返回值就是一个新组件。
        * BrowserRouter和HashRouter的区别
            * 1. 底层原理不同：
                * BrowserRouter使用的是H5的history API，不兼容IE9级以下版本
                * HashRouter使用的是URL的哈希值
            * 2. path表现形式不同
                * BrowserRouter的路径中没有#，例如：localhost:3000/demo/test
                * HashRouter的路径中包含#，例如：localhost:3000/#/demo/test
            * 3. 刷新后对路由state参数的影响
                * BrowserRouter没有任何影响，因为state保存在history对象中
                * HashRouter刷新后会导致路由state参数的丢失
            * 4. 备注：HashRouter可以用于解决一些路径错误相关的问题

* **第六章 ReactUI组件库** 
    * 6.1 流行的开源ReactUI组件库
        * 6.1.1 material-ui(国外)
            * 1. 官网: http://www.material-ui.com/#/
            * 2. github: https://github.com/callemall/material-ui
        * 6.1.2 ant-design(国内蚂蚁金服)
            * 1. 官网：https://ant.design/index-cn
            * 2. GitHub：https://github.com/ant-design/ant-design/
        * eject暴露脚手架所有配置内容

* **第七章 redux**
    * 7.1 redux理解
        * 7.1.1 学习文档
            * 1. 英文文档：https://redux.js.org/
            * 2. 中文文档：http://www.redux.org.cn/
            * 3. GitHub：https://github.com/reactjs/redux
        * 7.1.2 redux是什么？
            * 1. redux是一个专门用于做**状态管理**的JS库(不是react插件库)
            * 2. 它可以用在react、angular、vue等项目中，但基本与react配合使用
            * 3. 作用：集中式管理react应用中多个组件**共享**的状态
        * 7.1.3 什么情况下需要使用redux
            * 1. 某个组件的状态，需要让其他组件可以随时拿到(共享)
            * 2. 一个组件需要改变另一个组件的状态(通信)
            * 3. 总体原则：能不用就不用，如果不用比较吃力才考虑使用；redux是独立于所有的组件存在的，需要共享的组件中的状态，就交给redux。
        * 7.1.4 redux工作流程/工作原理
            * ![redux原理图](images/redux%E5%8E%9F%E7%90%86%E5%9B%BE.png)
    * 7.2 redux的三个核心概念
        * 7.2.1 action(相当于产品经理)
            * 1. 动作的对象，它只是个JavaScript里普普通通的一个Object类型的一半对象。
            * 2. 包含两个属性
                * type：标识属性，值为字符串，唯一、必要属性(action对象要干的事的的名)
                * data：数据属性，值类型，任意、可选属性(action对象要干的事的具体内容)
            * 3. 例子：{type:'玩游戏',data:{name1:'L&G',name2:'tears of themis'}}
            * 
        * 7.2.2 store(相当于乙方公司的老板)
            * 1. 用于初始化状态和加工状态
            * 2. 加工时，根据之前的state和action，产生新的state的纯函数
        * 7.2.3 reducer(相当于乙方公司的程序员，纯冤种)
            * 1. 将state、action、reducer联系在一起的对象
            * 2. 如何得到此对象？
                * import {createStore} from 'redux'
                * import reducer from './reducers'
                * const store=createStore(reducer)
            * 3. 此对象的功能
                * dispatch(action)：分发action对象，触发reducer调用，产生新的state
                * getState()：得到state
                * subscribe(listener)：注册监听，当产生了新的state时，自动调用
        * 简单总结，React Components是甲方，向需求告诉Action Creators(产品经理)，AC将需求整合创建action对象，action对象里有两个属性，名为type(需求名)和data(具体需求)，使用dispatch函数交给Store(老板)，Store将Reducer(程序员)豁楞起来，并告诉他得干活了。Store将之前的状态和需求(previousState,action)告诉Reducer，并指使他按照需求干活(在这里步骤中，Store必须告诉Reducer，对象原来/之前的状态，要不然Reducer会罢工)。按照需求干完活之后，Reducer会返回一个新的状态(return newState)给Store，之后React Components会调用getState方法来从Store中得到最新的状态。这是一个轮回，如果RC觉得状态不满意，不是想要的状态，那就上面的顺序再走一遍，只不过从第二遍开始走的时候，因为之前有过一次状态了，第二次走这个步骤的时候，在Reducer中就会初始化状态。
    * 7.3 redux的核心API
        * 
    * 7.4 使用redux编写应用
        * 7.4.1 


###  总结
* speak中的this是谁，得看是怎么调用的
* class,创建类组件时，react会在内部帮你做一个new的操作去实例化当前的类组件
* 借助构造器存值
* 函数体里面可以写任意的代码，但是类里不能写函数形式的方法
    * ```function xxx(){}```就不行
* 构造器里的this是组件的实例对象，render中的this是组件的实例对象，changeWeather因为不是通过组件(Weather)实例对象调用的，所以changeWeather中的this是undefined
* 类中我定义的所有的方法，类会在局部中自动给开启严格模式，这跟babel没关系
    * 如在函数体内开启严格模式，在外部直接调用这个函数时，会返回undefined
        * ```
            function demo() {
                'use strict'
                console.log(this);  //undefined
            }
            demo()

            function demo2() {
                // 'use strict'
                console.log(this);  //Window
            }
            demo2()
          ```
* 原理就是借助了构造器函数、render函数、类本身中的this指向实例，可以有多种解决方法
* 在条件允许的情况下，尽量避免使用字符串形式的ref，就是能避免就避免，但是特别着急的情况下还是可以放肆一下的
* 生命周期勾子函数什么时候调用和写代码的顺序是无关的，最先调用的是render()，只要写了React就会适时调用。啥时候是适时呢？比如componentDidMount是在调用render之后调用的
* 只有真实DOM被渲染到页面上，用户才可以进行输入内容等操作，虚拟DOM身上属性很少，比如没有value值，而真实DOM有，只有在真实DOM中才可以留下和保存用户输入的内容
* react脚手架文件介绍里，文件执行顺序
    * 先来到src/index.js中引入资源文件，渲染App组件，随后到public/index.html中找root节点，保存到root容器中，渲染组件的代码执行完后，App组件就会在页面中展示。最后各种logo图和图标、reportWebVitals.js文件以及setupTest.js文件等等其他都是周边的，需要的话添加，不需要就没必要
* 都是.js文件，如何区分哪个是组件，哪个是普通的、具有js业务功能的文件？
    * 1. 组件一般是首字母大写命名的js
    * 2. .jsx文件也是组件文件，在react脚手架里面，引入文件或资源时，不需要写后缀的有俩---.js&.jsx，
* 什么是组件？
    * 实现页面局部功能代码和资源的集合就是组件
* defaultChecked 只在第一次指定的时候有作用，第二次开始就没作用了
* 连续解构赋值
    * ```
        let obj={a:{b:{c:1}}}
        let obj2={a:{b:1}}
        console.log(obj.a.b.c)  //1

        const {a:{b:{c}}}=obj
        console.log(c)  //1

        //连续解构赋值并重命名
        const {a:{b:data}}=obj2
        console.log(data)  //1
      ```
* 在前端，jQuery和axios都是对xhr进行封装的，不直接用xhr是因为不好用，因为xhr的API设计的不咋地，且它无法解决回调地狱的问题
* SPA应用确实是单页面，但是页面虽然是单个的，组件是多个的，在单个的页面上根据点击的展示标题，在指定部分中显示不同标题对应的组件
* 前端路由部分，path怎么就会变成"/test"？因为我点了导航组件中的特殊的链接，就会引起路径的变化，跳转到我点击的组件，展示组件的内容
* 前端路由得靠BOM身上的history对象，就像你想要一个人（BOM）老老实实的听你的话，那就牢牢地保存好他的丑照（history）
* history对象有两种创建方式，History.createBrowserHistory()和History.createHashHistory()。browser是直接使用H5推出的history身上的API，但有的浏览器不支持(单名批评ie，但是没关系，它已经死了)；hash值，也就是使用锚点，兼容性极佳
* 路由就是路由器后面的插口，多个路由需要路由器来管理
* 点击导航区里不同的导航选项(也叫路由链接)。如果我点击了导航区里的某个导航选项，展示区就会展示对应的内容。**其原理就是点击导航区里的导航选项，引起历史记录里路径的变化，这个变化被前端路由器所检测到，进行匹配组件，从而展示对应组件的内容**，点击链接引起url路径的变化
* 路由组件与一般组件的区别：
    * 1. 一般组件是需要我自己手动写在render方法中进行渲染的；路由组件是靠路径的变化，进行路由匹配，决定渲染哪一个组件后，展示在页面上的。但这不是根本区别
    * 2. 一般组件通过props传递数据，组件标签里传递了什么就输出、展示什么；路由组件会受到路由器传递的三个最重要的三个props信息，分别是history、location、match
* 路由路径是多级的结构，在我刷新的时候样式就会丢失。以```http://localhost:3000/atguigu/css/bootstrap.css```这个请求样式为例，丢失的原因是在多级结构中的atguigu也是localhost:3000，也就是脚手架下的路径，但是实际脚手架下没有名为atguigu的文件夹(因为atguigu是我自己加的)。第一次运行脚手架，打开浏览器时是不会出现样式丢失的情况的，甚至在Network查看时，样式文件成功发送了请求，还得到了成功的响应。点击导航链接后，刷新页面就会出现页面丢失的情况。因为无法在脚手架的根路径下找到发送请求的样式文件，所以最终展示在页面上的是public根路径下的index.html文件，且在Response部分查看，响应回来的文件的话也会发现是index.html文件。
* 这个过程就像客人去饭店吃饭，先想想吃什么，吃是类型，吃的东西是数据，然后告诉服务员，服务员告诉后厨做饭，后厨做完以后给服务员，服务员再交给顾客。


