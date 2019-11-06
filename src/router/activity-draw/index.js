import React from 'react'
import { Toast, Modal } from 'antd-mobile'
import { message } from 'antd'

import { setToken } from '@/cache/token.js'
import headerImg from '@/assets/draw/header.png'
import ruleImg from '@/assets/draw/rule.png'
import drawImg from '@/assets/draw/draw.png'
import firstImg from '@/assets/draw/first.png'
import secondImg from '@/assets/draw/second.png'
import confirmImg from '@/assets/draw/confirm.png'
import closeImg from '@/assets/draw/close.png'
import noneImg from '@/assets/draw/none.png'
import './index.scss'

export default class ActivityModal extends React.Component {
  state = {
    visible: false,
    level: 3
  }

  async componentDidMount() {}

  goCouponDetail = (couponId, stock) => {
    if (stock == 0) {
      message.warn('该券已被抢光')
    } else {
      window.wx.miniProgram.navigateTo({
        url: '/packageA/pages/integral/reduction/index?id=' + couponId
      })
    }
  }
  onDraw = e => {
    e.preventDefault()
    this.setState({ visible: true })
  }
  onModalClick = e => {
    const { level } = this.state
    if (level === 3) {
    } else {
    }
    this.setState({ visible: false })
  }
  render() {
    const { visible, level } = this.state
    return (
      <div className='draw'>
        <div style={{ position: 'relative' }}>
          <img className='draw-img' src={headerImg} />
          <img className='draw-btn' src={drawImg} onClick={this.onDraw} />
        </div>
        <div className='draw-tip'>
          <img className='draw-img' src={ruleImg} />
        </div>
        <Modal
          visible={visible}
          maskClosable={false}
          transparent
          className='draw-modal'
          wrapClassName='draw-modal-wraps'
        >
          <div className='draw-modal-content'>
            <img
              src={level === 1 ? firstImg : level === 2 ? secondImg : noneImg}
            />
            <img
              onClick={this.onModalClick}
              className='draw-modal-btn'
              src={level === 3 ? closeImg : confirmImg}
            />
          </div>
        </Modal>
      </div>
    )
  }
}
