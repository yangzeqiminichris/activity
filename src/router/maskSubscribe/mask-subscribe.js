import React from 'react'
import { setToken } from '@/cache/token.js'

import './index.scss'

export default class MaskSubscribe extends React.Component {
  state = {}
  componentWillMount() {
    this.props.history.listen(() => {
      window.location.reload()
    })
  }

  componentDidMount() {}

  render() {
    return <div>homepage</div>
  }

  getUrlToken(name, str) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
    const r = str.substr(1).match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return null
  }
}
