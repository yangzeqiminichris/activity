import React from 'react'
import { setToken } from '@/cache/token.js'
import { getLotAjActivityInfo, getPowerOfAj, getGetMyCouponDetail, getOtherOrderDetail } from '@/api/lot-aj'
import { configUrl } from '@/api/base'
import pic1 from '@/assets/lot-aj/1.jpg'
import picBtn from '@/assets/lot-aj/2.png'
import pic3 from '@/assets/lot-aj/3.jpg'
import picModal from '@/assets/lot-aj/1.png'

import './index.scss'

export default class ActivityModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activityInfo: null,
      couponNum: '',
      showModal: false,
      startAt: '',
      endAt: ''
    }
  }
  componentWillMount () {
    this.props.history.listen(() => {
      window.location.reload()
    })
  }

  componentDidMount () {
    let token = this.getUrlToken('token', this.props.location.search)
    setToken(token).then(() => {
      this.getLotCoupun()
    })
  }

  render () {
    const { activityInfo, couponNum, showModal, startAt, endAt } = this.state
    return (
      <div className='lot-aj'>
        <div className='img-box'>
          <img className='img pic1' src={ pic1 } />
        </div>
        <div className='lot-info'>
          <div className='lot-btn'>
            {
               ((activityInfo && activityInfo.remain > 0 && !activityInfo.userActivityLog) || !activityInfo)
                ?
                  <div className='btn' onClick={ this.lotPowerOfAj.bind(this) }>立抢线下抽奖名额></div>
                :
                  activityInfo.userActivityLog
                    ?
                      <div className='btn'>恭喜！抢购成功！</div>
                    :
                     <div className='btn'>活动名额已抢光！</div>
            }
            
          </div>
          <div>
            {
              activityInfo && activityInfo.userActivityLog && activityInfo.userActivityLog.number && <div className='coupon-box'>
                <div className='coupon-id'><div className='num'>{ activityInfo.userActivityLog.number }</div>号进场</div>
                <img src={`${ configUrl }/zbdx-api/barcode?code=${ couponNum }&height=208&width=702`} className='base-code-body-barcode' />
              </div>
            }
            <div></div>
          </div>
        </div>
        <img className='img' src={ pic3 } />
        {
          showModal && <div className='cover' onClick={ this.closeCover.bind(this)}>
            <div className='img'>
              <img className='img' src={ picModal } />
              <div className='info'>
                <div>
                  <div className='title'>活动还未开始~ </div>
                  <div className='times'>活动时间：{ startAt }至{ endAt }</div>
                  <div className='btn'>
                    <img className='btn-img' src={ picBtn } />
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }

  getUrlToken(name, str) {
    const reg = new RegExp(`(^|&)${ name}=([^&]*)(&|$)`);
    const r = str.substr(1).match(reg);
    if (r != null) return  decodeURIComponent(r[2]); return null;
  }

  getLotCoupun () {
    getLotAjActivityInfo().then(res => {
      let startAt = this.getTime(res.startAt)
      let endAt = this.getTime(res.endAt)
      this.setState({
        activityInfo: res,
        startAt,
        endAt
      })
      if (res.userActivityLog && res.userActivityLog.orderNo) {
        getOtherOrderDetail(res.userActivityLog.orderNo).then(resporse => {
          // console.log(resporse.goods.couponNum)
          if (resporse.goods && resporse.goods.couponNum) {
            this.setState({
              couponNum: resporse.goods.couponNum
            })
          }
        })
      }
    })
  }

  getTime (timer) {
    let _times, times
    if (timer.indexOf('T') !== -1 && timer.indexOf('-') !== -1 && timer.indexOf(':') !== -1 ) {
      _times = timer.split('T')[0].split('-')
      times = `${ _times[0] }/${ _times[1] }/${ _times[2] }`
      _times = timer.split('T')[1].split(':')
      times += ` ${ _times[0] }:${ _times[1] }`
    } else {
      times = timer
    }
    
    return times
  }

  closeCover () {
    this.setState({ showModal: false })
  }

  lotPowerOfAj () {
    getPowerOfAj(true).then(res => {
      this.getLotCoupun()
    }).catch(err => {
      if (err.msg === '活动尚未开始,敬请期待') {
        this.setState({
          showModal: true
        })
      }
    })
  }
}