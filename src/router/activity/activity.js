import React from 'react';
import './index.scss';
import { message } from 'antd';

import couponCash from '@/assets/cash-coupon.png'
import couponDikou from '@/assets/manjian_img_normal.png'
import couponZhekou from '@/assets/zhukuo_img_normal.png'
import couponShip from '@/assets/yunfei_img_normal.png'
import newToKoi from '@/assets/new_to_koi.gif'
import anjiBanner from '@/assets/anji_banner.png'
import zhebeidaojiaBanner from '@/assets/zhebeidaojia_banner.png'
import huzhouBanner from '@/assets/huzhou_banner.png'
import { setToken } from '@/cache/token.js'
import { getCouponDetail, postReceiveCoupon, getActivityInfo } from "../../api/coupon";
import { getToken } from "../../cache/token";
import CouponInfo from '@/components/coupon-item/coupon-item'


const COUPON_IMG = {
    1: couponDikou,
    2: couponZhekou,
    4: couponCash,
    5: couponShip
}
var activityImg = ''

export default class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        settlementInfo: {
          couponVos: []
        },
        daojiaCouponVos: [],
        activityId: null
      }
      this.receiveCoupon = this.receiveCoupon.bind(this)
      this.getCouponInfo = this.getCouponInfo.bind(this)
    }

    async componentWillMount() {
      document.title = '新人专区'
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
      const { settlementInfo, daojiaCouponVos } = this.state
      return (
        <div className='activity'>
          <div style={{ position: 'relative'}} className='activity-img'>
            <img src={ activityImg } className='activity-img-bg'/>
          </div>

          <div className='choose'>
            {/*{
              (settlementInfo.couponVos || []).map((item) => {
                return (
                  <div className='choose-coupon' key={ item.id }>
                    <div className='choose-coupon-left'>
                      <img src={COUPON_IMG[item.couponGoodsInfo.couponType]} className='choose-coupon-left-img' />
                      <div className='choose-coupon-left-info'>
                        <p className='choose-coupon-left-info-name'>{ item.name }</p>
                        <div className='price'>
                          <div className='money'>
                            {
                              (item.couponGoodsInfo.couponType === 1 || item.couponGoodsInfo.couponType === 4) ? <p className='sign'>￥</p> : ''
                            }
                            <p className='sum'>{ item.couponGoodsInfo.couponValue }</p>
                            {
                              item.couponGoodsInfo.couponType === 2 ? <p className='sign'>折</p> : ''
                            }
                          </div>
                          {
                            item.couponGoodsInfo.thresholdAmount ? <div className='reduction'>满{ item.couponGoodsInfo.thresholdAmount }可用</div> : ''
                          }
                        </div>
                      </div>
                    </div>
                    <div className='choose-coupon-right'>
                      <div className='choose-coupon-right-btn' onClick={ this.receiveCoupon.bind(this, item) } style={{ backgroundColor: item.reachPurchaseLimit ? '#febbc8' : '#F92051' }}>{item.reachPurchaseLimit ? '已领取' : '领取'}</div>
                    </div>
                  </div>
                )
              })
            }*/}
            {
              settlementInfo && settlementInfo.couponVos && settlementInfo.couponVos.map((item) => {
                return (
                  <div key={ item.id }>
                    <CouponInfo couponInfo={ item } onReceiveCoupon={ this.receiveCoupon } />
                  </div>

                )
              })
            }
            {/*<img src={ huzhouBanner } className='choose-headimg' />
            {
              settlementInfo && settlementInfo.couponVos && settlementInfo.couponVos[0] && <CouponInfo couponInfo={ settlementInfo.couponVos[0] } onReceiveCoupon={ this.receiveCoupon } />
            }
            <img src={ anjiBanner } className='choose-headimg' />
            {
              settlementInfo && settlementInfo.couponVos && settlementInfo.couponVos[1] && <CouponInfo couponInfo={ settlementInfo.couponVos[1] } onReceiveCoupon={ this.receiveCoupon } />
            }
            <img src={ zhebeidaojiaBanner } className='choose-headimg' />
            {
              daojiaCouponVos && daojiaCouponVos.map((item) => {
                return (
                  <div key={ item.id }>
                    <CouponInfo couponInfo={ item } onReceiveCoupon={ this.receiveCoupon } />
                  </div>

                )
              })
            }*/}
          </div>
        </div>
      )
    }

  receiveCoupon = (item) => {
    let token = getToken()
    if (token) {
      if (!item.reachPurchaseLimit) {
        postReceiveCoupon(item.id).then(() => {
          message.success('领取成功')
          this.getCouponInfo()
        })
      }
    } else {
        window.wx.miniProgram.navigateTo({url: '/pages/user/login/login'})
    }
  }

  getCouponInfo = () => {
    getActivityInfo(this.state.activityId).then((res) => {
      activityImg = res.bgImg
      getCouponDetail(res.couponList).then((res) => {
        let daojiaCouponVos = [...res.records]
        daojiaCouponVos.splice(0, 2)
        this.setState({
          settlementInfo: {
            couponVos: res.records
          },
          daojiaCouponVos
        }, () => { console.log(this.state.settlementInfo)})
      })
    })
  }

  getUrlToken(name, str) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
    const r = str.substr(1).match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return null
  }

  /*gotoKoi = async () => {
    let token = await getToken()
    console.log(token)
    window.wx.miniProgram.navigateTo({url: `/packageA/pages/webviewWithToken/webviewWithToken?url=${ process.env.REACT_APP_KOI_URL }&title=全城寻锦鲤`})
  }*/
}
