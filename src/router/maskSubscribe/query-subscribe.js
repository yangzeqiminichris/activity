import React from 'react'
import { Input, Button, message } from 'antd'
import api from '@/api/mask-subscribe'
import { setToken } from '@/cache/token.js'
import Toast from './component/toast'

import './query-mask.scss'

export default class MaskSubscribe extends React.Component {
  state = {
    adCard: '',
    showTips: false,
    showToast: false,
    errorMsg: '',
    queryList: []
  }
  componentWillMount() {
    this.props.history.listen(() => {
      window.location.reload()
    })
  }

  componentDidMount() {
    const idCard = this.props.match.params.id
    document.title = '查询已预约'
    if (idCard) {
      this.getInfoByIdCard(idCard)
      document.title = '预约结果'
    }
  }

  checkIdCard = id => {
    var reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/
    if (reg.test(id)) {
      return true
    } else {
      return false
    }
  }

  render() {
    const { adCard, showTips, showToast, errorMsg, queryList } = this.state
    return (
      <div className='query-main'>
        {queryList.length === 0 && !this.props.match.params.id && (
          <div className='search'>
            <div className='input'>
              <span className='input-title'>身份证号</span>
              <Input
                className='input-area'
                placeholder='输入身份证号码'
                value={adCard}
                onInput={this.onInputCardNumber.bind(this)}
                onBlur={this.pageTestNumber.bind(this)}
              />
            </div>
            <span className='input-tips'>{showTips ? '身份证号有误，请重新输入' : ''}</span>

            <div className='sub-btn' onClick={this.submitCardNumber.bind(this)}>
              查询
            </div>
          </div>
        )}
        {showToast && <Toast msg={errorMsg} />}
        {queryList.map(v => {
          const plan = v.maskPlan || {}
          const shop = v.shop || {}
          return (
            <div className='answer'>
              {/*<div className='success-text'>预约成功</div>*/}
              <div className='mask-list'>
                <div className='info-item'>
                  <div className='title'>预约门店:</div>
                  <div className='content'>{(v.shop || {}).name}</div>
                </div>
                <div className='info-item'>
                  <div className='title'>到店时间:</div>
                  <div className='content'>{`${plan.receiveDate} ${plan.bookTimeStart}-${plan.bookTimeEnd}`}</div>
                </div>
                <div className='info-item'>
                  <div className='title'>可购数量:</div>
                  <div className='content'>{plan.buyLimit}只</div>
                </div>
                <div className='info-item'>
                  <div className='title'>预约姓名:</div>
                  <div className='content'>{v.name}</div>
                </div>
                <div className='info-item'>
                  <div className='title'>身份证号:</div>
                  <div className='content'>{v.idCard}</div>
                </div>
                <div className='info-item'>
                  <div className='title'>门店地址:</div>
                  <div className='content'>{shop.address}</div>
                </div>
                <div className='info-item'>
                  <div className='title'>门店电话:</div>
                  <div className='content'>{shop.tel}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  submitCardNumber() {
    const { adCard } = this.state
    // 提交adCard
    // *****
    // 成功
    const check = this.checkIdCard(adCard)
    if (!check) {
      this.setState({ showTips: true })
    } else {
      this.setState({ showTips: false })
      this.getInfoByIdCard(adCard)
    }
  }

  getInfoByIdCard = idCard => {
    api.getInfoByIdCard({ idCard }).then(res => {
      console.log(res)
      if (!res || res.length === 0) {
        this.setState({ showToast: true, errorMsg: '该身份证号无预约记录' })
        setTimeout(() => {
          this.setState({ showToast: false })
        }, 3000)
      } else {
        this.setState({
          queryList: res
        })
        document.title = '预约结果'
      }
    })
  }

  onInputCardNumber(e) {
    this.setState({
      adCard: e.target.value
    })
  }

  pageTestNumber() {
    if (!this.state.adCard) {
      message.error('请输入身份证号码')
    }
  }

  getUrlToken(name, str) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
    const r = str.substr(1).match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return null
  }
}
