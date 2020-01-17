import React from 'react'

import { colorList } from '../../config'
import CouponItem from '../../component/coupon-item-f'
import './index.scss'

export default function OtherFloor(props) {
  const { dataSource = [], floorCouponList } = props
  return (
    <div>
      {dataSource.map((floor, index) => (
        <div key={floor.floorName + index} className='other-floor click-autor'>
          <img className='other-img' src={floor.floorBanner} />
          <div className='other-coupon-box'>
            {(floorCouponList[index] || []).map((item, i) => (
              <CouponItem
                goCouponDetail={() => {
                  props.goCouponDetail(item)
                }}
                key={item.id + index}
                dataSource={item}
                color={colorList[i % 9]}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
