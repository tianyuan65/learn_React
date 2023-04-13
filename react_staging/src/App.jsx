import React, { Component } from 'react'
import { Button,DatePicker } from 'antd';
import {YoutubeOutlined,WechatOutlined,WeiboOutlined} from '@ant-design/icons'
import 'antd/dist/reset.css'

export default class App extends Component {
  render() {
    return (
      <div>
        App...
        <button>点我</button>
        <Button type="primary">按钮1</Button>
        <Button>按钮2</Button>
        <Button type="link">按钮3</Button>
        <YoutubeOutlined />&nbsp;
        <WechatOutlined />&nbsp;
        <WeiboOutlined />&nbsp;
        <DatePicker/>
      </div>
    )
  }
}
