import React from 'react'
import ErrorImg from '../../img/error.png'

import './index.scss'

export default function Toast(props) {
  const { msg = '预约失败，该时间段已抢光' } = props
  return (
    <div className='toast'>
      <div className='box'>
        <img className='icon' src={ErrorImg} />
        <div className='msg'>{msg}</div>
      </div>
    </div>
  )
}
