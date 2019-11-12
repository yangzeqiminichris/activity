import React from 'react';
import './index.scss';
import { message } from 'antd';

import couponCash from '@/assets/cash-coupon.png'
import couponDikou from '@/assets/manjian_img_normal.png'
import couponZhekou from '@/assets/zhukuo_img_normal.png'
import couponShip from '@/assets/yunfei_img_normal.png'
import newToKoi from '@/assets/new_to_koi.gif'
import { setToken } from '@/cache/token.js'
import { getCouponDetail, postReceiveCoupon, getActivityInfo } from "../../api/coupon";
import { getToken } from "../../cache/token";

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
        }
      }
    }

    componentWillMount () {
      document.title = '新人专区'
    }

    componentDidMount() {
      let t = this.props.location.search.split('&')
      let token = t[0].replace('?token=', '')
      this.props.history.listen(() => {
        window.location.reload()
      })
      setToken(token).then(() => {
        getActivityInfo().then((res) => {
          console.log(res)
          activityImg = res.bgImg
          getCouponDetail(res.couponList).then((res) => {
            this.setState({
              settlementInfo: {
                couponVos: res.records
              }
            })
          })
        })
      })
    }

    render () {
      const { settlementInfo } = this.state
      return (
        <div className='activity'>
          <div style={{ position: 'relative'}} className='activity-img'>
            <img src={ activityImg } className='activity-img-bg'/>
          </div>

          <div className='choose'>
            {
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
            }
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
          getActivityInfo().then((res) => {
            activityImg = res.bgImg
            getCouponDetail(res.couponList).then((res) => {
              this.setState({
                settlementInfo: {
                  couponVos: res.records
                }
              })
            })
          })
        })
      }
    } else {
        window.wx.miniProgram.navigateTo({url: '/pages/user/login/login'})
    }
  }

  /*gotoKoi = async () => {
    let token = await getToken()
    console.log(token)
    window.wx.miniProgram.navigateTo({url: `/packageA/pages/webviewWithToken/webviewWithToken?url=${ process.env.REACT_APP_KOI_URL }&title=全城寻锦鲤`})
  }*/
}
