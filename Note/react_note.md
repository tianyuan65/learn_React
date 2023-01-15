### React
* **React简介**
    * 什么是react?
        * React用于构建用户界面的JS库。是一个将数据渲染为HTML视图的开源JS库。
    * React特点
        * 采用组件化模式、声明式编码，提高开发效率及组建复用率
        * 在ReactNative中可以使用React语法进行移动端开发(如安卓或IOS应用)
        * 使用虚拟DOM(不是页面上的真是DOM,是React操作的,专门为React用的,没放在页面上的DOM,放在代码运行时电脑的内存里)和优秀的Diffing算法啊，尽量减少与真实DOM的交互
    * React高效的原因
        * 使用虚拟(virtual)DOM不总是直接操作界面真实DOM
        * DOMDiffing算法,最小化页面重绘
* **React入门**  
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

* **React面向组件编程**
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

###  总结
* speak中的this是谁，得看是怎么调用的

