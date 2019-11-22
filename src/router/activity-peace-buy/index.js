import React from 'react'
import { Toast } from 'antd-mobile'
import { message } from 'antd'
import moment from 'moment'

import { setToken, getToken } from '@/cache/token.js'
import './index.scss'
import FirstFloor from './view/first-floor'
import { getActivityDetail, checkUser, getCouponDetail } from './api/api'
import peaceBuyBottom from '@/assets/peace_buy_bottom.png'

export default class ActivityLimitPurchase extends React.Component {
  state = {
    activityConfig: {},
    couponList: [],
    tabs: [],
    floorCouponList: {}
  }

  async componentDidMount() {
    Toast.loading('Loading...', 20)
    let token = this.getUrlToken('token', this.props.location.search)
    let activityId = this.props.match.params.activityId
    await setToken(token).then(async () => {
      // 获取活动详情
      await getActivityDetail({ id: activityId }).then(res => {
        if (!res) {
          message.error('暂无该活动')
          setTimeout(() => {
            window.wx.miniProgram.navigateBack({
              delta: -1
            })
          }, 1500)
          return
        }
        if (res.title) {
          document.title = res.title
        }
        Toast.hide()
        const floorCouponList = {}
        res.firstFloor.coupons
          .map(item => item.id)
          .map(id => {
            getCouponDetail({ id }).then(couponDetail => {
              floorCouponList[id] = couponDetail
              console.log('floorCouponList', floorCouponList)
              this.setState({ floorCouponList })
            })
          })
        this.setState({ activityConfig: res }, () => {
          let activityModal = document.getElementsByClassName('activity-modal')
          activityModal[0] &&
            (activityModal[0].style.background = res.colors.bgColor);
          console.log('activityConfig', this.state.activityConfig)
        })
      })
    })
  }

  render() {
    const { activityConfig, floorCouponList } = this.state
    console.log(floorCouponList)
    return (
      <div className='activity-modal clearfix'>
        <div className='banner'>
          <img
            className='img'
            src={activityConfig ? activityConfig.bgImg : ''}
          />
        </div>
        <div id='floor'>
          <div className={`tabs-content`}>
            {JSON.stringify(floorCouponList) !== '{}' && (
              <FirstFloor
                goCouponDetail={this.goCouponDetail}
                dataSource={activityConfig.firstFloor}
                floorCouponList={floorCouponList}
              />
            )}
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <img style={{ width: '100%' }} src={ peaceBuyBottom } />
        </div>
      </div>
    )
  }

  goCouponDetail = item => {
    const { id: couponId, beginAt, endAt } = item
    const { activityConfig } = this.state
    if (beginAt && endAt) {
      const now = new Date().getTime()
      const start = new Date(moment(beginAt).format()).getTime()
      const end = new Date(moment(endAt).format()).getTime()
      if (now < start) {
        message.warn('活动尚未开始，请耐心等待！')
      } else if (now > end) {
        message.warn('活动已结束，下次早点来哟~')
      } else {
        this.throttle (() => {
          getCouponDetail({ id: couponId }).then(async (couponDetail) => {
            console.log(couponDetail)
            const list = { ...this.state.floorCouponList }
            list[couponId] = couponDetail
            this.setState({
                floorCouponList: list
              })
            if (couponDetail.stock == 0) {
              message.warn('已抢光！')
            } else {
              if ((couponDetail.reachPurchaseLimit && couponDetail.reachPurchaseLimit === 1)) {
                if (couponDetail.noPayGoodsCount && couponDetail.noPayGoodsCount > 0) {
                  message.warn('您有未支付的订单，请去“我的-我的订单-其他订单”继续支付')
                } else {
                  message.warn('每人一次抢购资格，您的抢购资格已经用完咯~')
                }
              } else {
                window.wx.miniProgram.navigateTo({
                  url: '/packageA/pages/integral/reduction/index?id=' + couponId
                })
              }
            }
          })
        })
      }
    } else {
      message.warn('活动尚未开始，请耐心等待！')
    }
  }
  canRun = true // 通过闭包保存一个标记
  throttle = (fn, delay = 3000) => {
    // 在函数开头判断标记是否为true，不为true则return
    if (!this.canRun) {
      return
    } else {
      this.canRun = false
      fn()
      setTimeout(() => {
        // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。
        // 当定时器没有执行的时候标记永远是false，在开头被return掉
        this.canRun = true
      }, delay)
    }
  }

  getUrlToken(name, str) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
    const r = str.substr(1).match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return null
  }

  gotoMorderCoupon = async () => {
    /*let token = await getToken()
    console.log(token)
    window.wx.miniProgram.navigateTo({url: `/packageA/pages/webviewWithToken/webviewWithToken?url=${ process.env.REACT_APP_KOI_URL }&title=全城寻锦鲤`})*/
  }
}
