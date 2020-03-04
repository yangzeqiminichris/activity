import React from 'react';
import './index.scss';
import { message } from 'antd';

export default class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
      }
    }

    async componentWillMount() {
      let t = this.props.location.search
      let arg = t.split('?')
      let url = this.getUrlToken('url', this.props.location.search)
      let gameArg = url.split('?')
      let userId = this.getUrlToken('userId', `?${gameArg[1]}`)
      if (userId) {
        window.open(url, '_self')
      } else {
        message.error('用户未登录，请重新尝试')
        window.wx.miniProgram.navigateTo({url: `/pages/mall/index`})
      }
    }

    render () {
      return (
        <div>
        </div>
      )
    }

  getUrlToken(name, str) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
    const r = str.substr(1).match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return null
  }
}
