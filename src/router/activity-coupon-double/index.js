import React from 'react'
import { Toast } from 'antd-mobile'
import { message } from 'antd'
import moment from 'moment'

import { setToken } from '@/cache/token.js'
import { getCouponDetail } from '@/api/custom-modal'
import './index.scss'
import FirstFloor from './view/first-floor'
import OtherFloor from './view/other-floor'
import CouponItemTop from './component/coupon-item-t'
import TabsView from './view/tabs-view'
import { getActivityDetail, checkUser } from './api/api'

export default class ActivityModal extends React.Component {
  state = {
    activityConfig: {},
    couponList: [],
    tabs: [],
    firstFloorCoupons: [],
    subFloorCoupons: []
  }

  limit = this.props.match.params.limit

  componentDidMount() {
    Toast.loading('Loading...', 20)
    // this.props.history.listen(async () => {
    //   await this.componentDidMount()
    //   window.history.back(-1)
    // })
    let token = this.getUrlToken('token', this.props.location.search)
    let activityId = this.props.match.params.activityId
    setToken(token).then(() => {
      // 获取活动详情
      getActivityDetail({ id: activityId }).then(res => {
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
        // 获取券详情
        const { subFloor = {}, firstFloor = {} } = res
        // 获取首图优惠券详情
        if ((res.limitCoupons || []).length > 0) {
          getCouponDetail(res.limitCoupons).then(coupon => {
            this.setState({
              couponList: coupon ? coupon.records : []
            })
          })
        }
        // 获取主楼层优惠券详情
        const firstFloorIds = (firstFloor.coupons || []).map(coupon => coupon.id)
        if (firstFloorIds.length) {
          getCouponDetail(firstFloorIds).then(coupon => {
            this.setState({ firstFloorCoupons: coupon.records })
          })
        }
        // 获取双列楼层优惠券详情
        const subFloorIds = (subFloor.coupons || []).map(coupon => coupon.id)
        if (subFloorIds.length) {
          getCouponDetail(subFloorIds).then(coupon => {
            this.setState({ subFloorCoupons: coupon.records })
          })
        }
        this.setState({ activityConfig: res }, () => {
          let activityModal = document.getElementsByClassName('activity-modal')
          let tabActive = document.getElementsByClassName('am-tabs-default-bar-tab-active') || []
          activityModal[0] && (activityModal[0].style.background = res.colors.bgColor)
          ;[...tabActive].forEach(item => {
            item.style.background = res.colors.floorSelectedColor
          })
        })
      })
    })
  }

  goCouponDetail = item => {
    const stock = item.stock
    const couponId = item.id
    console.log(item)
    if (stock == 0) {
      message.warn('已抢光!')
    } else {
      if (!this.limit) {
        checkUser().then(res => {
          if (!res) {
            this.toCoupon(couponId)
          } else {
            message.warn('已抢光！')
          }
        })
      } else {
        this.toCoupon(couponId)
      }
    }
  }

  goCouponDetailFirst = item => {
    const { id: couponId, beginAt, endAt } = item
    console.log(item)
    if (beginAt && endAt) {
      const now = new Date().getTime()
      const start = new Date(moment(beginAt).format()).getTime()
      const end = new Date(moment(endAt).format()).getTime()
      if (now < start) {
        message.warn('活动尚未开始，请耐心等待！')
      } else if (now > end) {
        message.warn('活动已结束，下次早点来哟~')
      } else {
        getCouponDetail(couponId).then(res => {
          const couponDetail = res.records[0]
          console.log(couponDetail)
          if (couponDetail.stock == 0) {
            message.warn('已抢光！')
          } else {
            if (!this.limit) {
              checkUser().then(res => {
                if (!res) {
                  this.toCoupon(couponId)
                } else {
                  message.warn('已抢光！')
                }
              })
            } else {
              this.toCoupon(couponId)
            }
          }
        })
      }
    } else {
      message.warn('活动尚未开始，请耐心等待！')
    }
  }

  toCoupon = couponId => {
    window.wx.miniProgram.navigateTo({
      url: '/packageA/pages/integral/reduction/index?id=' + couponId
    })
  }

  getUrlToken(name, str) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
    const r = str.substr(1).match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return null
  }

  render() {
    const { activityConfig, couponList, subFloorCoupons, firstFloorCoupons } = this.state
    return (
      <div className='activity-modal'>
        <div className='banner'>
          <img className='img' src={activityConfig ? activityConfig.bgImg : ''} alt='暂无图片' />
        </div>
        <div className='coupon-list'>
          {couponList &&
            couponList.map((item, index) => {
              return <CouponItemTop goCouponDetail={this.goCouponDetail} key={'coupon' + index} dataSource={item} />
            })}
          <div className='white-space'></div>
        </div>
        <div id='floor' style={{ fontSize: 0 }}>
          {activityConfig && <TabsView dataSource={activityConfig} />}
          <div className={`tabs-content`}>
            <FirstFloor
              goCouponDetail={this.goCouponDetailFirst}
              dataSource={activityConfig.firstFloor}
              floorCoupons={firstFloorCoupons}
            />
            <OtherFloor
              goCouponDetail={this.goCouponDetailFirst}
              dataSource={activityConfig.subFloor}
              floorCoupons={subFloorCoupons}
            />
          </div>
        </div>
        {activityConfig.bottomImage && (
          <div style={{ width: '100%' }}>
            <img style={{ width: '100%' }} src={activityConfig.bottomImage} />
          </div>
        )}
      </div>
    )
  }
}
