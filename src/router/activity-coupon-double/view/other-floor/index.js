import React from 'react'
import CouponClearImg from '@/assets/coupon_clear.png'

import './index.scss'

export default function FirstFloor(props) {
  const { floorCoupons, goCouponDetail } = props
  const { floorBanner, coupons = [] } = props.dataSource || {}
  return (
    <div className='floor-double'>
      <img className='floor-double-banner' src={floorBanner} />
      {coupons.map((item, index) => {
        const floorImg = document.getElementsByClassName('floor-double-item')[index]
        let clearImgWidth = 0
        if (floorImg) {
          clearImgWidth = floorImg.clientWidth * 0.7
        }
        return (
          <div
            className='floor-double-img-box'
            key={'floor-double' + item.id}
            onClick={() => goCouponDetail(item, floorCoupons.filter(couponDetail => item.id === couponDetail.id)[0])}
          >
            <img className='floor-double-item' src={item.img} />
            <div className='floor-double-clear-box'>
              <img
                className={`floor-double-clear ${
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
