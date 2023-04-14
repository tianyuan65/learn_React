import React, { Component } from 'react'
import { Button,DatePicker,ConfigProvider  } from 'antd';
import {YoutubeOutlined,WechatOutlined,WeiboOutlined} from '@ant-design/icons'


export default class App extends Component {
  render() {
    return (
      <div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#bfa',
            },
          }}
        >
        App...
        <button>点我</button>
        <Button type="primary">按钮1</Button>
        <Button>按钮2</Button>
        <Button type="link">按钮3</Button>
        <YoutubeOutlined />&nbsp;
        <WechatOutlined />&nbsp;
        <WeiboOutlined />&nbsp;
        <DatePicker/>
        </ConfigProvider >
      </div>
    )
  }
}
