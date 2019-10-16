import React from 'react'
import iconBanner from '@/assets/位图@2x.png'
import iconCouponItem from '@/assets/coupon-bac-item.png'
import './index.scss'

export default class ActivityModal extends React.Component {
  render () {
    return <div className='activity-modal'>
      <div className='banner'>
        <img className='img' src={ iconBanner } />
      </div>
      <div className='coupon-list'>


        <div className='coupon-item'>
          <div className='top'>
            <div className='price'>
              <span>￥</span>
              <span>5</span>
            </div>
            <div className='reduction'>满50可用</div>
            <div className='limit'>仅生鲜品类可用</div>
          </div>
          <div className='bottom'>
            <button>立即领券</button>
          </div>
        </div>


      </div>
    </div>
  }
}