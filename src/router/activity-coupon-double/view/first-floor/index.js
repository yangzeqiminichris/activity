import React from 'react'
import CouponClearImg from '@/assets/coupon_clear.png'

import './index.scss'

export default function FirstFloor(props) {
  const { floorCoupons, goCouponDetail } = props
  const { floorBanner, coupons = [] } = props.dataSource || {}
  return (
    <div className='floor1'>
      <img className='floor1-banner' src={floorBanner} />
      {coupons.map((item, index) => {
        const floorImg = document.getElementsByClassName('floor1-item')[index]
        let clearImgWidth = 0
        if (floorImg) {
          clearImgWidth = floorImg.clientWidth * 0.5
        }
        return (
          <div
            className='floor1-img-box'
            key={'floor1' + item.id}
            onClick={() => goCouponDetail(item, floorCoupons.filter(couponDetail => item.id === couponDetail.id)[0])}
          >
            <img style={{ width: '100%' }} className='floor1-item' src={item.img} />
            <div className='floor1-clear-box'>
              <img
                className={`floor1-clear ${
                  (floorCoupons.filter(coupon => coupon.id == item.id)[0] || {}).stock ? 'disable' : ''
                }`}
                style={{ width: clearImgWidth }}
                src={CouponClearImg}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
