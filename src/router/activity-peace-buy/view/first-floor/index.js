import React from 'react'
import CouponClearImg from '@/assets/coupon_clear.png'

import './index.scss'

export default function FirstFloor(props) {
  const { floorBanner, coupons = [] } = props.dataSource || {}
  const { floorCouponList } = props
  return (
    <div className='click-autor'>
      {/* <FloorTitle title="900购1100" label="单笔购1100，不与其他活动优惠" /> */}
      <div className='floor1'>
        <img className='floor1-banner' src={floorBanner} />
        {coupons.map((item, index) => {
          if ((index > 0 && (floorCouponList[coupons[index -1].id] || {}).stock === 0) || (index === 0)) {
            return (
              <div
                className='floor1-img-box'
                style={{ position: 'relative' }}
                key={'floor1' + item.id}
                onClick={() => props.goCouponDetail(item)}
              >
                <img
                  style={{ width: '100%' }}
                  className='floor1-item'
                  src={item.img}
                />
                <img
                  className={`floor1-clear ${
                    (floorCouponList[item.id] || {}).stock ? 'disable' : ''
                    }`}
                  src={CouponClearImg}
                />
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}
