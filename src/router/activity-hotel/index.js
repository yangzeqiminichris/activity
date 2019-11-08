import React from 'react'
import { Toast } from 'antd-mobile'
import { message } from 'antd'
import moment from 'moment'

import { setToken } from '@/cache/token.js'
import { getCouponDetail } from '@/api/custom-modal'
import './index.scss'
import FirstFloor from './view/first-floor'
import { getActivityDetail, checkUser } from './api/api'
import tipImg from '@/assets/activity_hotel_tip.png'

export default class ActivityHotel extends React.Component {
  state = {
    activityConfig: {},
    couponList: [],
    tabs: [],
    floorCouponList: {}
  }

  async componentDidMount() {
    Toast.loading('Loading...', 20)
    // this.props.history.listen(async () => {
    //   await this.componentDidMount()
    //   window.history.back(-1)
    // })
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
        // this.setState({ activityConfig: res })
        // 获取券详情
        // const { floors = [] } = res;
        // getCouponDetail(res.limitCoupons).then(coupon => {
        //   this.setState({
        //     couponList: coupon ? coupon.records : []
        //   });
        // });
        // floors.map((floor, index) => {
        //   getCouponDetail(floor.couponList).then(coupon => {
        //     const floorCouponList = { ...this.state.floorCouponList };
        //     floorCouponList[index] = coupon ? coupon.records : [];
        //     this.setState({ floorCouponList });
        //   });
        // });
        this.setState({ activityConfig: res }, () => {
          let activityModal = document.getElementsByClassName('activity-modal')
          // let tabActive =
          //   document.getElementsByClassName("am-tabs-default-bar-tab-active") ||
          //   [];
          activityModal[0] &&
            (activityModal[0].style.background = res.colors.bgColor)
          // [...tabActive].forEach(item => {
          //   item.style.background = res.colors.floorSelectedColor;
          // });
        })
      })
    })
  }

  render() {
    const { activityConfig } = this.state
    return (
      <div className='activity-modal clearfix'>
        <div className='banner'>
          <img
            className='img'
            src={activityConfig ? activityConfig.bgImg : ''}
            alt='暂无图片'
          />
        </div>
        <div id='floor'>
          <div className={`tabs-content`}>
            <FirstFloor
              goCouponDetail={this.goCouponDetail}
              dataSource={activityConfig.firstFloor}
            />
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <img style={{ width: '100%' }} src={tipImg} />
        </div>
      </div>
    )
  }

  goCouponDetail = item => {
    const { id: couponId, beginAt, endAt } = item
    checkUser().then(res => {
      if (!res) {
        getCouponDetail(couponId).then(coupon => {
          const detail = coupon.records
          if (!detail || detail.length === 0) {
            if (beginAt && endAt) {
              const now = moment().second()
              const start = moment(beginAt).second()
              const end = moment(endAt).second()
              if (now < start) {
                message.warn('活动尚未开始，请耐心等待！')
              } else if (now > end) {
                message.warn('活动已过期！')
              }
            } else {
              message.warn('活动尚未开始，请耐心等待！')
            }
          } else {
            window.wx.miniProgram.navigateTo({
              url: '/packageA/pages/integral/reduction/index?id=' + couponId
            })
          }
        })
      } else {
        message.warn('集团员工，无法抢购哦，分享非员工好友抢购吧~')
      }
    })
  }
  getUrlToken(name, str) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
    const r = str.substr(1).match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return null
  }
}
