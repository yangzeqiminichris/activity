import React from 'react'
import { Modal } from 'antd-mobile'
import { debounceAt } from 'zb-fjs'

import { setToken } from '@/cache/token.js'
import { getDraw } from './api/api'
import headerImg from '@/assets/draw/header.png'
import ruleImg from '@/assets/draw/rule.png'
import drawImg from '@/assets/draw/draw.png'
import confirmImg from '@/assets/draw/confirm.png'
import closeImg from '@/assets/draw/close.png'
import './index.scss'

export default class ActivityModal extends React.Component {
  state = {
    visible: false,
    image: null,
    targetType: 0,
    couponId: 0
  }

  async componentDidMount () {
    let token = this.getUrlToken('token', this.props.location.search)
    setToken(token)
  }

  goCouponDetail = couponId => {
    window.wx.miniProgram.navigateTo({
      url: '/packageA/pages/coupon/my-coupon/my-coupon?switchType=online'
    })
  }
  // 点击抽奖
  @debounceAt()
  onDraw = (e) => {
    e.preventDefault()
    let activityId = this.getUrlToken('activityId', this.props.location.search)
    let targetId = this.getUrlToken('targetId', this.props.location.search)
    getDraw({
      activityId,
      targetId
    }).then(res => {
      console.log(res)
      this.setState({
        visible: true,
        image: res.image,
        targetType: res.targetType,
        couponId: res.targetId
      })
    })
  }
  onModalClick = e => {
    const { targetType, couponId } = this.state
    this.setState({ visible: false })
    if (targetType) {
      this.goCouponDetail(couponId)
    }
  }
  render () {
    const { visible, targetType, image } = this.state
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
            <img src={image} />
            <img
              onClick={this.onModalClick}
              className='draw-modal-btn'
              src={!targetType ? closeImg : confirmImg}
            />
          </div>
        </Modal>
      </div>
    )
  }
  getUrlToken (name, str) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
    const r = str.substr(1).match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return null
  }
}
