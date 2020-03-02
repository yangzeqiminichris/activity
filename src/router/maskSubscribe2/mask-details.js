import React, { Component } from 'react'
import img from './img/details.png'

export default class MaskDetails extends Component {
  componentDidMount() {
    document.title = '详情'
  }
  render() {
    return (
      <div style={{ width: '100%' }}>
        <img style={{ width: '100%' }} src={img} />
      </div>
    )
  }
}
