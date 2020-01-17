import React from 'react'
import { Toast } from 'antd-mobile'
import { message } from 'antd'
import moment from 'moment'

import { setToken } from '@/cache/token.js'
import './index.scss'
import FirstFloor from './view/first-floor'
import { getActivityDetail, checkUser, getCouponDetail } from './api/api'

export default class ActivityHotel extends React.Component {
  state = {
    activityConfig: {},
    couponList: [],
    tabs: [],
    floorCouponList: {}
  }

  limit = this.props.match.params.limit

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
              console.log(floorCouponList)
              this.setState({ floorCouponList })
            })
          })
        this.setState({ activityConfig: res }, () => {
          let activityModal = document.getElementsByClassName('activity-modal')
          activityModal[0] && (activityModal[0].style.background = res.colors.bgColor)
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
          <img className='img' src={activityConfig ? activityConfig.bgImg : ''} alt='暂无图片' />
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
        {activityConfig.bottomImage && (
          <div style={{ width: '100%' }}>
            <img style={{ width: '100%' }} src={activityConfig.bottomImage} />
          </div>
        )}
      </div>
    )
  }

  goCouponDetail = item => {
    const { id: couponId, beginAt, endAt } = item

    if (beginAt && endAt) {
      const now = new Date().getTime()
      const start = new Date(moment(beginAt).format()).getTime()
      const end = new Date(moment(endAt).format()).getTime()
      if (now < start) {
        message.warn('活动尚未开始，请耐心等待！')
      } else if (now > end) {
        message.warn('活动已结束，下次早点来哟~')
      } else {
        getCouponDetail({ id: couponId }).then(couponDetail => {
          console.log(couponDetail)
          const list = { ...this.state.floorCouponList }
          list[couponId] = couponDetail
          this.setState(
            {
              floorCouponList: list
            },
            () => {
              console.log(this.state.floorCouponList)
            }
          )
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
}
