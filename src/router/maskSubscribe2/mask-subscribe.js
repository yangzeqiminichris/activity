import React from 'react'
import { setToken } from '@/cache/token.js'
import { getDate2, getLastTime } from '@/utils/time'
import { Icon } from 'antd'
import { Picker } from 'antd-mobile'
import api from '@/api/mask-subscribe'
import Popup from './component/popup'
import SubscribePopup from './component/subscribe-popup/subscribe-popup'
import Toast from './component/toast'
import moment from 'moment'

import './index.scss'

import TitleImg from './img/title.png'
import BtnImg from './img/bg_btn.png'

export default class MaskSubscribe extends React.Component {
  state = {
    type: 1, // 1-预约 2-开始预约
    date: {},
    shopId: '',
    shopName: '请选择',
    subList: [],
    isFirst: true,
    showRule: false,
    shopList: [], // 门店列表
    modalKey: 1,
    showModal: true,
    codeImg: '',
    planId: '', // 预约id
    errorMsg: '', // 错误msg
    showToast: false,
    limitTimeStr: ''
  }

  limitTime = 0

  dateTimeout = null

  componentWillMount() {
    this.props.history.listen(() => {
      window.location.reload()
    })
  }

  componentDidMount() {
    this.getInit()
    document.title = '预约口罩'
  }

  componentWillUnmount() {
    clearInterval(this.dateTimeout)
  }

  getInit = () => {
    api.getLimitTime().then(res => {
      this.limitTime = res
      this.setState({ limitTimeStr: moment(new Date(+res)).format('MM月DD号 HH:mm') }, () => {
        if (this.getType()) {
          this.setState({ type: 2, showRule: true, isFirst: false })
          this.getShopList()
        } else {
          this.setState({ type: 1 })
          this.dateTimeout = setInterval(() => {
            if (this.getType()) {
              clearInterval(this.dateTimeout)
              this.setState({ type: 2 })
              this.getShopList()
            } else {
              this.getLastTime()
            }
          }, 1000)
        }
      })
    })
  }

  getShopList = () => {
    api.getShopList().then(res => {
      const data = res.map(v => ({
        value: v.id,
        label: v.name
      }))
      this.setState({ shopList: data, shopId: data[0].value, shopName: data[0].label })
      this.getPlan(data[0].value)
    })
  }

  getPlan = shopId => {
    api.getPlan(shopId).then(res => {
      this.setState({ subList: res })
    })
  }

  getType = () => {
    return this.limitTime < new Date().getTime()
  }

  getLastTime = () => {
    const date = getLastTime(this.limitTime)
    this.setState({ date })
  }

  // 门店选择
  onChangeShop = v => {
    console.log(v)
    const shopId = v[0]
    const shopName = this.state.shopList.filter(shop => shop.value === shopId)[0].label
    this.setState({ shopId, shopName })
    this.getPlan(shopId)
  }

  toQuery = () => {
    this.props.history.push('/query-subscribe')
    // window.wx.miniProgram.navigateTo({
    //   url: `/packageA/pages/webviewWithToken/webviewWithToken?url=${link}`
    // })
  }

  showRule = () => {
    this.setState({ showRule: true })
  }

  closeRule = () => {
    this.setState({ showRule: false })
  }

  // 确认预约
  onSubConfirm = data => {
    api
      .maskPost({ ...data, planId: this.state.planId })
      .then(res => {
        this.props.history.push('/query-subscribe/' + data.idCard)
      })
      .catch(err => {
        console.log(err)
        if (err.msg) {
          this.showToast(err.msg)
        }
      })
  }

  toDetails = () => {
    this.props.history.push('/mask-details')
  }

  // 预约按钮点击 // 打开弹窗  // 打开后获取验证码
  onSubscribe = (amount, id) => {
    if (amount === 0) {
    } else {
      this.setState({
        showModal: true,
        modalKey: this.state.modalKey + 1,
        planId: id
      })
      this.getCode()
    }
  }

