import React from 'react'
import './index.scss'

export default class SubscribeBtn extends React.Component {
  render() {
    const { type, onClick, show } = this.props
    return (
      <div className='subscribe-box'>
        {this.props.children}
        {show && <div className={`subscribe-btn ${type}`} onClick={onClick}></div>}
      </div>
    )
  }
}
