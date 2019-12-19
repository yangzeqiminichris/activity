import React from 'react';
import './index.scss';
import { message } from 'antd';

import { setToken } from '@/cache/token.js'
import { getCouponDetail } from "../../api/coupon";
import { getO2OActivityDetail, postO2OBatchExchange } from './api/api'
import { getToken } from "../../cache/token";
import ModalCouponInfo from '@/components/modal-coupon-item/modal-coupon-item'
import popBg from '@/assets/modal-four/pop_bg.png'
import ModalFourPopup from "./component/popup/popup";

var activityImg = ''
const UNRECEIVE = 'UNRECEIVE'
const RUN_OUT = 'RUN_OUT'
const HAS_RECEIVED = 'HAS_RECEIVED'
const tabBarPages = ['/pages/mall/index', '/pages/o2o/index', '/pages/person/index', '/pages/tabBar/coupon/index']

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      settlementInfo: {
        couponVos: []
      },
      daojiaCouponVos: [],
      activityId: null,
      showPopup: false,
      couponStatus: RUN_OUT
    }
    this.receiveCoupon = this.receiveCoupon.bind(this)
    this.getCouponInfo = this.getCouponInfo.bind(this)
    this.goToLink = this.goToLink.bind(this)
  }

  async componentWillMount() {
    let t = this.props.location.search.split('&')
    let activityId = this.props.match.params.activityId
    this.setState({activityId})
    let token = this.getUrlToken('token', this.props.location.search)
    this.props.history.listen(() => {
      window.location.reload()
    })
    await setToken(token).then(() => {
      this.getCouponInfo()
    })
  }

  render () {
    const { settlementInfo, showPopup, couponStatus } = this.state
    return (
      <div className='activity' style={{ background: settlementInfo.colorInfo && settlementInfo.colorInfo.bgColor }}>
        <div style={{ position: 'relative'}} className='activity-img'>
          <img src={ activityImg } className='activity-img-bg'/>
        </div>
        <div className='choose' style={{ background: settlementInfo.colorInfo && settlementInfo.colorInfo.bgColor }}>
          {/*{
            settlementInfo && settlementInfo.couponVos && settlementInfo.couponVos.map((item) => {
              return (
                <div key={ item.id }>
                  <CouponInfo couponInfo={ item } onReceiveCoupon={ this.receiveCoupon } />
                </div>

              )
            })
          }*/}

          {
            settlementInfo && settlementInfo.couponVos && settlementInfo.couponVos.map((item) => {
              return (
                <div key={ item.id }>
                  <ModalCouponInfo couponInfo={ item } onReceiveCoupon={ this.receiveCoupon } />
                </div>

              )
            })
          }
          {/*{
            settlementInfo && settlementInfo.couponList && settlementInfo.couponList.map((item) => {
              return (
                <div key={item.id + 'img'} className='four-coupon'>
                  <img src={ runOut } className='four-coupon-icon' style={{ display: item && item.couponDetail && item.couponDetail.stock ? 'none' : 'block' }} />
                  <img src={ hasReceived } className='four-coupon-icon' style={{ display: item && item.couponDetail && item.couponDetail.reachPurchaseLimit ? 'block' : 'none' }} />
                  <img src={item.img} className='choose-headimg' />
                </div>
              )
            })
          }*/}
        </div>
        <div className='four-btn-area' style={{ background: settlementInfo.colorInfo && settlementInfo.colorInfo.btnBgColor }}>
          <div className='base-btn onclick' onClick={ this.receiveCoupon }>{couponStatus === UNRECEIVE ? '一键领取' : couponStatus === HAS_RECEIVED ? '去使用' : '已抢光'}</div>
        </div>
        <div style={{ display: showPopup ? 'block' : 'none'}}>
          <ModalFourPopup
            tips='领取成功，快去使用吧~'
            smallTips=''
            imgBg={popBg}
            closeTipsPopup={ this.closePopup }
            goLink={ this.goToLink }
          />
        </div>
      </div>
    )
  }

  receiveCoupon = (item) => {
    if (this.state.couponStatus === UNRECEIVE) {
      let token = getToken()
      if (token) {
        postO2OBatchExchange(this.state.activityId).then(() => {
          this.getCouponInfo()
          this.closePopup()
        })
      } else {
        window.wx.miniProgram.navigateTo({url: '/pages/user/login/login'})
      }
    } else if (this.state.couponStatus === HAS_RECEIVED) {
      this.goToLink()
    } else if (this.state.couponStatus === RUN_OUT) {
      return
    }
  }

  getCouponInfo = () => {
    getO2OActivityDetail(this.state.activityId).then((res) => {
      if (!res) {
        message.error("暂无该活动");
        setTimeout(() => {
          window.wx.miniProgram.navigateBack({
            delta: -1
          });
        }, 1500);
        return;
      }
      let couponIds = []
      res.couponList.map((item) => {
        couponIds.push(item.id)
      })
      if (res && res.name) {
        document.title = res.name
      }
      activityImg = res.bgImg
      this.setState({
        settlementInfo: res
      }, () => {
        getCouponDetail(couponIds).then((res) => {
          let couponStatus = UNRECEIVE
          let settlementInfo = this.state.settlementInfo
          settlementInfo.couponList.map((setItem, setIndex) => {
            res.records.map((recordItem) => {
              if (setItem.id === recordItem.id) {
                settlementInfo.couponList[setIndex].couponDetail = recordItem
              }
            })
          })
          res.records.map((recordItem) => {
            console.log('recordItem', recordItem)
            if (recordItem.reachPurchaseLimit === 1) { // 达到领取上限
              couponStatus = HAS_RECEIVED
            } else if (recordItem.stock !== 0 && couponStatus !== HAS_RECEIVED ) {
              couponStatus = UNRECEIVE
            }
          })
          settlementInfo.couponVos = res.records
          this.setState({
            settlementInfo,
            couponStatus
          }, () => { console.log('22222',this.state.settlementInfo)})
        })
      })
    })
  }

  goToLink = () => {
    let url = this.state.settlementInfo.link
    if (/pages\//.test(url)) {
      if (tabBarPages.indexOf(url) !== -1) {
        window.wx.miniProgram.switchTab({url})
      } else {
        window.wx.miniProgram.navigateTo({url})
      }
    } else if (/^game?:\/\//.test(url)) {
      let gameUrl = url.replace('game://', '')
      window.wx.miniProgram.navigateTo({
        url: `/packageA/pages/webviewGame/webviewGame?url=${ gameUrl }`
      })
    } else if (url && url !== '/') {
      if (/#\/activity-modal/.test(url)) {
        window.wx.miniProgram.navigateTo({
          url: `/packageA/pages/webviewo2oWithToken/webviewo2oWithToken?url=${ url }`
        })
      } else {
        window.wx.miniProgram.navigateTo({
          url: `/packageA/pages/webviewWithToken/webviewWithToken?url=${ url }`
        })
      }
    }
  }

  getUrlToken(name, str) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
    const r = str.substr(1).match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return null
  }

  closePopup = () => {
    this.setState((prevState) => ({
      showPopup: !prevState.showPopup
    }))
  }
}