  getCode = () => {
    api.getCode().then(res => {
      console.log(res)
      this.setState({ codeImg: 'data:image/png;base64,' + res })
    })
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  showToast = msg => {
    this.setState({ showToast: true, errorMsg: msg })
    setTimeout(() => {
      this.setState({ showToast: false })
    }, 3000)
  }

  render() {
    const {
      type,
      date,
      subList,
      showRule,
      shopList,
      shopName,
      shopId,
      showModal,
      modalKey,
      codeImg,
      showToast,
      errorMsg,
      limitTimeStr
    } = this.state
    return (
      <div className='mask-subscribe'>
        <div className='bef-bg'>
          <div className='bef-btn-box'>
            <img className='bef-btn' src={BtnImg} onClick={this.toDetails} />
          </div>
          {type === 1 && (
            <div className='bef-body'>
              <div className='bef-time-box'>
                <div className='title'>距离开放预约时间</div>
                <div className='time'>
                  <span className='box'>{date.h}</span>
                  <span className='font'>时</span>
                  <span className='box'>{date.m}</span>
                  <span className='font'>分</span>
                  <span className='box'>{date.s}</span>
                  <span className='font'>秒</span>
                </div>
                <div className='footer'>
                  开放预约时间：<span>{limitTimeStr}</span>
                </div>
              </div>
              <div className='bef-rule-box'>
                <div className='title'>
                  <img src={TitleImg} />
                  <span>预约规则</span>
                  <img className='img2' src={TitleImg} />
                </div>
                <div className='content'>
                  <div>1. 每人每天限购口罩5只，每天可预约一次；</div>
                  <div>
                    2.
                    领取时间：2020年3月2日-3月31日每天早上8点开通预约，售价20元/5只，预约成功后次日10：00-17：00凭本人身份证号至安吉购物中心烟酒柜台付款后领取；
                  </div>
                  <div>
                    3. 口罩数量有限，以提交申请的现后次序排序，口罩总量约满后即关闭当日预约通道，次日8点重新开始。
                  </div>
                </div>
              </div>
            </div>
          )}
          {type === 2 && (
            <div className='mask-body'>
              <div className='mask-rule-btn' onClick={this.showRule}>
                规则
              </div>
              <div className='mask-select-box'>
                <label className='title'>选择预约门店</label>
                <Picker data={shopList} cols={1} onChange={this.onChangeShop} value={[shopId]}>
                  <div className='select'>
                    <span className='name'>{shopName}</span>
                    <Icon className='icon' type='caret-down' style={{ color: '#000' }} />
                  </div>
                </Picker>
              </div>
              {subList.length > 0 && (
                <div className='subscribe-box'>
                  <div className='title'>
                    <span className='icon'></span>
                    <span>领取时间</span>
                  </div>
                  <div className='content'>
                    {subList.map(v => (
                      <div>
                        <div className='sub-item'>
                          <div className='sub-content'>
                            <div className='item-1'>
                              <div>{v.receiveDate}</div>
                              <div className='font-24 no-wrap'>
                                <span className='font-gray'>可预约人数:</span>
                                <span>{v.bookAmount}</span>
                              </div>
                            </div>
                            <div className='item-2'>
                              <div>{`${v.bookTimeStart}-${v.bookTimeEnd}`}</div>
                              <div className='font-24 no-wrap'>
                                <span className='font-gray'>剩余人数:</span>
                                <span>{v.amount}</span>
                                <span className='limit-btn'>每人限购{v.buyLimit}只</span>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`sub-btn ${+v.amount === 0 ? 'disabled' : ''}`}
                            onClick={() => this.onSubscribe(+v.amount, v.id)}
                          >
                            {+v.amount === 0 ? '已抢光' : '预约'}
                          </div>
                        </div>
                        <div className='line'></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <div className='btn-box'>
            <div className='btn' onClick={this.toQuery}>
              查询已预约
            </div>
          </div>
        </div>
        {showRule && <Popup onCancel={this.closeRule} />}
        {showModal && (
          <SubscribePopup
            key={modalKey}
            closeTipsPopup={this.closeModal}
            codeImg={codeImg}
            onOk={this.onSubConfirm}
            getCode={this.getCode}
          />
        )}
        {showToast && <Toast msg={errorMsg} />}
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
